# Guide de déploiement en production

## Configuration Docker pour la production

Cette configuration utilise un build multi-stage optimisé pour la production avec nginx.

## Structure

- **Dockerfile** : Build multi-stage (Node.js pour le build + nginx pour servir)
- **nginx.conf** : Configuration nginx optimisée pour une SPA React
- **compose.yaml** : Configuration Docker Compose pour la production

## Utilisation

### Build et démarrage local

```bash
cd setup-front
docker compose up --build
```

L'application sera disponible sur http://localhost

### Build de l'image Docker

```bash
cd setup-front
docker build -f Dockerfile -t kobecorporation:latest ..
```

### Push vers un registre Docker

```bash
# Tag l'image
docker tag kobecorporation:latest votre-registry.com/kobecorporation:latest

# Push l'image
docker push votre-registry.com/kobecorporation:latest
```

### Déploiement sur un serveur

1. Copier les fichiers `Dockerfile`, `nginx.conf`, et `compose.yaml` sur le serveur
2. Exécuter :
```bash
docker compose up -d --build
```

## Optimisations incluses

- ✅ Build multi-stage pour réduire la taille de l'image finale
- ✅ Compression gzip activée
- ✅ Cache des assets statiques (1 an)
- ✅ Support du routing SPA (React Router)
- ✅ Headers de sécurité
- ✅ Healthcheck pour le monitoring
- ✅ Restart automatique en cas d'erreur

## Variables d'environnement

Pour ajouter des variables d'environnement, modifiez le fichier `compose.yaml` :

```yaml
environment:
  - NODE_ENV=production
  - VOTRE_VARIABLE=valeur
```

## Ports

Par défaut, l'application écoute sur le port 80. Pour changer le port, modifiez la section `ports` dans `compose.yaml` :

```yaml
ports:
  - "8080:80"  # Port externe:Port interne
```
