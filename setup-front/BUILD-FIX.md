# Correction de l'erreur ETXTBSY avec esbuild

## Problème

L'erreur `ETXTBSY` (text file busy) avec esbuild est un problème connu dans Docker, souvent causé par :
- Un conflit de fichiers lors de l'installation
- Un problème de cache npm
- Un problème de permissions

## Solution appliquée

Le Dockerfile a été modifié pour :
1. Configurer npm avec des timeouts plus longs pour éviter les erreurs réseau
2. Ajouter des retries automatiques en cas de problème réseau
3. Utiliser `npm install` avec `--legacy-peer-deps` pour éviter les conflits de dépendances

## Solutions alternatives si le problème persiste

### Option 1 : Rebuild sans cache

```bash
docker compose build --no-cache
```

### Option 2 : Nettoyer Docker complètement

```bash
# Arrêter les containers
docker compose down

# Nettoyer les images et le cache
docker system prune -a

# Rebuild
docker compose build --no-cache
```

### Option 3 : Modifier le Dockerfile pour installer esbuild séparément

Si le problème persiste, vous pouvez modifier le Dockerfile pour installer esbuild avant les autres dépendances :

```dockerfile
# Installer esbuild séparément d'abord
RUN npm install esbuild --save-dev

# Puis installer les autres dépendances
RUN npm install --legacy-peer-deps
```

### Option 4 : Utiliser une version spécifique d'esbuild

Si le problème persiste, vous pouvez forcer une version spécifique d'esbuild dans package.json :

```json
"devDependencies": {
  "esbuild": "0.19.12",
  ...
}
```

## Test

Après avoir appliqué la correction, testez :

```bash
cd setup-front
docker compose build --no-cache
docker compose up -d
```
