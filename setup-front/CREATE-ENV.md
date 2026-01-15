# 📝 Créer le fichier .env

## Instructions

1. **Copier le fichier exemple** :
   ```bash
   cd setup-front
   cp .env.example .env
   ```

2. **Éditer le fichier .env** et remplir les valeurs :
   - Variables EmailJS (obligatoires pour le formulaire de contact)
   - Le domaine `kobecorporation.com` est déjà configuré

3. **Structure du fichier .env** :

```env
# Variables EmailJS
VITE_EMAILJS_PUBLIC_KEY=votre_cle
VITE_EMAILJS_SERVICE_ID=votre_service_id
VITE_EMAILJS_CONTACT_TEMPLATE_ID=votre_template_id
VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID=votre_template_id

# Domaine (déjà configuré)
DOMAIN=kobecorporation.com
VITE_APP_URL=https://kobecorporation.com
VITE_APP_NAME=KOBE Corporation

# SSL (pour reverse proxy)
MAIN_DOMAIN=kobecorporation.com
SUBDOMAINS=www.kobecorporation.com,ben-djibril.kobecorporation.com
CERTBOT_EMAIL=contact@kobecorporation.com
```

## Important

- ⚠️ Le fichier `.env` ne doit **PAS** être commité dans Git
- ✅ Le fichier `.env.example` est commité et sert de modèle
- ✅ Le workflow de déploiement copie automatiquement le `.env` vers le serveur
- ✅ Le domaine `kobecorporation.com` est vérifié et ajouté automatiquement si absent
