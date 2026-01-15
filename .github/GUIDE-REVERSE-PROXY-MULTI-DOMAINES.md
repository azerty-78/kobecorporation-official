# 🌐 Guide Complet : Reverse Proxy Multi-Domaines

## ⚠️ Note Importante

**Le conteneur proxy KOBE (`kobecorp-nginx`) n'est PAS déployé.** Les configurations dans `setup-kobe-proxy/` sont utilisées par **blogpress-nginx** qui gère tous les domaines.

Le workflow CI/CD ne build plus l'image Nginx (job `build-nginx` supprimé).

## 📊 Architecture Actuelle

```
Internet
   │
   ├─→ blogpress-app.com ──→ VPS (IP: xxx.xxx.xxx.xxx)
   │                          │
   └─→ kobecorporation.com ──┘
        │
        ├─→ www.kobecorporation.com
        └─→ ben-djibril.kobecorporation.com
```

**Tous les domaines pointent vers la même IP** → **Un seul reverse proxy** (`blogpress-nginx`) gère tout.

## 🎯 Comment ça fonctionne ?

### Principe du Reverse Proxy Multi-Domaines

Nginx utilise le header `Host` de la requête HTTP pour déterminer vers quel conteneur router :

```
Requête: GET / HTTP/1.1
Host: kobecorporation.com
         ↓
blogpress-nginx lit le header "Host"
         ↓
Cherche dans conf.d/ quel fichier correspond à "kobecorporation.com"
         ↓
Trouve: kobecorporation.com.conf
         ↓
Route vers: kobecorporation-web:80 (via le réseau Docker)
```

### Pourquoi pas de port exposé ?

Les conteneurs `kobecorporation-web` et `ben-djibril-site` **n'exposent PAS de port sur l'hôte** car :

1. ✅ **Sécurité** : Pas d'accès direct depuis l'extérieur
2. ✅ **Pas de conflit** : Un seul service utilise les ports 80/443 (blogpress-nginx)
3. ✅ **Communication interne** : Les conteneurs communiquent via le réseau Docker `kobecorp-network`

### Communication via le réseau Docker

```
┌─────────────────────────────────────────────────┐
│  Réseau Docker: kobecorp-network                │
│                                                  │
│  ┌──────────────┐      ┌──────────────────┐   │
│  │ blogpress-   │─────→│ kobecorporation- │   │
│  │ nginx:80     │      │ web:80           │   │
│  │              │      │ (port interne)   │   │
│  │              │─────→│                  │   │
│  │              │      │ ben-djibril-     │   │
│  │              │      │ site:80          │   │
│  └──────────────┘      └──────────────────┘   │
│                                                  │
└─────────────────────────────────────────────────┘
         │
         │ Ports 80/443 exposés sur l'hôte
         ↓
    Internet
```

## 📋 Étapes de Configuration

### Étape 1 : Vérifier que blogpress-nginx est sur le réseau kobecorp-network

```bash
# Sur le serveur VPS
docker network inspect kobecorp-network
```

**Si `blogpress-nginx` n'est pas dans la liste**, il faut l'ajouter :

```bash
# Arrêter blogpress-nginx
docker stop blogpress-nginx

# Connecter blogpress-nginx au réseau kobecorp-network
docker network connect kobecorp-network blogpress-nginx

# Redémarrer blogpress-nginx
docker start blogpress-nginx
```

**OU** modifier le `docker-compose.yaml` de blogpress pour inclure le réseau :

```yaml
services:
  nginx:
    # ... autres configs ...
    networks:
      - blogpress-network # Réseau existant
      - kobecorp-network # Réseau partagé (external: true)

networks:
  blogpress-network:
    # ... config existante ...
  kobecorp-network:
    name: kobecorp-network
    external: true
```

### Étape 2 : Copier les configurations KOBE dans blogpress-nginx

```bash
# Sur le serveur VPS
# Trouver où sont les configs de blogpress-nginx
docker inspect blogpress-nginx | grep -A 10 Mounts

# Généralement, c'est dans ~/blogpress/setup-proxy/conf.d/
# OU dans le volume monté par blogpress

# Copier les fichiers de configuration
cd ~/kobe-corporation/setup-kobe-proxy/conf.d/

# Option A : Si blogpress-nginx a un volume monté
# Trouver le chemin du volume
docker inspect blogpress-nginx | grep -A 5 "Source.*conf.d"

# Copier dans ce répertoire
cp kobecorporation.com.conf /chemin/vers/blogpress/conf.d/
cp ben-djibril.kobecorporation.com.conf /chemin/vers/blogpress/conf.d/

# Option B : Si blogpress-nginx utilise un volume Docker
# Copier directement dans le conteneur (temporaire, sera perdu au redémarrage)
docker cp kobecorporation.com.conf blogpress-nginx:/etc/nginx/conf.d/
docker cp ben-djibril.kobecorporation.com.conf blogpress-nginx:/etc/nginx/conf.d/
```

**⚠️ IMPORTANT** : Si vous utilisez l'Option B, vous devez aussi modifier le `docker-compose.yaml` de blogpress pour monter ces fichiers de manière permanente.

### Étape 3 : Vérifier la syntaxe Nginx

```bash
# Tester la configuration
docker exec blogpress-nginx nginx -t

# Si OK, recharger Nginx
docker exec blogpress-nginx nginx -s reload
```

### Étape 4 : Obtenir les certificats SSL pour kobecorporation.com

```bash
# Utiliser le certbot existant de blogpress
docker exec blogpress-certbot certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email contact@kobecorporation.com \
  --agree-tos \
  --no-eff-email \
  -d kobecorporation.com \
  -d www.kobecorporation.com \
  -d ben-djibril.kobecorporation.com
```

**Note** : Les certificats seront stockés dans `/etc/letsencrypt/live/` (monté en volume dans blogpress-certbot).

### Étape 5 : Activer HTTPS dans les configurations

Une fois les certificats obtenus, décommenter les sections HTTPS dans :

- `kobecorporation.com.conf` (lignes 86-174)
- `ben-djibril.kobecorporation.com.conf` (lignes 82-157)

Puis recharger Nginx :

```bash
docker exec blogpress-nginx nginx -s reload
```

## 🔧 Script Automatique de Configuration

Créez ce script sur le serveur : `~/configure-kobe-nginx.sh`

```bash
#!/bin/bash
set -e

echo "🌐 Configuration de blogpress-nginx pour KOBE Corporation"
echo "============================================================"

# Variables
BLOGPRESS_NGINX_CONTAINER="blogpress-nginx"
BLOGPRESS_CERTBOT_CONTAINER="blogpress-certbot"
KOBE_CONF_DIR="$HOME/kobe-corporation/setup-kobe-proxy/conf.d"
NETWORK_NAME="kobecorp-network"

# Étape 1 : Vérifier que blogpress-nginx est sur le réseau
echo ""
echo "📋 Étape 1 : Vérification du réseau..."
if docker network inspect $NETWORK_NAME | grep -q "$BLOGPRESS_NGINX_CONTAINER"; then
    echo "✅ blogpress-nginx est déjà sur le réseau $NETWORK_NAME"
else
    echo "⚠️  blogpress-nginx n'est pas sur le réseau $NETWORK_NAME"
    echo "🔗 Ajout de blogpress-nginx au réseau..."
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
BLOGPRESS_CONF_DIR=$(docker inspect $BLOGPRESS_NGINX_CONTAINER | grep -A 10 "Mounts" | grep "Source.*conf.d" | head -1 | awk -F'"' '{print $4}')

if [ -z "$BLOGPRESS_CONF_DIR" ]; then
    echo "⚠️  Répertoire de configuration non trouvé dans les volumes"
    echo "📦 Copie directe dans le conteneur (temporaire)..."

    # Copier dans le conteneur
    docker cp "$KOBE_CONF_DIR/kobecorporation.com.conf" "$BLOGPRESS_NGINX_CONTAINER:/etc/nginx/conf.d/"
    docker cp "$KOBE_CONF_DIR/ben-djibril.kobecorporation.com.conf" "$BLOGPRESS_NGINX_CONTAINER:/etc/nginx/conf.d/"

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
if docker exec $BLOGPRESS_NGINX_CONTAINER nginx -t; then
    echo "✅ Configuration valide"
else
    echo "❌ Erreur dans la configuration"
    exit 1
fi

# Étape 4 : Recharger Nginx
echo ""
echo "📋 Étape 4 : Rechargement de Nginx..."
docker exec $BLOGPRESS_NGINX_CONTAINER nginx -s reload
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
      -d ben-djibril.kobecorporation.com || {
        echo "⚠️  Erreur lors de l'obtention des certificats"
        echo "💡 Vérifiez que les domaines pointent vers ce serveur et que le port 80 est accessible"
    }

    if [ $? -eq 0 ]; then
        echo "✅ Certificats obtenus"
        echo "💡 N'oubliez pas de décommenter les sections HTTPS dans les fichiers de configuration"
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
```

Rendre le script exécutable :

```bash
chmod +x ~/configure-kobe-nginx.sh
```

## 🧪 Tests de Vérification

### Test 1 : Vérifier que les conteneurs sont sur le même réseau

```bash
docker network inspect kobecorp-network
```

Vous devriez voir :

- `blogpress-nginx`
- `kobecorporation-web`
- `ben-djibril-site`

### Test 2 : Tester la connectivité interne

```bash
# Depuis blogpress-nginx, tester la connexion vers kobecorporation-web
docker exec blogpress-nginx wget -O- http://kobecorporation-web:80

# Depuis blogpress-nginx, tester la connexion vers ben-djibril-site
docker exec blogpress-nginx wget -O- http://ben-djibril-site:80
```

### Test 3 : Tester les domaines depuis l'extérieur

```bash
# Test HTTP
curl -H "Host: kobecorporation.com" http://VOTRE_IP
curl -H "Host: ben-djibril.kobecorporation.com" http://VOTRE_IP

# Test HTTPS (après obtention des certificats)
curl https://kobecorporation.com
curl https://ben-djibril.kobecorporation.com
```

## 📝 Résumé de l'Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Internet                                                    │
│  Ports 80 (HTTP) et 443 (HTTPS)                            │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ↓
        ┌─────────────────────────────┐
        │  blogpress-nginx            │
        │  (Reverse Proxy Principal)  │
        │  Ports 80/443 sur l'hôte    │
        └───────────┬─────────────────┘
                    │
        ┌───────────┴───────────┐
        │  Réseau Docker:       │
        │  kobecorp-network     │
        │                       │
        ├───────────────────────┤
        │                       │
        ↓                       ↓
┌───────────────┐      ┌──────────────────┐
│ blogpress-   │      │ kobecorporation-  │
│ webapp:80    │      │ web:80            │
│              │      │ (port interne)   │
└───────────────┘      └──────────────────┘
                              │
                              ↓
                    ┌──────────────────┐
                    │ ben-djibril-     │
                    │ site:80          │
                    │ (port interne)   │
                    └──────────────────┘
```

## ❓ Questions Fréquentes

### Q: Pourquoi blogpress-nginx peut router vers kobecorporation-web ?

**R:** Parce qu'ils sont sur le même réseau Docker (`kobecorp-network`). Sur ce réseau, les conteneurs peuvent se communiquer par leur nom (`kobecorporation-web`, `ben-djibril-site`).

### Q: Comment Nginx sait-il vers quel conteneur router ?

**R:** Nginx lit le header `Host` de la requête HTTP et cherche dans `conf.d/` le fichier qui correspond à ce domaine. Chaque fichier `.conf` définit un `server_name` et un `upstream` qui pointe vers le conteneur.

### Q: Que se passe-t-il si je crée un nouveau sous-domaine ?

**R:** Il suffit de :

1. Créer un nouveau fichier `nouveau-sous-domaine.kobecorporation.com.conf` dans `conf.d/`
2. Définir l'`upstream` vers le conteneur cible
3. Obtenir le certificat SSL avec certbot
4. Recharger Nginx

### Q: Les certificats SSL sont-ils partagés ?

**R:** Oui, si vous utilisez le même certbot (`blogpress-certbot`). Tous les certificats sont stockés dans `/etc/letsencrypt/live/` et montés en volume dans le conteneur certbot.

### Q: Puis-je utiliser un reverse proxy séparé pour KOBE ?

**R:** Oui, mais vous devrez utiliser d'autres ports (8080, 8443) et configurer votre firewall/router pour rediriger. Ce n'est **pas recommandé** car c'est plus complexe et moins sécurisé.

## 🚀 Déploiement Automatique

Pour automatiser cette configuration dans votre workflow CI/CD, ajoutez une étape dans `.github/workflows/setup-cicd.yml` après le déploiement :

```yaml
- name: 🔧 Configure blogpress-nginx for KOBE
  run: |
    ssh -F ~/.ssh/config vps-deploy << 'EOF'
      # Exécuter le script de configuration
      bash ~/configure-kobe-nginx.sh
    EOF
```

---

**📚 Documentation complémentaire :**

- [Guide SSL Certificats](./GUIDE-SSL-CERTIFICATS.md)
- [Guide de Déploiement](./DEPLOYMENT.md)
