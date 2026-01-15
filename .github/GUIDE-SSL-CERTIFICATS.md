# 🔒 Guide d'Activation des Certificats SSL - KOBE Corporation

## Vue d'ensemble

Ce guide explique comment activer les certificats SSL (HTTPS) pour KOBE Corporation en utilisant Let's Encrypt avec Certbot dans Docker.

## Architecture

```
Internet (HTTPS:443) → Nginx Reverse Proxy (SSL) → Application Web (HTTP:80)
                      ↓
                  Certbot (Renouvellement automatique)
```

## Prérequis

1. **Domaine configuré** : `kobecorporation.com` et `www.kobecorporation.com` pointent vers l'IP du VPS
2. **Ports ouverts** : 80 (HTTP) et 443 (HTTPS) doivent être accessibles
3. **Docker installé** sur le VPS
4. **Application déployée** : Le conteneur `kobecorporation-web` doit être en cours d'exécution

## Méthode 1 : Certificats SSL avec Certbot (Recommandé)

### Étape 1 : Vérifier la configuration DNS

```bash
# Vérifier que le domaine pointe vers le VPS
nslookup kobecorporation.com
nslookup www.kobecorporation.com

# Les deux doivent retourner l'IP de votre VPS
```

### Étape 2 : Arrêter temporairement le reverse proxy (si en cours d'exécution)

```bash
# Si vous avez un reverse proxy qui utilise les ports 80/443
cd ~/kobe-corporation/setup-kobe-proxy
docker compose down
```

### Étape 3 : Obtenir les certificats avec Certbot

#### Option A : Certbot standalone (Temporaire)

```bash
# Installer Certbot
sudo apt-get update
sudo apt-get install -y certbot

# Obtenir les certificats (nécessite que les ports 80/443 soient libres)
sudo certbot certonly --standalone \
  -d kobecorporation.com \
  -d www.kobecorporation.com \
  --email contact@kobecorporation.com \
  --agree-tos \
  --non-interactive

# Les certificats seront dans :
# /etc/letsencrypt/live/kobecorporation.com/
#   - fullchain.pem (certificat + chaîne)
#   - privkey.pem (clé privée)
```

#### Option B : Certbot via Docker (Recommandé)

```bash
# Créer le répertoire pour les certificats
sudo mkdir -p /etc/letsencrypt
sudo chmod 755 /etc/letsencrypt

# Obtenir les certificats avec Certbot Docker
docker run -it --rm \
  -v /etc/letsencrypt:/etc/letsencrypt \
  -v /var/lib/letsencrypt:/var/lib/letsencrypt \
  -p 80:80 \
  -p 443:443 \
  certbot/certbot certonly --standalone \
  -d kobecorporation.com \
  -d www.kobecorporation.com \
  --email contact@kobecorporation.com \
  --agree-tos \
  --non-interactive
```

### Étape 4 : Configurer le reverse proxy avec SSL

#### Modifier `setup-kobe-proxy/conf.d/kobecorporation.com.conf`

```nginx
server {
    listen 80;
    server_name kobecorporation.com www.kobecorporation.com;
    
    # Redirection HTTP vers HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name kobecorporation.com www.kobecorporation.com;

    # Certificats SSL
    ssl_certificate /etc/letsencrypt/live/kobecorporation.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/kobecorporation.com/privkey.pem;

    # Configuration SSL moderne
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384';
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Headers de sécurité
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Proxy vers l'application
    location / {
        proxy_pass http://kobecorporation-web:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Étape 5 : Configurer Docker Compose avec Certbot

#### Modifier `setup-kobe-proxy/compose.yaml`

Assurez-vous que les volumes sont correctement configurés :

```yaml
services:
  nginx:
    volumes:
      # Certificats SSL (read-only)
      - /etc/letsencrypt:/etc/letsencrypt:ro
      # Challenge Certbot
      - kobe-certbot-www:/var/www/certbot:ro

  certbot:
    image: certbot/certbot:latest
    container_name: kobecorp-certbot
    restart: unless-stopped
    volumes:
      - kobe-certbot-certs:/etc/letsencrypt
      - kobe-certbot-www:/var/www/certbot
    entrypoint: >
      /bin/sh -c "
      trap exit TERM; 
      while :; do 
        certbot renew --quiet; 
        sleep 12h & wait $${!}; 
      done
      "

volumes:
  kobe-certbot-certs:
    name: kobe-certbot-certs
  kobe-certbot-www:
    name: kobe-certbot-www
```

### Étape 6 : Démarrer le reverse proxy

```bash
cd ~/kobe-corporation/setup-kobe-proxy
docker compose up -d --build
```

### Étape 7 : Vérifier le renouvellement automatique

```bash
# Vérifier que Certbot est en cours d'exécution
docker ps | grep certbot

# Tester le renouvellement manuellement
docker exec kobecorp-certbot certbot renew --dry-run

# Vérifier les logs
docker logs kobecorp-certbot
```

## Méthode 2 : Certificats SSL existants

Si vous avez déjà des certificats SSL :

### Étape 1 : Copier les certificats sur le serveur

```bash
# Créer le répertoire
sudo mkdir -p /etc/letsencrypt/live/kobecorporation.com

# Copier les certificats
sudo cp votre-certificat.crt /etc/letsencrypt/live/kobecorporation.com/fullchain.pem
sudo cp votre-cle.key /etc/letsencrypt/live/kobecorporation.com/privkey.pem

# Définir les permissions
sudo chmod 644 /etc/letsencrypt/live/kobecorporation.com/fullchain.pem
sudo chmod 600 /etc/letsencrypt/live/kobecorporation.com/privkey.pem
```

### Étape 2 : Configurer Nginx

Utiliser la même configuration que dans la Méthode 1, Étape 4.

## Vérification

### Test 1 : Vérifier HTTPS

```bash
# Depuis votre machine locale
curl -I https://kobecorporation.com

# Doit retourner :
# HTTP/2 200
# strict-transport-security: max-age=31536000; includeSubDomains
```

### Test 2 : Vérifier la redirection HTTP → HTTPS

```bash
curl -I http://kobecorporation.com

# Doit retourner :
# HTTP/1.1 301 Moved Permanently
# Location: https://kobecorporation.com/
```

### Test 3 : Vérifier avec SSL Labs

1. Aller sur https://www.ssllabs.com/ssltest/
2. Entrer `kobecorporation.com`
3. Vérifier le score (objectif : A ou A+)

### Test 4 : Vérifier dans le navigateur

1. Ouvrir https://kobecorporation.com
2. Vérifier que le cadenas vert est présent
3. Cliquer sur le cadenas pour voir les détails du certificat

## Renouvellement automatique

### Avec Certbot Docker (Recommandé)

Le conteneur `kobecorp-certbot` renouvelle automatiquement les certificats toutes les 12 heures.

### Vérifier le renouvellement

```bash
# Vérifier les logs
docker logs kobecorp-certbot

# Tester le renouvellement
docker exec kobecorp-certbot certbot renew --dry-run

# Redémarrer Nginx après renouvellement (automatique avec le script)
```

### Avec Cron (Alternative)

```bash
# Éditer le crontab
sudo crontab -e

# Ajouter cette ligne (renouvelle tous les jours à 3h du matin)
0 3 * * * certbot renew --quiet && docker restart kobecorp-nginx
```

## Dépannage

### Problème 1 : Certificat non trouvé

```bash
# Vérifier que les certificats existent
ls -la /etc/letsencrypt/live/kobecorporation.com/

# Vérifier les permissions
sudo chmod 644 /etc/letsencrypt/live/kobecorporation.com/fullchain.pem
sudo chmod 600 /etc/letsencrypt/live/kobecorporation.com/privkey.pem
```

### Problème 2 : Port 80/443 déjà utilisé

```bash
# Vérifier quels processus utilisent les ports
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :443

# Arrêter les processus qui utilisent ces ports
sudo systemctl stop apache2  # Si Apache est installé
sudo systemctl stop nginx     # Si Nginx système est installé
```

### Problème 3 : DNS non propagé

```bash
# Vérifier la propagation DNS
dig kobecorporation.com
dig www.kobecorporation.com

# Attendre 24-48h pour la propagation complète
```

### Problème 4 : Rate limit Let's Encrypt

Let's Encrypt limite à 5 certificats par domaine par semaine.

```bash
# Vérifier le nombre de certificats émis
certbot certificates

# Si limite atteinte, attendre ou utiliser le mode staging
certbot certonly --standalone --staging -d kobecorporation.com
```

## Commandes utiles

```bash
# Vérifier les certificats
sudo certbot certificates

# Renouveler manuellement
sudo certbot renew

# Revoguer un certificat
sudo certbot revoke --cert-path /etc/letsencrypt/live/kobecorporation.com/cert.pem

# Vérifier la configuration Nginx
docker exec kobecorp-nginx nginx -t

# Recharger Nginx
docker exec kobecorp-nginx nginx -s reload

# Voir les logs Nginx
docker logs kobecorp-nginx

# Voir les logs Certbot
docker logs kobecorp-certbot
```

## Sécurité supplémentaire

### 1. Activer HSTS (déjà dans la config)

```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
```

### 2. Désactiver les anciennes versions de TLS

```nginx
ssl_protocols TLSv1.2 TLSv1.3;  # Ne pas utiliser TLSv1.0 ou TLSv1.1
```

### 3. Utiliser des ciphers forts

```nginx
ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384';
```

## Support

Pour toute question :
- Email : contact@kobecorporation.com
- Documentation : Voir `DEPLOYMENT.md`

---

**Note** : Les certificats Let's Encrypt expirent après 90 jours. Le renouvellement automatique doit être configuré pour éviter l'expiration.
