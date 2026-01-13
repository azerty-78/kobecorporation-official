# Guide de déploiement - KOBE Corporation avec Blogpress existant

## 📊 Situation actuelle sur le serveur

Votre serveur a déjà :
- **blogpress-nginx** : Utilise les ports **80** et **443** (HTTP/HTTPS)
- **blogpress-certbot** : Gère les certificats SSL pour blogpress
- **blogpress-webapp** : Port 3000
- **blogpress-api** : Port 8090
- **blogpress-mongodb** : Port 27017

## ⚠️ Problème : Conflit de ports

Le reverse proxy KOBE Corporation ne peut **PAS** utiliser les ports 80/443 car ils sont déjà utilisés par blogpress-nginx.

## ✅ Solution recommandée : Intégration dans blogpress-nginx

La meilleure solution est d'**intégrer les configurations KOBE Corporation dans le nginx de blogpress** au lieu de créer un nouveau reverse proxy.

### Option 1 : Intégrer dans blogpress-nginx (RECOMMANDÉ)

#### Avantages
- ✅ Pas de conflit de ports
- ✅ Un seul point d'entrée
- ✅ Certificats SSL gérés par le même certbot
- ✅ Configuration centralisée

#### Étapes

1. **Copier les configurations dans blogpress**

```bash
# Sur le serveur
cd /chemin/vers/blogpress-nginx/conf.d

# Copier les configurations KOBE Corporation
cp /chemin/vers/kobecorporation/setup-kobe-proxy/conf.d/kobecorporation.com.conf .
cp /chemin/vers/kobecorporation/setup-kobe-proxy/conf.d/ben-djibril.kobecorporation.com.conf .
```

2. **Vérifier que les containers sont sur le même réseau**

Le container blogpress-nginx doit être sur le réseau `kobecorp-network` (ou vous devez créer un réseau partagé).

3. **Redémarrer blogpress-nginx**

```bash
docker restart blogpress-nginx
```

### Option 2 : Utiliser d'autres ports (Alternative)

Si vous préférez garder les deux reverse proxy séparés :

#### Configuration dans `.env` de setup-kobe-proxy

```env
# Utiliser d'autres ports
NGINX_HTTP_PORT=8080
NGINX_HTTPS_PORT=8443
```

#### Configuration du firewall/router

Vous devrez configurer votre firewall ou routeur pour rediriger :
- `kobecorporation.com:80` → `serveur:8080`
- `kobecorporation.com:443` → `serveur:8443`

**⚠️ Cette solution est moins recommandée car elle nécessite une configuration réseau supplémentaire.**

## 📋 Ce qu'il reste à faire dans le projet Ben Djibril

### 1. Configuration du compose.yaml

Dans le `compose.yaml` du projet ben-djibril, assurez-vous d'avoir :

```yaml
services:
  server:
    container_name: ben-djibril-site  # ⚠️ IMPORTANT : Nom exact
    networks:
      - kobecorp-network  # Réseau partagé
    expose:
      - "80"  # Port interne uniquement
    # ❌ NE PAS avoir de section ports (pas de port sur l'hôte)

networks:
  kobecorp-network:
    name: kobecorp-network
    external: true  # ⚠️ Le réseau existe déjà
```

### 2. Vérifier le nom du container

Le container **DOIT** s'appeler exactement `ben-djibril-site` pour que le reverse proxy puisse le trouver.

### 3. Créer le réseau si nécessaire

Si le réseau `kobecorp-network` n'existe pas encore :

```bash
# Sur le serveur
docker network create kobecorp-network
```

## 🔐 Gestion des certificats SSL

### Option A : Certbot partagé (si intégration dans blogpress-nginx)

Si vous intégrez dans blogpress-nginx, utilisez le certbot existant :

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

### Option B : Certbot séparé (si reverse proxy séparé)

Si vous utilisez un reverse proxy séparé sur d'autres ports, vous aurez besoin d'un certbot séparé dans `setup-kobe-proxy/compose.yaml` (déjà configuré).

**⚠️ Note** : Let's Encrypt nécessite que le port 80 soit accessible pour la validation. Si vous utilisez le port 8080, vous devrez configurer un redirect sur le port 80 vers 8080 pour les challenges.

## 🔄 Ordre de déploiement recommandé

### Si intégration dans blogpress-nginx :

1. **Créer le réseau partagé** (si nécessaire)
   ```bash
   docker network create kobecorp-network
   ```

2. **Démarrer le container ben-djibril** (dans son projet)
   ```bash
   cd /chemin/vers/ben-djibril
   docker compose up -d
   ```

3. **Démarrer le container kobecorporation-web** (dans setup-kobe-proxy)
   ```bash
   cd /chemin/vers/kobecorporation/setup-kobe-proxy
   docker compose up -d web
   ```

4. **Ajouter les configurations dans blogpress-nginx**
   - Copier les fichiers de conf.d
   - Redémarrer blogpress-nginx

5. **Obtenir les certificats SSL**
   ```bash
   docker exec blogpress-certbot certbot certonly ...
   ```

6. **Décommenter les sections HTTPS** dans les fichiers de configuration

7. **Redémarrer blogpress-nginx**

### Si reverse proxy séparé :

1. **Modifier `.env`** pour utiliser d'autres ports
2. **Créer le réseau partagé**
3. **Démarrer tous les services**
4. **Configurer le firewall/router pour rediriger les ports**

## 🧪 Tests de vérification

### 1. Vérifier que les containers sont sur le même réseau

```bash
docker network inspect kobecorp-network
```

Vous devriez voir :
- `blogpress-nginx` (si intégré)
- `kobecorporation-web`
- `ben-djibril-site`

### 2. Tester la connectivité

```bash
# Depuis blogpress-nginx (ou kobecorp-nginx)
docker exec blogpress-nginx wget -O- http://kobecorporation-web:80
docker exec blogpress-nginx wget -O- http://ben-djibril-site:80
```

### 3. Tester les domaines

```bash
# Test HTTP
curl -H "Host: kobecorporation.com" http://localhost
curl -H "Host: ben-djibril.kobecorporation.com" http://localhost

# Test HTTPS (après obtention des certificats)
curl -I https://kobecorporation.com
curl -I https://ben-djibril.kobecorporation.com
```

## 📝 Checklist finale

### Projet Ben Djibril
- [ ] Container name = `ben-djibril-site`
- [ ] Réseau = `kobecorp-network` (external: true)
- [ ] Port 80 exposé en interne uniquement (expose, pas ports)
- [ ] Container démarré et accessible

### Projet KOBE Corporation
- [ ] Container `kobecorporation-web` démarré
- [ ] Container sur le réseau `kobecorp-network`
- [ ] Configurations nginx copiées dans blogpress (si intégration)
- [ ] Ou ports alternatifs configurés (si séparé)

### Certificats SSL
- [ ] Certificats obtenus pour tous les domaines
- [ ] Sections HTTPS décommentées dans les configs
- [ ] Nginx redémarré

### DNS
- [ ] `kobecorporation.com` → IP du serveur
- [ ] `www.kobecorporation.com` → IP du serveur
- [ ] `ben-djibril.kobecorporation.com` → IP du serveur

## 🚨 Points d'attention

1. **Conflit de ports** : Les ports 80/443 sont déjà utilisés par blogpress
2. **Réseau partagé** : Tous les containers doivent être sur le même réseau
3. **Nom du container** : `ben-djibril-site` doit être exact
4. **Certificats SSL** : Utiliser le certbot existant si intégration dans blogpress-nginx

## 💡 Recommandation finale

**Intégrez KOBE Corporation dans blogpress-nginx** plutôt que de créer un reverse proxy séparé. C'est plus simple, plus propre, et évite tous les problèmes de ports.
