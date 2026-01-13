# GitHub Actions CI/CD - KOBE Corporation

## Workflow disponible

### `setup-cicd.yml`

Workflow CI/CD pour automatiser le build et le push de l'image Docker.

## Secrets GitHub requis

Configurez ces secrets dans les paramètres du repository GitHub (Settings > Secrets and variables > Actions) :

### Secrets obligatoires

- `DOCKERHUB_USERNAME` : Votre nom d'utilisateur Docker Hub (ex: `azerty78`)
- `DOCKERHUB_PASSWORD` : Votre token/mot de passe Docker Hub

### Variables d'environnement (depuis le fichier .env)

Les variables EmailJS sont lues automatiquement depuis le fichier `setup-front/.env` :
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_CONTACT_TEMPLATE_ID`
- `VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID`

**⚠️ Important** : 
- Le fichier `setup-front/.env` doit être présent dans le repository pour que les variables soient lues
- Si le fichier `.env` est dans `.gitignore`, vous devez soit :
  - Le commiter explicitement (pas recommandé pour la sécurité)
  - Créer un fichier `setup-front/.env.example` avec les valeurs et le copier en `.env` dans le workflow
  - Utiliser des secrets GitHub pour les valeurs sensibles (mais ce n'est pas la méthode préférée ici)

## Déclenchement

Le workflow se déclenche automatiquement :
- Sur push vers `main` ou `master`
- Sur pull request vers `main` ou `master`
- Manuellement depuis l'onglet Actions (bouton "Run workflow")

## Jobs

### 1. 🏷️ Create Git Tags
- Affiche les informations sur les tags Git
- Affiche les informations du commit

### 2. 🔨 Build & Push Docker Image
- Build l'image Docker `azerty78/kobecorporation-web`
- Push l'image vers Docker Hub (sauf sur PR)
- Génère automatiquement des tags (latest, branch, sha, etc.)

### 3. 🧪 Test Docker Image
- Teste que le container démarre correctement
- Vérifie que l'application répond sur le port 80
- S'exécute uniquement sur push (pas sur PR)

## Image Docker

- **Nom** : `azerty78/kobecorporation-web`
- **Tags générés** :
  - `latest` (sur la branche principale)
  - `main` ou `master` (nom de la branche)
  - `main-<sha>` ou `master-<sha>` (branche + SHA)
  - Tags semver si disponibles

## Variables d'environnement de build

Les variables suivantes sont passées au build Docker :

- `VITE_EMAILJS_PUBLIC_KEY` (lu depuis `setup-front/.env`)
- `VITE_EMAILJS_SERVICE_ID` (lu depuis `setup-front/.env`)
- `VITE_EMAILJS_CONTACT_TEMPLATE_ID` (lu depuis `setup-front/.env`)
- `VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID` (lu depuis `setup-front/.env`)
- `VITE_APP_NAME` : "KOBE Corporation"
- `VITE_APP_URL` : "https://kobecorporation.com"

**Note** : Si le fichier `setup-front/.env` n'existe pas, les variables EmailJS seront vides (ce qui est acceptable si vous n'utilisez pas EmailJS).

## Utilisation

### Déclencher manuellement

1. Allez dans l'onglet "Actions" de votre repository
2. Sélectionnez "🚀 KOBE Corporation CI/CD"
3. Cliquez sur "Run workflow"
4. Choisissez la branche et cliquez sur "Run workflow"

### Vérifier les builds

1. Allez dans l'onglet "Actions"
2. Cliquez sur le workflow pour voir les détails
3. Vérifiez que tous les jobs sont verts ✅

### Vérifier l'image sur Docker Hub

Après un build réussi, l'image sera disponible sur :
```
https://hub.docker.com/r/azerty78/kobecorporation-web
```

## Prochaines étapes

Le job de déploiement sera ajouté plus tard pour automatiser le déploiement sur le serveur de production.
