# syntax=docker/dockerfile:1

# Stage 1: Build de l'application
ARG NODE_VERSION=22.13.1

# Variables d'environnement pour le build (Vite les nécessite au moment du build)
ARG VITE_EMAILJS_PUBLIC_KEY
ARG VITE_EMAILJS_SERVICE_ID
ARG VITE_EMAILJS_CONTACT_TEMPLATE_ID
ARG VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID

FROM node:${NODE_VERSION}-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json package-lock.json ./

# Installer les dépendances (y compris devDependencies pour le build)
# L'erreur ETXTBSY avec esbuild peut être résolue en utilisant npm install
# avec des options spécifiques et en nettoyant le cache
RUN npm cache clean --force && \
    npm install --legacy-peer-deps --prefer-offline --no-audit

# Copier le code source
COPY . .

# Définir les variables d'environnement pour le build
ENV VITE_EMAILJS_PUBLIC_KEY=${VITE_EMAILJS_PUBLIC_KEY}
ENV VITE_EMAILJS_SERVICE_ID=${VITE_EMAILJS_SERVICE_ID}
ENV VITE_EMAILJS_CONTACT_TEMPLATE_ID=${VITE_EMAILJS_CONTACT_TEMPLATE_ID}
ENV VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID=${VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID}

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
