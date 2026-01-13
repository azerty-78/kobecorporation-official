# syntax=docker/dockerfile:1

# Stage 1: Build de l'application
ARG NODE_VERSION=22.13.1

FROM node:${NODE_VERSION}-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json package-lock.json ./

# Installer les dépendances (y compris devDependencies pour le build)
RUN npm ci

# Copier le code source
COPY . .

# Construire l'application pour la production
RUN npm run build

# Stage 2: Serveur nginx pour la production
FROM nginx:alpine AS production

# Copier la configuration nginx personnalisée
COPY setup-front/nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers buildés depuis le stage builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Commande pour démarrer nginx
CMD ["nginx", "-g", "daemon off;"]
