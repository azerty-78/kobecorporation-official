# GitHub Actions CI/CD - KOBE Corporation

## Workflow disponible

### `setup-cicd.yml`

Workflow CI/CD pour automatiser le build et le push de l'image Docker.

## Secrets GitHub requis

Configurez ces secrets dans les paramètres du repository GitHub (Settings > Secrets and variables > Actions) :

### Secrets obligatoires

- `DOCKERHUB_USERNAME` : Votre nom d'utilisateur Docker Hub (ex: `azerty78`)
- `DOCKERHUB_PASSWORD` : Votre token/mot de passe Docker Hub

### Secrets optionnels (pour EmailJS)

- `VITE_EMAILJS_PUBLIC_KEY` : Clé publique EmailJS (optionnel)
- `VITE_EMAILJS_SERVICE_ID` : Service ID EmailJS (optionnel)
- `VITE_EMAILJS_CONTACT_TEMPLATE_ID` : Template ID pour le formulaire de contact (optionnel)
- `VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID` : Template ID pour la newsletter (optionnel)

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

- `VITE_EMAILJS_PUBLIC_KEY` (si défini dans les secrets)
- `VITE_EMAILJS_SERVICE_ID` (si défini dans les secrets)
- `VITE_EMAILJS_CONTACT_TEMPLATE_ID` (si défini dans les secrets)
- `VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID` (si défini dans les secrets)
- `VITE_APP_NAME` : "KOBE Corporation"
- `VITE_APP_URL` : "https://kobecorporation.com"

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
