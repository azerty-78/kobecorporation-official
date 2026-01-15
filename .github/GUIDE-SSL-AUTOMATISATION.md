# 🔐 Guide Complet : Certificats SSL Automatisés

## 📋 Vue d'ensemble

Ce guide explique comment obtenir et automatiser les certificats SSL pour `kobecorporation.com` et ses sous-domaines en utilisant le certbot existant de blogpress.

## 🎯 Architecture

```
blogpress-certbot (Let's Encrypt)
    ↓
Gère les certificats pour :
- blogpress-app.com
- kobecorporation.com
- www.kobecorporation.com
- ben-djibril.kobecorporation.com
```

## 📝 Prérequis

1. ✅ Les domaines pointent vers l'IP du serveur
2. ✅ Le port 80 est accessible depuis Internet
3. ✅ blogpress-nginx est configuré avec les configurations KOBE
4. ✅ Le conteneur `blogpress-certbot` est en cours d'exécution

## 🚀 Méthode 1 : Obtention Manuelle (Première fois)

### Étape 1 : Vérifier que blogpress-nginx est configuré

```bash
# Vérifier que les configurations KOBE sont présentes
docker exec blogpress-nginx ls -la /etc/nginx/conf.d/ | grep kobe

# Vérifier la syntaxe
docker exec blogpress-nginx nginx -t

# Recharger si nécessaire
docker exec blogpress-nginx nginx -s reload
```

### Étape 2 : Obtenir les certificats

```bash
# Obtenir les certificats pour tous les domaines KOBE
docker exec blogpress-certbot certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email bendjibril789@gmail.com \
  --agree-tos \
  --no-eff-email \
  -d kobecorporation.com \
  -d www.kobecorporation.com \
  -d ben-djibril.kobecorporation.com
```

**Explication des paramètres :**

- `--webroot` : Utilise le mode webroot (pas besoin d'arrêter Nginx)
- `--webroot-path=/var/www/certbot` : Chemin où certbot place les challenges
- `--email` : Email pour les notifications Let's Encrypt
- `--agree-tos` : Accepte les conditions d'utilisation
- `--no-eff-email` : Ne pas partager l'email avec EFF
- `-d` : Domaines à certifier

### Étape 3 : Vérifier les certificats

```bash
# Lister les certificats obtenus
docker exec blogpress-certbot certbot certificates

# Vérifier les fichiers
docker exec blogpress-certbot ls -la /etc/letsencrypt/live/
```

Les certificats seront dans :

- `/etc/letsencrypt/live/kobecorporation.com/`
- `/etc/letsencrypt/live/www.kobecorporation.com/`
- `/etc/letsencrypt/live/ben-djibril.kobecorporation.com/`

### Étape 4 : Activer HTTPS dans les configurations

Décommenter les sections HTTPS dans :

- `setup-kobe-proxy/conf.d/kobecorporation.com.conf` (lignes 86-174)
- `setup-kobe-proxy/conf.d/ben-djibril.kobecorporation.com.conf` (lignes 82-157)

Puis copier les fichiers mis à jour dans blogpress-nginx et recharger :

```bash
# Copier les configurations mises à jour
cp setup-kobe-proxy/conf.d/*.conf /chemin/vers/blogpress/conf.d/

# Ou directement dans le conteneur
docker cp setup-kobe-proxy/conf.d/kobecorporation.com.conf blogpress-nginx:/etc/nginx/conf.d/
docker cp setup-kobe-proxy/conf.d/ben-djibril.kobecorporation.com.conf blogpress-nginx:/etc/nginx/conf.d/

# Tester et recharger
docker exec blogpress-nginx nginx -t
docker exec blogpress-nginx nginx -s reload
```

## 🤖 Méthode 2 : Automatisation dans le Workflow CI/CD

### Étape 1 : Ajouter une étape dans le workflow

Le workflow peut automatiquement obtenir les certificats lors du premier déploiement.

### Étape 2 : Script d'automatisation

Créez un script `setup-kobe-proxy/obtain-ssl-certificates.sh` :

```bash
#!/bin/bash
set -e

CERTBOT_CONTAINER="blogpress-certbot"
NGINX_CONTAINER="blogpress-nginx"
EMAIL="contact@kobecorporation.com"
DOMAINS="kobecorporation.com www.kobecorporation.com ben-djibril.kobecorporation.com"

echo "🔐 Obtention des certificats SSL pour KOBE Corporation"
echo "======================================================"

# Vérifier que certbot est en cours d'exécution
if ! docker ps | grep -q "$CERTBOT_CONTAINER"; then
    echo "❌ Erreur: $CERTBOT_CONTAINER n'est pas en cours d'exécution"
    exit 1
fi

# Vérifier que nginx est en cours d'exécution
if ! docker ps | grep -q "$NGINX_CONTAINER"; then
    echo "❌ Erreur: $NGINX_CONTAINER n'est pas en cours d'exécution"
    exit 1
fi

# Vérifier que les configurations sont présentes
if ! docker exec $NGINX_CONTAINER test -f /etc/nginx/conf.d/kobecorporation.com.conf; then
    echo "⚠️  Les configurations KOBE ne sont pas présentes dans blogpress-nginx"
    echo "💡 Exécutez d'abord: ./configure-blogpress-nginx.sh"
    exit 1
fi

# Obtenir les certificats
echo ""
echo "📋 Obtention des certificats pour: $DOMAINS"
echo ""

docker exec $CERTBOT_CONTAINER certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email "$EMAIL" \
  --agree-tos \
  --no-eff-email \
  --non-interactive \
  -d kobecorporation.com \
  -d www.kobecorporation.com \
  -d ben-djibril.kobecorporation.com \
  --keep-until-expiring || {
    echo ""
    echo "⚠️  Erreur lors de l'obtention des certificats"
    echo "💡 Vérifiez que :"
    echo "   - Les domaines pointent vers ce serveur"
    echo "   - Le port 80 est accessible depuis Internet"
    echo "   - Les configurations Nginx sont actives"
    exit 1
  }

echo ""
echo "✅ Certificats obtenus avec succès !"
echo ""
echo "📋 Certificats disponibles :"
docker exec $CERTBOT_CONTAINER certbot certificates

echo ""
echo "💡 Prochaines étapes :"
echo "   1. Décommentez les sections HTTPS dans les fichiers de configuration"
echo "   2. Copiez les fichiers mis à jour dans blogpress-nginx"
echo "   3. Rechargez Nginx: docker exec $NGINX_CONTAINER nginx -s reload"
```

## 🔄 Renouvellement Automatique

### Déjà configuré dans blogpress-certbot

Le conteneur `blogpress-certbot` renouvelle automatiquement les certificats toutes les 12h (voir la configuration dans `blogpress/setup-proxy/compose.yaml`).

### Vérifier le renouvellement

```bash
# Voir les logs de renouvellement
docker logs blogpress-certbot --tail 50

# Tester le renouvellement manuellement
docker exec blogpress-certbot certbot renew --dry-run
```

### Redémarrer Nginx après renouvellement

Si les certificats sont renouvelés, Nginx doit être rechargé. Le conteneur `blogpress-nginx` devrait avoir un script qui recharge automatiquement Nginx après le renouvellement.

## 🧪 Tests

### Test 1 : Vérifier les certificats

```bash
# Lister les certificats
docker exec blogpress-certbot certbot certificates

# Vérifier la date d'expiration
docker exec blogpress-certbot certbot certificates | grep "Expiry Date"
```

### Test 2 : Tester HTTPS

```bash
# Test depuis le serveur
curl -I https://kobecorporation.com
curl -I https://www.kobecorporation.com
curl -I https://ben-djibril.kobecorporation.com

# Test depuis l'extérieur
curl -I https://kobecorporation.com
```

### Test 3 : Vérifier la redirection HTTP → HTTPS

```bash
# Devrait rediriger vers HTTPS
curl -I http://kobecorporation.com | grep -i location
```

## 📋 Checklist de Déploiement SSL

- [ ] Les domaines pointent vers l'IP du serveur
- [ ] Le port 80 est accessible depuis Internet
- [ ] blogpress-nginx est configuré avec les configurations KOBE
- [ ] Les configurations HTTP sont actives (pour le challenge certbot)
- [ ] Les certificats sont obtenus avec certbot
- [ ] Les sections HTTPS sont décommentées dans les fichiers de config
- [ ] Les configurations mises à jour sont copiées dans blogpress-nginx
- [ ] Nginx est rechargé
- [ ] HTTPS fonctionne pour tous les domaines
- [ ] La redirection HTTP → HTTPS fonctionne

## 🚨 Dépannage

### Erreur : "Failed to obtain certificate"

**Causes possibles :**

1. Le domaine ne pointe pas vers le serveur
2. Le port 80 n'est pas accessible
3. Le challenge `.well-known/acme-challenge/` n'est pas accessible

**Solutions :**

```bash
# Vérifier que le domaine pointe vers le serveur
dig kobecorporation.com +short

# Vérifier que le port 80 est accessible
curl -I http://kobecorporation.com/.well-known/acme-challenge/test

# Vérifier la configuration Nginx
docker exec blogpress-nginx nginx -t
```

### Erreur : "Certificate already exists"

Si les certificats existent déjà, certbot ne les recréera pas. Pour forcer le renouvellement :

```bash
docker exec blogpress-certbot certbot renew --force-renewal
```

### Erreur : "Too many certificates already issued"

Let's Encrypt limite à 50 certificats par domaine par semaine. Attendez ou utilisez un certificat existant.

## 📚 Ressources

- [Documentation Certbot](https://certbot.eff.org/docs/)
- [Let's Encrypt Rate Limits](https://letsencrypt.org/docs/rate-limits/)
- [Guide Reverse Proxy Multi-Domaines](./GUIDE-REVERSE-PROXY-MULTI-DOMAINES.md)
