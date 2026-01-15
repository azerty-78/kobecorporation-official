# 🚀 Guide Pré-Déploiement - KOBE Corporation

## ✅ État Actuel du Projet

### Ce qui est FAIT ✅

1. **Application React complète**
   - ✅ Toutes les pages créées et optimisées
   - ✅ Design moderne et responsive
   - ✅ Animations et interactions
   - ✅ Multilingue (FR/EN)
   - ✅ SEO complet
   - ✅ Gestion des cookies (RGPD)

2. **Infrastructure**
   - ✅ Dockerfile multi-stage
   - ✅ Docker Compose configuré
   - ✅ Nginx configuré
   - ✅ Reverse proxy configuré
   - ✅ CI/CD GitHub Actions

3. **Optimisations**
   - ✅ Build de production optimisé
   - ✅ Compression gzip
   - ✅ Cache des assets
   - ✅ Headers de sécurité

### Ce qui reste à FAIRE ⚠️

## 🔴 ACTIONS CRITIQUES (Obligatoires avant déploiement)

### 1. Configuration EmailJS

**Étape 1 : Créer un compte EmailJS**
- Aller sur https://www.emailjs.com
- Créer un compte gratuit
- Noter votre Public Key

**Étape 2 : Créer un service email**
- Dans EmailJS, créer un service (Gmail, Outlook, etc.)
- Noter le Service ID

**Étape 3 : Créer les templates**
- Template pour le formulaire de contact
- Template pour la newsletter (optionnel)
- Noter les Template IDs

**Étape 4 : Créer le fichier `.env`**
```bash
cd setup-front
cp .env.example .env
# Éditer .env avec vos vraies valeurs
```

**Étape 5 : Implémenter l'envoi EmailJS dans le formulaire**
- Actuellement, le formulaire simule l'envoi
- Il faut intégrer EmailJS SDK

### 2. Image Open Graph (OG Image)

**Créer `public/og-image.png`** :
- Taille : 1200x630px
- Format : PNG ou JPG
- Contenu : Logo KOBE Corporation + "Build Your Own Legacy"
- Utilisé pour le partage sur les réseaux sociaux

### 3. Certificats SSL

**Option A : Let's Encrypt (Recommandé)**
```bash
# Sur le serveur
sudo certbot certonly --standalone -d kobecorporation.com -d www.kobecorporation.com
```

**Option B : Certificats existants**
- Placer dans `setup-kobe-proxy/ssl/`

### 4. Configuration DNS

**Vérifier que le domaine pointe vers le serveur** :
- A record : `kobecorporation.com` → IP du serveur
- A record : `www.kobecorporation.com` → IP du serveur
- Vérifier avec : `nslookup kobecorporation.com`

## 🟡 ACTIONS IMPORTANTES (Recommandées)

### 5. Pages Légales

**Créer les pages suivantes** :
- Politique de confidentialité (`/privacy`)
- Mentions légales (`/legal`)
- Conditions générales (`/terms`)

Ou créer des liens vers des documents externes dans le footer.

### 6. Tests Finaux

**Tests à effectuer** :
- [ ] Toutes les pages se chargent
- [ ] Navigation fonctionne
- [ ] Formulaire de contact envoie réellement
- [ ] Changement de langue fonctionne
- [ ] Cookies fonctionnent
- [ ] Responsive sur mobile/tablette/desktop
- [ ] Performance (Lighthouse score > 90)

### 7. Google Search Console

**Après déploiement** :
1. Aller sur https://search.google.com/search-console
2. Ajouter la propriété `kobecorporation.com`
3. Vérifier la propriété (via DNS ou fichier HTML)
4. Soumettre le sitemap : `https://www.kobecorporation.com/sitemap.xml`

## 📋 Checklist Rapide

### Avant le premier déploiement

- [ ] **Fichier `.env` créé** avec les variables EmailJS
- [ ] **EmailJS configuré** et testé
- [ ] **Image OG créée** (`public/og-image.png`)
- [ ] **Certificats SSL obtenus**
- [ ] **DNS configuré** et propagé
- [ ] **Build testé localement** (`npm run build`)
- [ ] **Tous les liens fonctionnent**
- [ ] **Pas d'erreurs console**

### Après le déploiement

- [ ] **Site accessible en HTTPS**
- [ ] **Toutes les pages se chargent**
- [ ] **Formulaire de contact fonctionne**
- [ ] **Google Search Console configuré**
- [ ] **Sitemap soumis**
- [ ] **Tests de performance effectués**

## 🔧 Commandes Utiles

### Test local
```bash
# Build
npm run build

# Preview
npm run preview

# Test Docker local
cd setup-front
docker compose up -d --build
```

### Déploiement
```bash
# Production avec reverse proxy
cd setup-kobe-proxy
docker compose up -d --build

# Vérifier les logs
docker compose logs -f

# Vérifier les conteneurs
docker compose ps
```

## 📞 Support

Pour toute question :
- Email : contact@kobecorporation.com
- Documentation : Voir `.github/CHECKLIST-PRE-DEPLOIEMENT.md`
