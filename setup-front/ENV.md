# Configuration des variables d'environnement

## Fichier .env

Créez un fichier `.env` dans le dossier `setup-front` en copiant `.env.example` :

```bash
cd setup-front
cp .env.example .env
```

Puis modifiez les valeurs selon vos besoins.

## Variables disponibles

### Variables de base

- `NODE_ENV` : Environnement (production, development)
- `VITE_APP_NAME` : Nom de l'application
- `VITE_APP_URL` : URL de l'application en production

### Variables optionnelles

- `VITE_API_URL` : URL de l'API backend
- `VITE_API_TIMEOUT` : Timeout pour les requêtes API (en ms)
- `VITE_CONTACT_API_URL` : URL de l'endpoint pour le formulaire de contact
- `VITE_CONTACT_EMAIL` : Email de contact
- `VITE_GA_TRACKING_ID` : ID de tracking Google Analytics
- `VITE_GTM_ID` : ID Google Tag Manager

## Utilisation dans le code

Les variables d'environnement préfixées par `VITE_` sont accessibles dans le code via `import.meta.env` :

```typescript
// Dans votre code React/TypeScript
const apiUrl = import.meta.env.VITE_API_URL || 'https://api.kobecorporation.com';
const appName = import.meta.env.VITE_APP_NAME || 'KOBE Corporation';
```

## Important

⚠️ **Note** : Seules les variables préfixées par `VITE_` sont exposées au client. Ne mettez jamais de secrets ou de clés API dans ces variables.

## Variables au build time

Les variables d'environnement sont intégrées au moment du build. Pour les modifier, vous devez reconstruire l'image Docker :

```bash
docker compose build --no-cache
docker compose up -d
```

## Exemple d'utilisation

Dans `src/utils/api.ts` :

```typescript
const API_URL = import.meta.env.VITE_API_URL || 'https://api.kobecorporation.com';
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '30000', 10);

export async function fetchData(endpoint: string) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    signal: AbortSignal.timeout(API_TIMEOUT),
  });
  return response.json();
}
```
