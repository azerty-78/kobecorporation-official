# syntax=docker/dockerfile:1

FROM nginx:alpine

# Copier la configuration nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Créer le répertoire pour les certificats SSL
RUN mkdir -p /etc/nginx/ssl

# Exposer les ports HTTP et HTTPS
EXPOSE 80 443

# Commande pour démarrer nginx
CMD ["nginx", "-g", "daemon off;"]
