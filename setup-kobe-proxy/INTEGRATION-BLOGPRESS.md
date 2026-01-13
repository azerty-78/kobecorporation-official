# Guide d'intégration dans blogpress-nginx

## 🎯 Objectif

Intégrer les configurations KOBE Corporation dans le nginx de blogpress existant pour éviter les conflits de ports.

## 📋 Étapes d'intégration

### 1. Sur le serveur, localiser les fichiers blogpress

```bash
# Trouver où sont les configurations blogpress
docker inspect blogpress-nginx | grep -A 10 "Mounts"
```

Vous devriez voir quelque chose comme :
```
/chemin/vers/blogpress/nginx.conf:/etc/nginx/nginx.conf
/chemin/vers/blogpress/conf.d:/etc/nginx/conf.d
```

### 2. Copier les configurations KOBE Corporation

```bash
# Aller dans le dossier conf.d de blogpress
cd /chemin/vers/blogpress/conf.d

# Copier les configurations KOBE Corporation
cp /chemin/vers/kobecorporation/setup-kobe-proxy/conf.d/kobecorporation.com.conf .
cp /chemin/vers/kobecorporation/setup-kobe-proxy/conf.d/ben-djibril.kobecorporation.com.conf .
```

### 3. Vérifier que blogpress-nginx est sur le réseau kobecorp-network

```bash
# Vérifier les réseaux de blogpress-nginx
docker inspect blogpress-nginx | grep -A 5 "Networks"

# Si kobecorp-network n'est pas présent, l'ajouter
docker network connect kobecorp-network blogpress-nginx
```

### 4. Modifier le compose.yaml de blogpress (optionnel)

Si vous voulez que blogpress-nginx soit toujours sur le réseau kobecorp-network, modifiez le `compose.yaml` de blogpress :

```yaml
services:
  nginx:
    # ... votre configuration existante ...
    networks:
      - blogpress-network  # Réseau existant
      - kobecorp-network   # Ajouter ce réseau

networks:
  blogpress-network:
    # ... configuration existante ...
  kobecorp-network:
    name: kobecorp-network
    external: true
```

### 5. Tester la configuration nginx

```bash
# Tester la syntaxe
docker exec blogpress-nginx nginx -t

# Si OK, recharger nginx
docker exec blogpress-nginx nginx -s reload
```

### 6. Obtenir les certificats SSL

```bash
# Obtenir les certificats pour KOBE Corporation
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

### 7. Activer HTTPS

Une fois les certificats obtenus :

1. **Décommenter les sections HTTPS** dans :
   - `conf.d/kobecorporation.com.conf`
   - `conf.d/ben-djibril.kobecorporation.com.conf`

2. **Commenter les sections HTTP** (ou les laisser pour redirection)

3. **Recharger nginx** :
   ```bash
   docker exec blogpress-nginx nginx -s reload
   ```

## 🔍 Vérification

### Vérifier que tout fonctionne

```bash
# Vérifier les containers sur le réseau
docker network inspect kobecorp-network

# Tester la connectivité depuis blogpress-nginx
docker exec blogpress-nginx wget -O- http://kobecorporation-web:80
docker exec blogpress-nginx wget -O- http://ben-djibril-site:80

# Tester les domaines
curl -I http://kobecorporation.com
curl -I http://ben-djibril.kobecorporation.com
```

## 📝 Notes importantes

- Les certificats SSL seront dans `/etc/letsencrypt/live/` (gérés par blogpress-certbot)
- Les logs seront dans les mêmes fichiers que blogpress
- Un seul reverse proxy gère tous les domaines
- Pas de conflit de ports
