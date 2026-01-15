#!/bin/bash

# ==========================================
# Script de Correction 404 Nginx
# ==========================================

set -e

echo "🔧 Correction de l'erreur 404 Nginx"
echo "===================================="
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Variables
NGINX_CONTAINER="blogpress-nginx"
WEB_CONTAINER="kobecorporation-web"
BEN_DJIBRIL_CONTAINER="ben-djibril-site"
NETWORK="kobecorp-network"
CONFIG_DIR="$HOME/kobe-corporation/setup-kobe-proxy/conf.d"
NGINX_CONF_DIR="/etc/nginx/conf.d"

# Fonction de vérification
check_container() {
    local container=$1
    if docker ps --format '{{.Names}}' | grep -q "^${container}$"; then
        echo -e "${GREEN}✅${NC} Conteneur ${container} est en cours d'exécution"
        return 0
    else
        echo -e "${RED}❌${NC} Conteneur ${container} n'est pas démarré"
        return 1
    fi
}

# Fonction de vérification réseau
check_network() {
    local container=$1
    if docker inspect "${container}" --format '{{range $net, $conf := .NetworkSettings.Networks}}{{$net}}{{end}}' | grep -q "${NETWORK}"; then
        echo -e "${GREEN}✅${NC} ${container} est sur le réseau ${NETWORK}"
        return 0
    else
        echo -e "${YELLOW}⚠️${NC} ${container} n'est pas sur le réseau ${NETWORK}"
        return 1
    fi
}

# Fonction de connexion au réseau
connect_to_network() {
    local container=$1
    echo -e "${YELLOW}🔗${NC} Connexion de ${container} au réseau ${NETWORK}..."
    docker network connect "${NETWORK}" "${container}" 2>/dev/null && \
        echo -e "${GREEN}✅${NC} ${container} connecté au réseau" || \
        echo -e "${YELLOW}⚠️${NC} ${container} déjà sur le réseau ou erreur"
}

# Étape 1 : Vérifier les conteneurs
echo "1️⃣ Vérification des conteneurs..."
echo ""

WEB_RUNNING=false
BEN_DJIBRIL_RUNNING=false
NGINX_RUNNING=false

if check_container "${WEB_CONTAINER}"; then
    WEB_RUNNING=true
fi

if check_container "${BEN_DJIBRIL_CONTAINER}"; then
    BEN_DJIBRIL_RUNNING=true
fi

if check_container "${NGINX_CONTAINER}"; then
    NGINX_RUNNING=true
else
    echo -e "${RED}❌${NC} Le conteneur ${NGINX_CONTAINER} n'est pas démarré !"
    echo "   Veuillez démarrer blogpress-nginx d'abord."
    exit 1
fi

echo ""

# Étape 2 : Vérifier/Créer le réseau
echo "2️⃣ Vérification du réseau ${NETWORK}..."
if docker network ls --format '{{.Name}}' | grep -q "^${NETWORK}$"; then
    echo -e "${GREEN}✅${NC} Réseau ${NETWORK} existe"
else
    echo -e "${YELLOW}⚠️${NC} Création du réseau ${NETWORK}..."
    docker network create "${NETWORK}"
    echo -e "${GREEN}✅${NC} Réseau ${NETWORK} créé"
fi
echo ""

# Étape 3 : Connecter les conteneurs au réseau
echo "3️⃣ Connexion des conteneurs au réseau..."
if ! check_network "${NGINX_CONTAINER}"; then
    connect_to_network "${NGINX_CONTAINER}"
fi

if [ "$WEB_RUNNING" = true ] && ! check_network "${WEB_CONTAINER}"; then
    connect_to_network "${WEB_CONTAINER}"
fi

if [ "$BEN_DJIBRIL_RUNNING" = true ] && ! check_network "${BEN_DJIBRIL_CONTAINER}"; then
    connect_to_network "${BEN_DJIBRIL_CONTAINER}"
fi
echo ""

# Étape 4 : Vérifier les configurations
echo "4️⃣ Vérification des configurations Nginx..."
if [ ! -d "${CONFIG_DIR}" ]; then
    echo -e "${RED}❌${NC} Répertoire ${CONFIG_DIR} non trouvé !"
    exit 1
fi

CONFIG_FILES=(
    "${CONFIG_DIR}/kobecorporation.com.conf"
    "${CONFIG_DIR}/ben-djibril.kobecorporation.com.conf"
)

for config_file in "${CONFIG_FILES[@]}"; do
    if [ -f "${config_file}" ]; then
        echo -e "${GREEN}✅${NC} $(basename ${config_file}) trouvé"
    else
        echo -e "${RED}❌${NC} $(basename ${config_file}) non trouvé !"
        exit 1
    fi
done
echo ""

# Étape 5 : Copier les configurations dans blogpress-nginx
echo "5️⃣ Copie des configurations dans ${NGINX_CONTAINER}..."
for config_file in "${CONFIG_FILES[@]}"; then
    filename=$(basename "${config_file}")
    echo -e "${YELLOW}📋${NC} Copie de ${filename}..."
    docker cp "${config_file}" "${NGINX_CONTAINER}:${NGINX_CONF_DIR}/${filename}"
    echo -e "${GREEN}✅${NC} ${filename} copié"
done
echo ""

# Étape 6 : Vérifier la syntaxe Nginx
echo "6️⃣ Vérification de la syntaxe Nginx..."
if docker exec "${NGINX_CONTAINER}" nginx -t 2>&1 | grep -q "successful"; then
    echo -e "${GREEN}✅${NC} Syntaxe Nginx correcte"
else
    echo -e "${RED}❌${NC} Erreur de syntaxe Nginx !"
    docker exec "${NGINX_CONTAINER}" nginx -t
    exit 1
fi
echo ""

# Étape 7 : Recharger Nginx
echo "7️⃣ Rechargement de Nginx..."
if docker exec "${NGINX_CONTAINER}" nginx -s reload 2>&1; then
    echo -e "${GREEN}✅${NC} Nginx rechargé avec succès"
else
    echo -e "${YELLOW}⚠️${NC} Tentative de redémarrage de Nginx..."
    docker restart "${NGINX_CONTAINER}"
    sleep 2
fi
echo ""

# Étape 8 : Tests de connectivité
echo "8️⃣ Tests de connectivité..."
echo ""

# Test kobecorporation-web
if [ "$WEB_RUNNING" = true ]; then
    echo -e "${YELLOW}🔍${NC} Test de connexion à ${WEB_CONTAINER}:80..."
    if docker exec "${NGINX_CONTAINER}" wget -q --spider --timeout=5 http://${WEB_CONTAINER}:80 2>/dev/null; then
        echo -e "${GREEN}✅${NC} ${WEB_CONTAINER} répond"
    else
        echo -e "${RED}❌${NC} ${WEB_CONTAINER} ne répond pas"
    fi
else
    echo -e "${YELLOW}⚠️${NC} ${WEB_CONTAINER} n'est pas démarré (test ignoré)"
fi

# Test ben-djibril-site
if [ "$BEN_DJIBRIL_RUNNING" = true ]; then
    echo -e "${YELLOW}🔍${NC} Test de connexion à ${BEN_DJIBRIL_CONTAINER}:80..."
    if docker exec "${NGINX_CONTAINER}" wget -q --spider --timeout=5 http://${BEN_DJIBRIL_CONTAINER}:80 2>/dev/null; then
        echo -e "${GREEN}✅${NC} ${BEN_DJIBRIL_CONTAINER} répond"
    else
        echo -e "${RED}❌${NC} ${BEN_DJIBRIL_CONTAINER} ne répond pas"
    fi
else
    echo -e "${YELLOW}⚠️${NC} ${BEN_DJIBRIL_CONTAINER} n'est pas démarré (test ignoré)"
fi
echo ""

# Étape 9 : Tests avec curl
echo "9️⃣ Tests avec curl (simulation de requêtes HTTP)..."
echo ""

# Test kobecorporation.com
echo -e "${YELLOW}🔍${NC} Test de kobecorporation.com..."
HTTP_CODE=$(docker exec "${NGINX_CONTAINER}" curl -s -o /dev/null -w "%{http_code}" -H "Host: kobecorporation.com" http://localhost || echo "000")
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅${NC} kobecorporation.com répond (HTTP ${HTTP_CODE})"
elif [ "$HTTP_CODE" = "404" ]; then
    echo -e "${RED}❌${NC} kobecorporation.com retourne 404"
    echo "   Vérifiez que ${WEB_CONTAINER} est démarré et accessible"
else
    echo -e "${YELLOW}⚠️${NC} kobecorporation.com retourne HTTP ${HTTP_CODE}"
fi

# Test ben-djibril.kobecorporation.com
echo -e "${YELLOW}🔍${NC} Test de ben-djibril.kobecorporation.com..."
HTTP_CODE=$(docker exec "${NGINX_CONTAINER}" curl -s -o /dev/null -w "%{http_code}" -H "Host: ben-djibril.kobecorporation.com" http://localhost || echo "000")
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅${NC} ben-djibril.kobecorporation.com répond (HTTP ${HTTP_CODE})"
elif [ "$HTTP_CODE" = "404" ]; then
    echo -e "${RED}❌${NC} ben-djibril.kobecorporation.com retourne 404"
    echo "   Vérifiez que ${BEN_DJIBRIL_CONTAINER} est démarré et accessible"
else
    echo -e "${YELLOW}⚠️${NC} ben-djibril.kobecorporation.com retourne HTTP ${HTTP_CODE}"
fi
echo ""

# Résumé
echo "===================================="
echo "📊 Résumé"
echo "===================================="
echo ""
echo "Conteneurs :"
echo "  - ${NGINX_CONTAINER}: $([ "$NGINX_RUNNING" = true ] && echo -e "${GREEN}✅${NC}" || echo -e "${RED}❌${NC}")"
echo "  - ${WEB_CONTAINER}: $([ "$WEB_RUNNING" = true ] && echo -e "${GREEN}✅${NC}" || echo -e "${RED}❌${NC}")"
echo "  - ${BEN_DJIBRIL_CONTAINER}: $([ "$BEN_DJIBRIL_RUNNING" = true ] && echo -e "${GREEN}✅${NC}" || echo -e "${RED}❌${NC}")"
echo ""
echo "Réseau :"
echo "  - ${NETWORK}: $(docker network ls --format '{{.Name}}' | grep -q "^${NETWORK}$" && echo -e "${GREEN}✅${NC}" || echo -e "${RED}❌${NC}")"
echo ""
echo "Configurations :"
for config_file in "${CONFIG_FILES[@]}"; do
    filename=$(basename "${config_file}")
    if docker exec "${NGINX_CONTAINER}" test -f "${NGINX_CONF_DIR}/${filename}"; then
        echo "  - ${filename}: $(echo -e "${GREEN}✅${NC}")"
    else
        echo "  - ${filename}: $(echo -e "${RED}❌${NC}")"
    fi
done
echo ""

# Recommandations
if [ "$WEB_RUNNING" = false ]; then
    echo -e "${YELLOW}💡${NC} Recommandation : Démarrer ${WEB_CONTAINER}"
    echo "   cd ~/kobe-corporation/setup-front && docker compose up -d"
fi

if [ "$BEN_DJIBRIL_RUNNING" = false ]; then
    echo -e "${YELLOW}💡${NC} Recommandation : Démarrer ${BEN_DJIBRIL_CONTAINER}"
    echo "   cd ~/chemin/vers/ben-djibril && docker compose up -d"
fi

echo ""
echo -e "${GREEN}✅${NC} Script terminé !"
echo ""
echo "Si le problème persiste, consultez :"
echo "  - setup-kobe-proxy/TROUBLESHOOTING-404.md"
echo "  - docker logs ${NGINX_CONTAINER}"
echo "  - docker logs ${WEB_CONTAINER}"
echo "  - docker logs ${BEN_DJIBRIL_CONTAINER}"
