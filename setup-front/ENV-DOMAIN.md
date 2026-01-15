# 📝 Configuration du Domaine - KOBE Corporation

## Fichier .env

Le fichier `.env` dans `setup-front/` doit contenir le domaine `kobecorporation.com`.

### Variables requises

```env
# Domaine principal
DOMAIN=kobecorporation.com
VITE_APP_URL=https://kobecorporation.com
VITE_APP_NAME=KOBE Corporation

# Variables EmailJS
VITE_EMAILJS_PUBLIC_KEY=votre_cle
VITE_EMAILJS_SERVICE_ID=votre_service_id
VITE_EMAILJS_CONTACT_TEMPLATE_ID=votre_template_id
VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID=votre_template_id
```

## Vérification

### 1. Créer le fichier .env

```bash
cd setup-front
cp .env.example .env
# Éditer .env avec vos valeurs
```

### 2. Vérifier que le domaine est présent

```bash
grep "kobecorporation.com" setup-front/.env
```

### 3. Le workflow de déploiement

Le workflow GitHub Actions :

- ✅ Copie automatiquement le fichier `.env` vers le serveur
- ✅ Vérifie que le domaine `kobecorporation.com` est présent
- ✅ Crée un `.env` minimal avec le domaine si le fichier n'existe pas

## Emplacement sur le serveur

Après déploiement, le fichier `.env` sera dans :

```
~/kobe-corporation/setup-front/.env
```

## Important

⚠️ **Le fichier `.env` ne doit PAS être commité dans Git** (il est dans `.gitignore`).

✅ **Le fichier `.env.example` est commité** et sert de modèle.
