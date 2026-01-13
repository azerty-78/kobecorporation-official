# Dossier SSL

Placez vos certificats SSL dans ce dossier :

- `kobecorporation.com.crt` : Certificat SSL
- `kobecorporation.com.key` : Clé privée SSL

## Permissions recommandées

```bash
chmod 644 kobecorporation.com.crt
chmod 600 kobecorporation.com.key
```

## Obtenir des certificats Let's Encrypt

```bash
# Installer certbot
sudo apt-get install certbot

# Obtenir les certificats
sudo certbot certonly --standalone -d kobecorporation.com -d www.kobecorporation.com

# Copier les certificats
sudo cp /etc/letsencrypt/live/kobecorporation.com/fullchain.pem ./kobecorporation.com.crt
sudo cp /etc/letsencrypt/live/kobecorporation.com/privkey.pem ./kobecorporation.com.key
```

## Note

Pour la production, il est recommandé d'utiliser directement le volume Let's Encrypt plutôt que de copier les fichiers. Modifiez `compose.yaml` pour utiliser :

```yaml
volumes:
  - /etc/letsencrypt:/etc/letsencrypt:ro
```

Et mettez à jour `nginx.conf` pour pointer vers les certificats Let's Encrypt.
