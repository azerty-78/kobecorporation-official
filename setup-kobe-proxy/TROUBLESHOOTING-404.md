# 🔧 Dépannage : Erreur 404 Nginx

## 🔍 Diagnostic de l'erreur 404

Si vous obtenez une erreur 404 sur `kobecorporation.com` ou `ben-djibril.kobecorporation.com`, suivez ce guide de dépannage étape par étape.

## ✅ Checklist de Vérification

### Étape 1 : Vérifier que les conteneurs sont en cours d'exécution

```bash
# Sur le serveur VPS
docker ps | grep -E "kobecorporation-web|ben-djibril-site|blogpress-nginx"
```

**Résultat attendu :**

- ✅ `kobecorporation-web` : Status `Up` ou `Up (healthy)`
- ✅ `ben-djibril-site` : Status `Up` ou `Up (healthy)`
- ✅ `blogpress-nginx` : Status `Up` ou `Up (healthy)`

**Si un conteneur n'est pas démarré :**

```bash
# Pour kobecorporation-web
cd ~/kobe-corporation/setup-front
docker compose up -d

# Pour ben-djibril-site (dans son propre projet)
cd ~/chemin/vers/ben-djibril
docker compose up -d
```

### Étape 2 : Vérifier que les conteneurs sont sur le réseau kobecorp-network

```bash
# Vérifier le réseau
docker network inspect kobecorp-network
```

**Résultat attendu :**
Vous devriez voir dans la sortie :

- `blogpress-nginx`
- `kobecorporation-web`
- `ben-djibril-site`

**Si un conteneur n'est pas sur le réseau :**

```bash
# Connecter blogpress-nginx au réseau
docker network connect kobecorp-network blogpress-nginx

# Connecter kobecorporation-web au réseau
docker network connect kobecorp-network kobecorporation-web

# Connecter ben-djibril-site au réseau
docker network connect kobecorp-network ben-djibril-site
```

### Étape 3 : Vérifier que les configurations Nginx sont présentes

```bash
# Vérifier dans blogpress-nginx
docker exec blogpress-nginx ls -la /etc/nginx/conf.d/ | grep kobe
```

**Résultat attendu :**

- ✅ `kobecorporation.com.conf`
- ✅ `ben-djibril.kobecorporation.com.conf`

**Si les fichiers ne sont pas présents :**

```bash
# Option 1 : Utiliser le script de configuration
cd ~/kobe-corporation/setup-kobe-proxy
chmod +x configure-blogpress-nginx.sh
./configure-blogpress-nginx.sh

# Option 2 : Copier manuellement
docker cp ~/kobe-corporation/setup-kobe-proxy/conf.d/kobecorporation.com.conf \
          blogpress-nginx:/etc/nginx/conf.d/
docker cp ~/kobe-corporation/setup-kobe-proxy/conf.d/ben-djibril.kobecorporation.com.conf \
          blogpress-nginx:/etc/nginx/conf.d/
```

### Étape 4 : Vérifier la syntaxe Nginx

```bash
# Tester la configuration
docker exec blogpress-nginx nginx -t
```

**Résultat attendu :**

```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

**Si erreur de syntaxe :**

- Vérifiez les logs : `docker exec blogpress-nginx nginx -t 2>&1`
- Corrigez les erreurs dans les fichiers de configuration
- Rechargez : `docker exec blogpress-nginx nginx -s reload`

### Étape 5 : Vérifier la connectivité interne

```bash
# Tester depuis blogpress-nginx vers kobecorporation-web
docker exec blogpress-nginx wget -O- http://kobecorporation-web:80

# Tester depuis blogpress-nginx vers ben-djibril-site
docker exec blogpress-nginx wget -O- http://ben-djibril-site:80
```

**Résultat attendu :**

- ✅ Réponse HTML (code 200)
- ✅ Contenu de la page

**Si erreur de connexion :**

- Vérifiez que les conteneurs sont sur le même réseau
- Vérifiez que les conteneurs écoutent sur le port 80
- Vérifiez les logs : `docker logs kobecorporation-web` ou `docker logs ben-djibril-site`

### Étape 6 : Vérifier les logs Nginx

```bash
# Logs d'accès
docker exec blogpress-nginx tail -50 /var/log/nginx/access.log

# Logs d'erreur
docker exec blogpress-nginx tail -50 /var/log/nginx/error.log
```

**Cherchez :**

- Erreurs de connexion aux backends
- Erreurs de résolution DNS
- Erreurs de configuration

### Étape 7 : Tester avec curl depuis le serveur

```bash
# Tester kobecorporation.com
curl -H "Host: kobecorporation.com" http://localhost

# Tester ben-djibril.kobecorporation.com
curl -H "Host: ben-djibril.kobecorporation.com" http://localhost
```

**Résultat attendu :**

- ✅ Code HTTP 200
- ✅ Contenu HTML de la page

**Si erreur 404 :**

- Les configurations ne sont pas chargées
- Le `server_name` ne correspond pas
- Les conteneurs backend ne répondent pas

## 🔧 Solutions Courantes

### Solution 1 : Recharger Nginx

```bash
docker exec blogpress-nginx nginx -s reload
# Ou redémarrer si le reload échoue
docker restart blogpress-nginx
```

### Solution 2 : Vérifier le server_name

Les configurations doivent avoir exactement :

- `server_name kobecorporation.com www.kobecorporation.com;`
- `server_name ben-djibril.kobecorporation.com;`

Vérifiez dans les fichiers :

```bash
docker exec blogpress-nginx grep -r "server_name" /etc/nginx/conf.d/
```

### Solution 3 : Vérifier les upstreams

Les configurations doivent pointer vers :

- `server kobecorporation-web:80;`
- `server ben-djibril-site:80;`

Vérifiez :

```bash
docker exec blogpress-nginx grep -r "server.*:80" /etc/nginx/conf.d/
```

### Solution 4 : Redémarrer tous les conteneurs

```bash
# Redémarrer kobecorporation-web
cd ~/kobe-corporation/setup-front
docker compose restart

# Redémarrer ben-djibril-site
cd ~/chemin/vers/ben-djibril
docker compose restart

# Redémarrer blogpress-nginx
docker restart blogpress-nginx
```

## 🚨 Script de Diagnostic Complet

Créez ce script sur le serveur : `~/diagnostic-nginx.sh`

```bash
#!/bin/bash
echo "🔍 Diagnostic Nginx pour KOBE Corporation"
echo "=========================================="

echo ""
echo "1️⃣ Conteneurs en cours d'exécution :"
docker ps --format "table {{.Names}}\t{{.Status}}" | grep -E "kobecorporation|ben-djibril|blogpress-nginx"

echo ""
echo "2️⃣ Réseau kobecorp-network :"
docker network inspect kobecorp-network --format '{{range .Containers}}{{.Name}} {{end}}' 2>/dev/null || echo "❌ Réseau non trouvé"

echo ""
echo "3️⃣ Configurations dans blogpress-nginx :"
docker exec blogpress-nginx ls -la /etc/nginx/conf.d/ | grep -E "kobe|ben-djibril" || echo "❌ Aucune configuration trouvée"

echo ""
echo "4️⃣ Syntaxe Nginx :"
docker exec blogpress-nginx nginx -t 2>&1

echo ""
echo "5️⃣ Test de connectivité interne :"
echo "   kobecorporation-web:80"
docker exec blogpress-nginx wget -q -O- http://kobecorporation-web:80 | head -5 || echo "❌ Échec de connexion"
echo ""
echo "   ben-djibril-site:80"
docker exec blogpress-nginx wget -q -O- http://ben-djibril-site:80 | head -5 || echo "❌ Échec de connexion"

echo ""
echo "6️⃣ Test avec curl :"
echo "   kobecorporation.com"
curl -s -H "Host: kobecorporation.com" http://localhost | head -5 || echo "❌ Échec"
echo ""
echo "   ben-djibril.kobecorporation.com"
curl -s -H "Host: ben-djibril.kobecorporation.com" http://localhost | head -5 || echo "❌ Échec"

echo ""
echo "7️⃣ Dernières erreurs Nginx :"
docker exec blogpress-nginx tail -10 /var/log/nginx/error.log 2>/dev/null || echo "Aucune erreur récente"
```

Exécutez :

```bash
chmod +x ~/diagnostic-nginx.sh
~/diagnostic-nginx.sh
```

## 📋 Commandes Rapides de Correction

### Si les configurations ne sont pas présentes :

```bash
# Copier les configurations
docker cp ~/kobe-corporation/setup-kobe-proxy/conf.d/kobecorporation.com.conf \
          blogpress-nginx:/etc/nginx/conf.d/
docker cp ~/kobe-corporation/setup-kobe-proxy/conf.d/ben-djibril.kobecorporation.com.conf \
          blogpress-nginx:/etc/nginx/conf.d/

# Tester et recharger
docker exec blogpress-nginx nginx -t
docker exec blogpress-nginx nginx -s reload
```

### Si les conteneurs ne sont pas sur le réseau :

```bash
# Connecter tous les conteneurs au réseau
docker network connect kobecorp-network blogpress-nginx 2>/dev/null || true
docker network connect kobecorp-network kobecorporation-web 2>/dev/null || true
docker network connect kobecorp-network ben-djibril-site 2>/dev/null || true
```

### Si les conteneurs ne répondent pas :

```bash
# Vérifier les logs
docker logs kobecorporation-web --tail 50
docker logs ben-djibril-site --tail 50

# Redémarrer les conteneurs
cd ~/kobe-corporation/setup-front && docker compose restart
cd ~/chemin/vers/ben-djibril && docker compose restart
```

## 🎯 Solution Rapide (Tout en un)

```bash
# Sur le serveur VPS
cd ~/kobe-corporation/setup-kobe-proxy

# 1. Configurer blogpress-nginx
chmod +x configure-blogpress-nginx.sh
./configure-blogpress-nginx.sh

# 2. Vérifier que tout fonctionne
docker exec blogpress-nginx nginx -t
docker exec blogpress-nginx nginx -s reload

# 3. Tester
curl -H "Host: kobecorporation.com" http://localhost
curl -H "Host: ben-djibril.kobecorporation.com" http://localhost
```

---

**💡 Si le problème persiste**, partagez la sortie du script de diagnostic pour un dépannage plus approfondi.
