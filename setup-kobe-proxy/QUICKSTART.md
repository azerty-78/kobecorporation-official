# Guide de démarrage rapide - KOBE Corporation Proxy

## Configuration créée

Une configuration complète de reverse proxy a été créée, similaire à celle de blogpress-app.com.

## Fichiers créés

- ✅ `Dockerfile` : Image nginx avec certbot
- ✅ `nginx.conf` : Configuration globale nginx
- ✅ `compose.yaml` : Docker Compose avec nginx, certbot et l'application web
- ✅ `conf.d/kobecorporation.com.conf` : Configuration pour le domaine principal
- ✅ `conf.d/ben-djibril.kobecorporation.com.conf` : Configuration pour le sous-domaine

## Étapes de déploiement

### 1. Créer le fichier .env

Créez un fichier `.env` dans `setup-kobe-proxy/` avec ce contenu :

```env
# Domaine principal
MAIN_DOMAIN=kobecorporation.com

# Sous-domaine
SUBDOMAIN=ben-djibril.kobecorporation.com

# Ports Nginx
NGINX_HTTP_PORT=80
NGINX_HTTPS_PORT=443

# Configuration Certbot
CERTBOT_EMAIL=contact@kobecorporation.com
CERTBOT_MODE=staging

# Docker Hub (optionnel)
DOCKERHUB_USERNAME=kobecorp
```

### 2. Configurer le container ben-djibril

Éditez `compose.yaml` et décommentez/modifiez la section `ben-djibril` :

```yaml
ben-djibril:
  image: votre-image:latest  # Remplacez par votre image
  container_name: ben-djibril-app
  restart: unless-stopped
  networks:
    - kobecorp-network
  expose:
    - "80"
```

Puis dans `conf.d/ben-djibril.kobecorporation.com.conf`, vérifiez que le nom du container correspond :

```nginx
upstream ben_djibril_backend {
    server ben-djibril-app:80;  # Doit correspondre au container_name
    keepalive 32;
}
```

### 3. Vérifier les ports

⚠️ **Important** : Si blogpress utilise déjà les ports 80/443, vous devez :

**Option A** : Utiliser d'autres ports dans `.env` :
```env
NGINX_HTTP_PORT=8080
NGINX_HTTPS_PORT=8443
```

**Option B** : Partager le même nginx avec blogpress (configuration avancée)

### 4. Démarrer les services

```bash
cd setup-kobe-proxy
docker compose up -d --build
```

### 5. Obtenir les certificats SSL

#### Test (staging)

```bash
docker compose exec certbot certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email contact@kobecorporation.com \
  --agree-tos \
  --no-eff-email \
  --staging \
  -d kobecorporation.com \
  -d www.kobecorporation.com \
  -d ben-djibril.kobecorporation.com
```

#### Production

1. Modifiez `.env` : `CERTBOT_MODE=production`
2. Décommentez les sections HTTPS dans `conf.d/*.conf`
3. Redémarrez : `docker compose restart nginx`
4. Obtenez les certificats (sans `--staging`)

### 6. Activer HTTPS

Une fois les certificats obtenus :

1. Décommentez les sections HTTPS dans :
   - `conf.d/kobecorporation.com.conf`
   - `conf.d/ben-djibril.kobecorporation.com.conf`

2. Redémarrez nginx :
```bash
docker compose restart nginx
```

## Vérification

```bash
# Vérifier les containers
docker compose ps

# Vérifier les logs
docker compose logs -f nginx

# Tester nginx
docker compose exec nginx nginx -t

# Vérifier les certificats
docker compose exec certbot certbot certificates
```

## Coexistence avec blogpress

Les deux applications peuvent coexister si elles utilisent des ports différents. Si vous voulez utiliser les mêmes ports, vous devrez intégrer les configurations KOBE dans le nginx de blogpress.

## Support

Consultez `README.md` pour plus de détails.
