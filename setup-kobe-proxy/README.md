# Configuration Reverse Proxy - KOBE Corporation

Configuration complète du reverse proxy nginx pour KOBE Corporation, similaire à la configuration blogpress-app.com.

## Structure

```
setup-kobe-proxy/
├── Dockerfile              # Image nginx avec certbot
├── nginx.conf              # Configuration globale nginx
├── compose.yaml            # Docker Compose avec nginx + certbot
├── conf.d/                 # Configurations par domaine
│   ├── kobecorporation.com.conf
│   └── ben-djibril.kobecorporation.com.conf
├── .env.example           # Variables d'environnement
└── README.md              # Ce fichier
```

## Prérequis

1. **DNS configuré** :
   - `kobecorporation.com` → IP du serveur
   - `www.kobecorporation.com` → IP du serveur
   - `ben-djibril.kobecorporation.com` → IP du serveur

2. **Réseau Docker** : Le réseau `kobecorp-network` sera créé automatiquement

3. **Ports disponibles** : 80 et 443 (si blogpress utilise déjà ces ports, vous devrez utiliser d'autres ports)

## Installation

### 1. Configurer les variables d'environnement

```bash
cd setup-kobe-proxy
cp .env.example .env
# Éditez .env avec vos valeurs
```

### 2. Configurer le container ben-djibril

Éditez `compose.yaml` et décommentez/configurez la section `ben-djibril` :

```yaml
ben-djibril:
  image: votre-image:latest
  container_name: ben-djibril-app
  restart: unless-stopped
  networks:
    - kobecorp-network
  expose:
    - "80"
```

Puis mettez à jour `conf.d/ben-djibril.kobecorporation.com.conf` avec le bon nom de container.

### 3. Démarrer les services

```bash
docker compose up -d --build
```

### 4. Obtenir les certificats SSL

#### Mode staging (test)

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

#### Mode production

1. Modifiez `.env` : `CERTBOT_MODE=production`
2. Décommentez les sections HTTPS dans `conf.d/*.conf`
3. Redémarrez nginx : `docker compose restart nginx`
4. Obtenez les certificats :

```bash
docker compose exec certbot certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email contact@kobecorporation.com \
  --agree-tos \
  --no-eff-email \
  -d kobecorporation.com \
  -d www.kobecorporation.com \
  -d ben-djibril.kobecorporation.com
```

## Configuration des ports

Si blogpress utilise déjà les ports 80/443, vous pouvez utiliser d'autres ports :

Dans `.env` :
```env
NGINX_HTTP_PORT=8080
NGINX_HTTPS_PORT=8443
```

Puis configurez votre firewall/router pour rediriger :
- `kobecorporation.com:80` → `serveur:8080`
- `kobecorporation.com:443` → `serveur:8443`

## Vérification

### Vérifier les logs

```bash
# Logs nginx
docker compose logs -f nginx

# Logs certbot
docker compose logs -f certbot

# Logs application web
docker compose logs -f web
```

### Tester la configuration nginx

```bash
docker compose exec nginx nginx -t
```

### Vérifier les certificats

```bash
docker compose exec certbot certbot certificates
```

## Renouvellement automatique

Le renouvellement des certificats SSL est automatique :
- Certbot vérifie et renouvelle toutes les 12h
- Nginx recharge sa configuration toutes les 6h

## Dépannage

### Les certificats ne s'obtiennent pas

1. Vérifiez que les DNS pointent vers le serveur
2. Vérifiez que le port 80 est accessible depuis l'extérieur
3. Vérifiez les logs : `docker compose logs certbot`

### L'application n'est pas accessible

1. Vérifiez que les containers sont démarrés : `docker compose ps`
2. Vérifiez que les containers sont sur le même réseau : `docker network inspect kobecorp-network`
3. Vérifiez les logs nginx : `docker compose logs nginx`

### Conflit de ports avec blogpress

Si blogpress utilise déjà les ports 80/443, vous avez deux options :

1. **Utiliser d'autres ports** (voir section "Configuration des ports")
2. **Utiliser le même nginx** : Intégrez les configurations KOBE dans le nginx de blogpress

## Coexistence avec blogpress

Les deux applications peuvent coexister si :
- Elles utilisent des ports différents, OU
- Elles partagent le même nginx reverse proxy

Pour partager le même nginx :
1. Copiez les fichiers de `conf.d/` dans le nginx de blogpress
2. Assurez-vous que les réseaux Docker sont compatibles
3. Redémarrez le nginx de blogpress

## Maintenance

### Mettre à jour l'application

```bash
docker compose pull web
docker compose up -d web
```

### Redémarrer nginx

```bash
docker compose restart nginx
```

### Forcer le renouvellement des certificats

```bash
docker compose exec certbot certbot renew --force-renewal
docker compose restart nginx
```

## Support

Pour toute question, consultez les logs ou contactez l'équipe de développement.
