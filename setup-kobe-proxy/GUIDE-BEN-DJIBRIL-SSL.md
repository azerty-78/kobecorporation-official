# 🔐 Guide SSL pour ben-djibril.kobecorporation.com

Ce guide explique comment automatiser l'obtention et le renouvellement des certificats SSL pour le projet ben-djibril dans son propre workflow CI/CD.

## 📋 Prérequis

1. ✅ Le sous-domaine `ben-djibril.kobecorporation.com` pointe vers l'IP du serveur VPS
2. ✅ Le conteneur `ben-djibril-site` est déployé et sur le réseau `kobecorp-network`
3. ✅ Le reverse proxy `blogpress-nginx` est configuré avec la configuration `ben-djibril.kobecorporation.com.conf`
4. ✅ Le conteneur `blogpress-certbot` est en cours d'exécution

## ✅ Vérification de la Configuration Docker Compose

Votre configuration `docker-compose.yaml` est **correcte** :

```yaml
services:
  server:
    expose:
      - "80"  # ✅ Port interne uniquement (pas d'exposition sur l'hôte)
    networks:
      - kobecorp-network  # ✅ Réseau partagé
    container_name: ben-djibril-site  # ✅ Nom exact requis par Nginx

networks:
  kobecorp-network:
    external: true  # ✅ Réseau existant
```

**Tout est correct !** ✅

## 🔐 Configuration SSL dans le Workflow CI/CD

### Étape 1 : Ajouter une étape dans votre workflow

Ajoutez cette étape dans votre workflow CI/CD (après le déploiement) :

```yaml
- name: 🔐 Configure blogpress-nginx and Obtain SSL Certificate
  continue-on-error: true
  run: |
    echo "🔐 Configuration de blogpress-nginx et obtention du certificat SSL"
    echo "=================================================================="
    
    mkdir -p ~/.ssh
    cat > ~/.ssh/config << EOF
    Host vps-deploy
      HostName ${{ secrets.VPS_HOST }}
      User ${{ secrets.VPS_USERNAME }}
      Port ${{ secrets.VPS_PORT || 22 }}
      StrictHostKeyChecking no
      UserKnownHostsFile=/dev/null
    EOF
    chmod 600 ~/.ssh/config
    
    ssh -F ~/.ssh/config vps-deploy << 'SSL_SETUP'
    set -e
    
    CERTBOT_CONTAINER="blogpress-certbot"
    NGINX_CONTAINER="blogpress-nginx"
    EMAIL="bendjibril789@gmail.com"
    DOMAIN="ben-djibril.kobecorporation.com"
    BEN_DJIBRIL_CONF="/etc/nginx/conf.d/ben-djibril.kobecorporation.com.conf"
    
    echo "📋 Étape 1 : Vérification de la configuration Nginx"
    echo "=================================================="
    
    # Vérifier que les conteneurs sont en cours d'exécution
    if ! docker ps | grep -q "$NGINX_CONTAINER"; then
      echo "❌ Erreur: $NGINX_CONTAINER n'est pas en cours d'exécution"
      exit 1
    fi
    
    if ! docker ps | grep -q "$CERTBOT_CONTAINER"; then
      echo "❌ Erreur: $CERTBOT_CONTAINER n'est pas en cours d'exécution"
      exit 1
    fi
    
    # Vérifier que la configuration ben-djibril existe dans blogpress-nginx
    if ! docker exec $NGINX_CONTAINER test -f "$BEN_DJIBRIL_CONF"; then
      echo "⚠️  La configuration ben-djibril n'est pas présente dans blogpress-nginx"
      echo "💡 La configuration doit être copiée depuis le projet KOBE Corporation"
      echo "💡 Ou créez-la manuellement dans blogpress-nginx/conf.d/"
      exit 1
    fi
    
    # Vérifier que ben-djibril-site est sur le réseau kobecorp-network
    if ! docker network inspect kobecorp-network | grep -q "ben-djibril-site"; then
      echo "⚠️  ben-djibril-site n'est pas sur le réseau kobecorp-network"
      echo "💡 Vérifiez votre docker-compose.yaml et le déploiement"
      exit 1
    fi
    
    # Tester la syntaxe Nginx
    if docker exec $NGINX_CONTAINER nginx -t 2>/dev/null; then
      echo "✅ Configuration Nginx valide"
    else
      echo "⚠️  Erreur dans la configuration Nginx"
      docker exec $NGINX_CONTAINER nginx -t
      exit 1
    fi
    
    echo ""
    echo "📋 Étape 2 : Obtention du certificat SSL"
    echo "========================================"
    
    # Vérifier si le certificat existe déjà
    if docker exec $CERTBOT_CONTAINER certbot certificates 2>/dev/null | grep -q "$DOMAIN"; then
      echo "ℹ️  Le certificat pour $DOMAIN existe déjà"
      echo "📋 Informations du certificat :"
      docker exec $CERTBOT_CONTAINER certbot certificates | grep -A 5 "$DOMAIN" || true
      echo ""
      echo "✅ Certificat valide - Aucune action nécessaire"
    else
      echo "🔐 Obtention du certificat pour $DOMAIN..."
      docker exec $CERTBOT_CONTAINER certbot certonly \
        --webroot \
        --webroot-path=/var/www/certbot \
        --email "$EMAIL" \
        --agree-tos \
        --no-eff-email \
        --non-interactive \
        -d "$DOMAIN" \
        --keep-until-expiring 2>&1 || {
          EXIT_CODE=$?
          if [ $EXIT_CODE -eq 1 ]; then
            echo "⚠️  Erreur lors de l'obtention du certificat"
            echo "💡 Causes possibles :"
            echo "   - Le domaine ne pointe pas vers ce serveur"
            echo "   - Le port 80 n'est pas accessible depuis Internet"
            echo "   - La configuration Nginx n'est pas active"
            echo "   - Le challenge /.well-known/acme-challenge/ n'est pas accessible"
          else
            echo "ℹ️  Le certificat existe déjà ou est valide"
          fi
          exit $EXIT_CODE
        }
      
      echo ""
      echo "✅ Certificat obtenu avec succès !"
      echo "📋 Informations du certificat :"
      docker exec $CERTBOT_CONTAINER certbot certificates | grep -A 10 "$DOMAIN" || true
    fi
    
    echo ""
    echo "💡 Prochaines étapes manuelles :"
    echo "   1. Vérifiez que les sections HTTPS sont décommentées dans ben-djibril.kobecorporation.com.conf"
    echo "   2. Copiez la configuration mise à jour dans blogpress-nginx si nécessaire"
    echo "   3. Rechargez Nginx: docker exec $NGINX_CONTAINER nginx -s reload"
    SSL_SETUP
```

### Étape 2 : Ajouter les secrets GitHub

Assurez-vous que votre repository GitHub a ces secrets configurés :

- `VPS_HOST` : L'adresse IP ou le domaine de votre serveur VPS
- `VPS_USERNAME` : Le nom d'utilisateur SSH (généralement `deploy`)
- `VPS_PORT` : Le port SSH (généralement `22`, optionnel)
- `VPS_SSH_KEY` : La clé SSH privée pour se connecter au VPS

## 🔒 Sécurité des Certificats

### ⚠️ Les certificats ne seront PAS écrasés

Certbot utilise `--keep-until-expiring` qui garantit que :

1. ✅ **Si le certificat existe déjà** : Il ne sera pas recréé
2. ✅ **Si le certificat est valide** : Il sera conservé
3. ✅ **Si le certificat expire bientôt** : Il sera renouvelé automatiquement

**Vous pouvez exécuter ce workflow autant de fois que vous voulez sans risque !**

### Renouvellement automatique

Le conteneur `blogpress-certbot` renouvelle automatiquement **tous les certificats** (y compris celui de ben-djibril) toutes les 12h. Aucune action manuelle requise.

## 📝 Configuration Nginx

### Vérifier que la configuration existe

La configuration `ben-djibril.kobecorporation.com.conf` doit être présente dans `blogpress-nginx/conf.d/`.

Si elle n'existe pas, copiez-la depuis le projet KOBE Corporation :

```bash
# Sur le serveur VPS
cp ~/kobe-corporation/setup-kobe-proxy/conf.d/ben-djibril.kobecorporation.com.conf \
   ~/blogpress/setup-proxy/conf.d/

# Ou directement dans le conteneur
docker cp ~/kobe-corporation/setup-kobe-proxy/conf.d/ben-djibril.kobecorporation.com.conf \
          blogpress-nginx:/etc/nginx/conf.d/
```

### Activer HTTPS

Une fois le certificat obtenu, décommenter les sections HTTPS dans `ben-djibril.kobecorporation.com.conf` (lignes 82-157) et recharger Nginx.

## 🧪 Tests

### Test 1 : Vérifier le certificat

```bash
docker exec blogpress-certbot certbot certificates | grep -A 10 "ben-djibril"
```

### Test 2 : Tester HTTPS

```bash
# Depuis le serveur
curl -I https://ben-djibril.kobecorporation.com

# Depuis l'extérieur
curl -I https://ben-djibril.kobecorporation.com
```

### Test 3 : Vérifier la redirection HTTP → HTTPS

```bash
curl -I http://ben-djibril.kobecorporation.com | grep -i location
```

## 🚨 Dépannage

### Erreur : "Configuration ben-djibril n'est pas présente"

**Solution :** Copiez la configuration depuis le projet KOBE Corporation :

```bash
# Option 1 : Via rsync depuis le projet KOBE
rsync -avz ~/kobe-corporation/setup-kobe-proxy/conf.d/ben-djibril.kobecorporation.com.conf \
           ~/blogpress/setup-proxy/conf.d/

# Option 2 : Via Docker
docker cp ~/kobe-corporation/setup-kobe-proxy/conf.d/ben-djibril.kobecorporation.com.conf \
          blogpress-nginx:/etc/nginx/conf.d/
```

### Erreur : "ben-djibril-site n'est pas sur le réseau"

**Solution :** Vérifiez votre `docker-compose.yaml` et redéployez :

```bash
cd ~/chemin/vers/ben-djibril
docker compose down
docker compose up -d
```

### Erreur : "Failed to obtain certificate"

**Causes possibles :**
1. Le domaine ne pointe pas vers le serveur
2. Le port 80 n'est pas accessible
3. La configuration Nginx n'est pas active

**Solutions :**
```bash
# Vérifier le DNS
dig ben-djibril.kobecorporation.com +short

# Vérifier l'accessibilité du port 80
curl -I http://ben-djibril.kobecorporation.com/.well-known/acme-challenge/test

# Vérifier la configuration Nginx
docker exec blogpress-nginx nginx -t
docker exec blogpress-nginx nginx -s reload
```

## 📚 Ressources

- [Guide SSL Automatisation KOBE](../../.github/GUIDE-SSL-AUTOMATISATION.md)
- [Guide Reverse Proxy Multi-Domaines](../../.github/GUIDE-REVERSE-PROXY-MULTI-DOMAINES.md)
- [Documentation Certbot](https://certbot.eff.org/docs/)

## ✅ Checklist de Déploiement

- [ ] Le sous-domaine pointe vers l'IP du serveur
- [ ] Le conteneur `ben-djibril-site` est déployé
- [ ] Le conteneur est sur le réseau `kobecorp-network`
- [ ] La configuration Nginx existe dans `blogpress-nginx`
- [ ] Les secrets GitHub sont configurés
- [ ] L'étape SSL est ajoutée dans le workflow
- [ ] Le certificat est obtenu
- [ ] Les sections HTTPS sont décommentées
- [ ] Nginx est rechargé
- [ ] HTTPS fonctionne

---

**💡 Note :** Ce guide peut être utilisé directement par une IA pour automatiser la configuration SSL dans le projet ben-djibril.
