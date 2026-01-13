# Instructions pour l'intégration du site Ben Djibril

## 📋 Modifications nécessaires dans le frontend

### 1. Structure des dossiers

Le site ben-djibril doit être dans un dossier séparé à la racine du projet :

```
kobecorporation/
├── setup-front/          # Site principal KOBE Corporation
├── setup-kobe-proxy/     # Reverse proxy nginx
└── ben-djibril-site/     # ⚠️ À CRÉER - Site Ben Djibril
    ├── src/
    ├── public/
    ├── package.json
    ├── vite.config.ts
    └── .env
```

### 2. Dockerfile

Le site ben-djibril utilise un **Dockerfile spécifique** (`setup-kobe-proxy/Dockerfile.ben-djibril`) basé sur celui du site principal.

**✅ Déjà configuré** - Le Dockerfile accepte les variables d'environnement VITE_* en tant qu'ARG et peut utiliser une configuration nginx personnalisée.

### 3. Configuration nginx dans le container

Le site ben-djibril utilise nginx pour servir les fichiers statiques. Le Dockerfile copie automatiquement `setup-front/nginx.conf` dans le container.

**⚠️ IMPORTANT** : Si le site ben-djibril a besoin d'une configuration nginx différente, vous avez deux options :

#### Option A : Utiliser la même configuration (recommandé)
1. Copiez `setup-front/nginx.conf` dans `ben-djibril-site/nginx.conf`
2. Le Dockerfile utilisera ce fichier

#### Option B : Configuration nginx personnalisée
1. Créez un fichier `ben-djibril-site/nginx.conf` avec votre configuration personnalisée
2. Le Dockerfile utilisera ce fichier

### 4. Variables d'environnement

Le fichier `.env` du site ben-djibril doit contenir :

```env
# Variables EmailJS (requises pour le build)
VITE_EMAILJS_PUBLIC_KEY=votre_public_key_here
VITE_EMAILJS_SERVICE_ID=votre_service_id_here
VITE_EMAILJS_CONTACT_TEMPLATE_ID=votre_contact_template_id_here
VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID=votre_newsletter_template_id_here

# Autres variables
NODE_ENV=production
```

**⚠️ IMPORTANT** : Les variables `VITE_*` doivent être définies **AVANT** le build Docker car Vite les intègre au moment du build.

### 5. Configuration du reverse proxy

**✅ DÉJÀ CONFIGURÉ** - Le reverse proxy nginx dans `setup-kobe-proxy` est déjà configuré pour :
- Router `ben-djibril.kobecorporation.com` vers le container `ben-djibril-site:80`
- Gérer les certificats SSL automatiquement
- Mettre en cache les assets statiques

### 6. Build et déploiement

Le site ben-djibril sera construit automatiquement par Docker Compose depuis `setup-kobe-proxy/compose.yaml`.

**Chemin du build** : Le `context` pointe vers `../ben-djibril-site`, et le Dockerfile utilisé est `setup-kobe-proxy/Dockerfile.ben-djibril`. Le dossier `ben-djibril-site/` doit exister à la racine du projet.

### 7. Vérifications à faire

1. ✅ Le dossier `ben-djibril-site/` existe à la racine
2. ✅ Le fichier `.env` existe dans `ben-djibril-site/` avec toutes les variables VITE_*
3. ✅ Le `package.json` contient le script `build: vite build`
4. ✅ La structure du projet est similaire au site principal (React + Vite)
5. ✅ Le fichier `vite.config.ts` est configuré correctement

### 8. Commandes de test

```bash
# Depuis setup-kobe-proxy
docker compose build ben-djibril
docker compose up -d ben-djibril

# Vérifier les logs
docker compose logs -f ben-djibril

# Tester l'accès
curl http://ben-djibril.kobecorporation.com
```

### 9. Points d'attention

- **Traefik** : L'ancienne configuration utilisait Traefik, mais nous utilisons maintenant nginx comme reverse proxy. Les labels Traefik ne sont plus nécessaires.
- **Ports** : Le container expose le port 80 en interne, accessible uniquement via le réseau Docker `kobecorp-network`.
- **Réseau** : Le container doit être sur le réseau `kobecorp-network` (déjà configuré).
- **Variables d'environnement** : Les variables VITE_* doivent être dans le `.env` et seront passées au build via les ARG du Dockerfile.

### 10. Structure recommandée du projet ben-djibril

```
ben-djibril-site/
├── src/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   ├── App.tsx
│   └── main.tsx
├── public/
│   └── favicon.png
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .env
└── .gitignore
```

### 11. Exemple de vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
```

### 12. Exemple de package.json

```json
{
  "name": "ben-djibril-site",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5.1.1",
    "vite": "^7.2.4"
  }
}
```

## ✅ Checklist de déploiement

- [ ] Dossier `ben-djibril-site/` créé à la racine
- [ ] Fichier `.env` créé avec toutes les variables VITE_*
- [ ] Structure du projet React/Vite en place
- [ ] `package.json` avec le script `build`
- [ ] `vite.config.ts` configuré
- [ ] Test du build local : `npm run build`
- [ ] Variables d'environnement EmailJS configurées
- [ ] DNS pointant vers le serveur (ben-djibril.kobecorporation.com)

## 📝 Notes importantes

1. **Le Dockerfile est partagé** : Le site ben-djibril utilise le même Dockerfile que le site principal. Si vous avez besoin d'une configuration différente, créez un Dockerfile spécifique.

2. **Variables au build time** : Les variables VITE_* sont intégrées au moment du build, pas au runtime. Vous devez reconstruire l'image si vous changez ces variables.

3. **Reverse proxy** : Le nginx dans `setup-kobe-proxy` gère le routing et le SSL. Le nginx dans le container ben-djibril sert uniquement les fichiers statiques.

4. **Réseau Docker** : Les deux sites partagent le même réseau `kobecorp-network` pour communiquer via le reverse proxy.

## 🚀 Déploiement

Une fois tout configuré :

```bash
cd setup-kobe-proxy
docker compose up -d --build
```

Le site sera accessible sur `http://ben-djibril.kobecorporation.com` (puis HTTPS après obtention des certificats).
