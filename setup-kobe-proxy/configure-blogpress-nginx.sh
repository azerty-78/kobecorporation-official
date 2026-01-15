#!/bin/bash
set -e

echo "🌐 Configuration de blogpress-nginx pour KOBE Corporation"
echo "============================================================"

# Variables
BLOGPRESS_NGINX_CONTAINER="blogpress-nginx"
BLOGPRESS_CERTBOT_CONTAINER="blogpress-certbot"
KOBE_CONF_DIR="$(cd "$(dirname "$0")/conf.d" && pwd)"
NETWORK_NAME="kobecorp-network"

# Vérifier que les fichiers de configuration existent
if [ ! -f "$KOBE_CONF_DIR/kobecorporation.com.conf" ]; then
    echo "❌ Erreur: $KOBE_CONF_DIR/kobecorporation.com.conf non trouvé"
    exit 1
fi

if [ ! -f "$KOBE_CONF_DIR/ben-djibril.kobecorporation.com.conf" ]; then
    echo "❌ Erreur: $KOBE_CONF_DIR/ben-djibril.kobecorporation.com.conf non trouvé"
    exit 1
fi

# Étape 1 : Vérifier que blogpress-nginx est sur le réseau
echo ""
echo "📋 Étape 1 : Vérification du réseau..."
if docker network inspect $NETWORK_NAME 2>/dev/null | grep -q "$BLOGPRESS_NGINX_CONTAINER"; then
    echo "✅ blogpress-nginx est déjà sur le réseau $NETWORK_NAME"
else
    echo "⚠️  blogpress-nginx n'est pas sur le réseau $NETWORK_NAME"
    echo "🔗 Ajout de blogpress-nginx au réseau..."
    
    # Vérifier que le réseau existe
    if ! docker network inspect $NETWORK_NAME &>/dev/null; then
        echo "📦 Création du réseau $NETWORK_NAME..."
        docker network create $NETWORK_NAME
    fi
    
    # Connecter blogpress-nginx au réseau
    docker network connect $NETWORK_NAME $BLOGPRESS_NGINX_CONTAINER || {
        echo "❌ Erreur: Impossible d'ajouter blogpress-nginx au réseau"
        echo "💡 Solution: Arrêtez blogpress-nginx, ajoutez-le au réseau, puis redémarrez-le"
        exit 1
    }
    echo "✅ blogpress-nginx ajouté au réseau"
fi

# Étape 2 : Trouver le répertoire de configuration de blogpress-nginx
echo ""
echo "📋 Étape 2 : Recherche du répertoire de configuration..."
BLOGPRESS_CONF_DIR=$(docker inspect $BLOGPRESS_NGINX_CONTAINER 2>/dev/null | grep -A 10 "Mounts" | grep "Source.*conf.d" | head -1 | awk -F'"' '{print $4}' || echo "")

if [ -z "$BLOGPRESS_CONF_DIR" ] || [ ! -d "$BLOGPRESS_CONF_DIR" ]; then
    echo "⚠️  Répertoire de configuration non trouvé dans les volumes"
    echo "📦 Copie directe dans le conteneur (temporaire)..."
    
    # Copier dans le conteneur
    docker cp "$KOBE_CONF_DIR/kobecorporation.com.conf" "$BLOGPRESS_NGINX_CONTAINER:/etc/nginx/conf.d/" 2>/dev/null || {
        echo "❌ Erreur: Impossible de copier dans le conteneur"
        exit 1
    }
    docker cp "$KOBE_CONF_DIR/ben-djibril.kobecorporation.com.conf" "$BLOGPRESS_NGINX_CONTAINER:/etc/nginx/conf.d/" 2>/dev/null || {
        echo "❌ Erreur: Impossible de copier dans le conteneur"
        exit 1
    }
    
    echo "✅ Fichiers copiés dans le conteneur"
    echo "⚠️  ATTENTION: Ces fichiers seront perdus si le conteneur est recréé"
    echo "💡 Pour une solution permanente, modifiez le docker-compose.yaml de blogpress"
else
    echo "✅ Répertoire trouvé: $BLOGPRESS_CONF_DIR"
    
    # Copier les fichiers
    cp "$KOBE_CONF_DIR/kobecorporation.com.conf" "$BLOGPRESS_CONF_DIR/"
    cp "$KOBE_CONF_DIR/ben-djibril.kobecorporation.com.conf" "$BLOGPRESS_CONF_DIR/"
    
    echo "✅ Fichiers copiés dans $BLOGPRESS_CONF_DIR"
fi

# Étape 3 : Tester la configuration
echo ""
echo "📋 Étape 3 : Test de la configuration Nginx..."
if docker exec $BLOGPRESS_NGINX_CONTAINER nginx -t 2>/dev/null; then
    echo "✅ Configuration valide"
else
    echo "❌ Erreur dans la configuration"
    echo "📋 Détails de l'erreur :"
    docker exec $BLOGPRESS_NGINX_CONTAINER nginx -t
    exit 1
fi

# Étape 4 : Recharger Nginx
echo ""
echo "📋 Étape 4 : Rechargement de Nginx..."
docker exec $BLOGPRESS_NGINX_CONTAINER nginx -s reload 2>/dev/null || {
    echo "⚠️  Rechargement échoué, redémarrage du conteneur..."
    docker restart $BLOGPRESS_NGINX_CONTAINER
    sleep 5
}
echo "✅ Nginx rechargé"

# Étape 5 : Obtenir les certificats SSL (optionnel)
echo ""
echo "📋 Étape 5 : Obtention des certificats SSL..."
read -p "Voulez-vous obtenir les certificats SSL maintenant ? (o/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Oo]$ ]]; then
    echo "🔐 Obtention des certificats..."
    docker exec $BLOGPRESS_CERTBOT_CONTAINER certbot certonly \
      --webroot \
      --webroot-path=/var/www/certbot \
      --email contact@kobecorporation.com \
      --agree-tos \
      --no-eff-email \
      -d kobecorporation.com \
      -d www.kobecorporation.com \
      -d ben-djibril.kobecorporation.com 2>&1 || {
        echo "⚠️  Erreur lors de l'obtention des certificats"
        echo "💡 Vérifiez que :"
        echo "   - Les domaines pointent vers ce serveur"
        echo "   - Le port 80 est accessible depuis Internet"
        echo "   - Les configurations Nginx sont actives"
    }
    
    if [ $? -eq 0 ]; then
        echo "✅ Certificats obtenus"
        echo "💡 N'oubliez pas de décommenter les sections HTTPS dans les fichiers de configuration"
        echo "💡 Puis rechargez Nginx: docker exec $BLOGPRESS_NGINX_CONTAINER nginx -s reload"
    fi
fi

echo ""
echo "🎉 Configuration terminée !"
echo ""
echo "📝 Prochaines étapes :"
echo "   1. Testez http://kobecorporation.com"
echo "   2. Testez http://ben-djibril.kobecorporation.com"
echo "   3. Si les certificats SSL sont obtenus, décommentez les sections HTTPS"
echo "   4. Rechargez Nginx: docker exec $BLOGPRESS_NGINX_CONTAINER nginx -s reload"
