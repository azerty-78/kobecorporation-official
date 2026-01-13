# Configuration Reverse Proxy - KOBE Corporation

Ce dossier contient la configuration du reverse proxy nginx pour le domaine **kobecorporation.com**.

## Structure

- **Dockerfile** : Image nginx pour le reverse proxy
- **nginx.conf** : Configuration nginx avec SSL/TLS
- **compose.yaml** : Configuration Docker Compose incluant le proxy et le service web
- **.env.example** : Exemple de variables d'environnement

## Prérequis

1. **Certificats SSL** : Vous devez avoir des certificats SSL pour kobecorporation.com
   - Option 1 : Certificats Let's Encrypt (recommandé)
   - Option 2 : Certificats commerciaux
   - Option 3 : Certificats auto-signés (développement uniquement)

2. **DNS** : Le domaine doit pointer vers l'IP de votre serveur
   - A record : `kobecorporation.com` → IP du serveur
   - A record : `www.kobecorporation.com` → IP du serveur (ou CNAME)

## Installation avec Let's Encrypt (Recommandé)

### 1. Obtenir les certificats avec certbot

```bash
# Installer certbot
sudo apt-get update
sudo apt-get install certbot

# Obtenir les certificats
sudo certbot certonly --standalone -d kobecorporation.com -d www.kobecorporation.com

# Les certificats seront dans /etc/letsencrypt/live/kobecorporation.com/
```

### 2. Copier les certificats dans le dossier ssl

```bash
mkdir -p setup-kobe-proxy/ssl
sudo cp /etc/letsencrypt/live/kobecorporation.com/fullchain.pem setup-kobe-proxy/ssl/kobecorporation.com.crt
sudo cp /etc/letsencrypt/live/kobecorporation.com/privkey.pem setup-kobe-proxy/ssl/kobecorporation.com.key
sudo chmod 644 setup-kobe-proxy/ssl/kobecorporation.com.crt
sudo chmod 600 setup-kobe-proxy/ssl/kobecorporation.com.key
```

### 3. Mettre à jour nginx.conf

Si vous utilisez Let's Encrypt, modifiez les chemins dans `nginx.conf` :

```nginx
ssl_certificate /etc/letsencrypt/live/kobecorporation.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/kobecorporation.com/privkey.pem;
```

Et dans `compose.yaml`, utilisez le volume Let's Encrypt :

```yaml
volumes:
  - /etc/letsencrypt:/etc/letsencrypt:ro
```

## Utilisation

### Démarrage

```bash
cd setup-kobe-proxy
docker compose up -d --build
```

### Vérification

```bash
# Vérifier les logs
docker compose logs -f

# Vérifier le statut
docker compose ps

# Tester la configuration nginx
docker compose exec proxy nginx -t
```

### Arrêt

```bash
docker compose down
```

## Renouvellement des certificats Let's Encrypt

Les certificats Let's Encrypt expirent après 90 jours. Pour les renouveler :

```bash
# Renouveler les certificats
sudo certbot renew

# Redémarrer le conteneur proxy
docker compose restart proxy
```

Pour automatiser le renouvellement, ajoutez une tâche cron :

```bash
# Éditer le crontab
sudo crontab -e

# Ajouter cette ligne (vérifie et renouvelle tous les jours à 3h du matin)
0 3 * * * certbot renew --quiet && docker compose -f /chemin/vers/setup-kobe-proxy/compose.yaml restart proxy
```

## Configuration

### Modifier le domaine

1. Modifiez `nginx.conf` : remplacez `kobecorporation.com` par votre domaine
2. Modifiez `.env` : mettez à jour les variables `DOMAIN` et `DOMAIN_WWW`
3. Reconstruisez : `docker compose up -d --build`

### Modifier les ports

Par défaut, le proxy écoute sur les ports 80 (HTTP) et 443 (HTTPS). Pour changer :

```yaml
ports:
  - "8080:80"   # HTTP
  - "8443:443"  # HTTPS
```

## Dépannage

### Erreur de certificat SSL

- Vérifiez que les certificats existent dans `./ssl/`
- Vérifiez les permissions des fichiers (644 pour .crt, 600 pour .key)
- Vérifiez que les chemins dans `nginx.conf` sont corrects

### Le service web n'est pas accessible

- Vérifiez que le service web est démarré : `docker compose ps`
- Vérifiez les logs : `docker compose logs web`
- Vérifiez que les deux services sont sur le même réseau Docker

### Redirection infinie

- Vérifiez la configuration de redirection www dans `nginx.conf`
- Vérifiez que le proxy passe correctement les headers `X-Forwarded-Proto`

## Sécurité

Cette configuration inclut :

- ✅ Redirection HTTP → HTTPS
- ✅ Headers de sécurité (HSTS, X-Frame-Options, etc.)
- ✅ Configuration SSL/TLS moderne
- ✅ Compression gzip
- ✅ Cache des assets statiques
- ✅ Protection contre les fichiers cachés

## Support

Pour toute question ou problème, consultez la documentation nginx ou contactez l'équipe de développement.
