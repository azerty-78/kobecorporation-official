# 🚀 Démarrage rapide - KOBE Corporation avec Blogpress

## ⚠️ Situation : Ports 80/443 déjà utilisés par blogpress-nginx

## ✅ Solution : Intégrer dans blogpress-nginx (RECOMMANDÉ)

### Ce qu'il faut faire dans le projet Ben Djibril

**1. Modifier le `compose.yaml` :**

```yaml
services:
  server:
    container_name: ben-djibril-site  # ⚠️ Nom exact requis
    networks:
      - kobecorp-network
    expose:
      - "80"  # Port interne uniquement
    # ❌ RETIRER la section ports si elle existe

networks:
  kobecorp-network:
    name: kobecorp-network
    external: true  # ⚠️ Le réseau existe déjà
```

**2. Créer le réseau sur le serveur (une seule fois) :**

```bash
docker network create kobecorp-network
```

**3. Démarrer le container :**

```bash
cd /chemin/vers/ben-djibril
docker compose up -d
```

## 🔧 Intégration dans blogpress-nginx

### Sur le serveur, exécuter :

```bash
# 1. Trouver le chemin des configs blogpress
docker inspect blogpress-nginx | grep "conf.d" | grep "Source"

# 2. Copier les configs KOBE Corporation (remplacez /chemin par le vrai chemin)
cp /chemin/vers/kobecorporation/setup-kobe-proxy/conf.d/*.conf /chemin/vers/blogpress/conf.d/

# 3. Connecter blogpress-nginx au réseau kobecorp-network
docker network connect kobecorp-network blogpress-nginx

# 4. Tester la config
docker exec blogpress-nginx nginx -t

# 5. Recharger nginx
docker exec blogpress-nginx nginx -s reload
```

## 🔐 Obtenir les certificats SSL

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

## ✅ Démarrer KOBE Corporation

```bash
cd /chemin/vers/kobecorporation/setup-kobe-proxy

# Démarrer uniquement le container web (pas nginx)
docker compose up -d web
```

## 🧪 Vérification

```bash
# Vérifier les containers sur le réseau
docker network inspect kobecorp-network

# Tester les domaines
curl -I http://kobecorporation.com
curl -I http://ben-djibril.kobecorporation.com
```

## 📋 Checklist

- [ ] Réseau `kobecorp-network` créé
- [ ] Container ben-djibril configuré et démarré
- [ ] Configurations copiées dans blogpress/conf.d
- [ ] blogpress-nginx connecté au réseau kobecorp-network
- [ ] Container kobecorporation-web démarré
- [ ] Certificats SSL obtenus
- [ ] Sections HTTPS activées dans les configs
- [ ] DNS configurés

## 📚 Documentation complète

- `DEPLOYMENT-GUIDE.md` : Guide complet de déploiement
- `INTEGRATION-BLOGPRESS.md` : Détails de l'intégration
