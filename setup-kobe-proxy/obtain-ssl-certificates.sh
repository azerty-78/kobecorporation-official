#!/bin/bash
set -e

CERTBOT_CONTAINER="blogpress-certbot"
NGINX_CONTAINER="blogpress-nginx"
EMAIL="bendjibril789@gmail.com"
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
if ! docker exec $NGINX_CONTAINER test -f /etc/nginx/conf.d/kobecorporation.com.conf 2>/dev/null; then
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
  --keep-until-expiring 2>&1 || {
    EXIT_CODE=$?
    echo ""
    if [ $EXIT_CODE -eq 1 ]; then
        echo "⚠️  Erreur lors de l'obtention des certificats"
        echo "💡 Vérifiez que :"
        echo "   - Les domaines pointent vers ce serveur"
        echo "   - Le port 80 est accessible depuis Internet"
        echo "   - Les configurations Nginx sont actives"
        echo "   - Le challenge /.well-known/acme-challenge/ est accessible"
    else
        echo "ℹ️  Les certificats existent déjà ou sont valides"
    fi
    exit $EXIT_CODE
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
