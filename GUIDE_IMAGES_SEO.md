# 🎨 Guide de Création des Images SEO

**Date** : 17 janvier 2026  
**Projet** : KOBE Corporation

---

## 📋 Liste des Images Requises

### ✅ Images Déjà Présentes
- `public/favicon.png` (48x48px) ✅
- `public/logo-nom.jpeg` ✅

### 📝 Images à Créer

#### 1. Favicons (Multi-Résolutions)

| Fichier | Taille | Usage | Statut |
|---------|--------|-------|--------|
| `favicon-16x16.png` | 16x16px | Favicon standard | ❌ À créer |
| `favicon-32x32.png` | 32x32px | Favicon standard | ❌ À créer |
| `favicon.png` | 48x48px | Favicon standard | ✅ Existant |
| `apple-touch-icon.png` | 180x180px | iOS Safari | ❌ À créer |
| `android-chrome-192x192.png` | 192x192px | Android Chrome | ❌ À créer |
| `android-chrome-512x512.png` | 512x512px | Android Chrome | ❌ À créer |
| `favicon.ico` | Multi-résolutions | Favicon classique | ❌ À créer |

**Outils recommandés** :
- [RealFaviconGenerator](https://realfavicongenerator.net/) - Génère tous les formats automatiquement
- [Favicon.io](https://favicon.io/) - Création simple de favicons

**Instructions** :
1. Utiliser votre logo `logo-nom.jpeg` comme base
2. Uploader sur RealFaviconGenerator
3. Télécharger tous les formats générés
4. Placer dans le dossier `public/`

---

#### 2. Images Open Graph (Réseaux Sociaux)

| Fichier | Taille | Usage | Statut |
|---------|--------|-------|--------|
| `og-image.png` | 1200x630px | Open Graph par défaut | ❌ À créer |
| `og-image.jpg` | 1200x630px | Alternative JPG | ❌ Optionnel |
| `twitter-image.png` | 1200x600px | Twitter Card | ❌ À créer |

**Spécifications** :
- **Format** : PNG ou JPG
- **Taille** : 1200x630px (ratio 1.91:1)
- **Poids** : < 300 KB (optimisé)
- **Contenu** : Logo + Nom + Slogan "Build Your Own Legacy"

**Outils recommandés** :
- [Canva](https://www.canva.com/) - Template "Open Graph Image"
- [Figma](https://www.figma.com/) - Design personnalisé
- [Bannerbear](https://www.bannerbear.com/) - Génération automatique

**Design suggéré** :
```
┌─────────────────────────────────────┐
│                                     │
│     [LOGO KOBE CORPORATION]         │
│                                     │
│     KOBE Corporation                │
│     Build Your Own Legacy           │
│                                     │
│     Votre partenaire technologique  │
│     Cameroun • Yaoundé              │
│                                     │
└─────────────────────────────────────┘
```

**Couleurs recommandées** :
- Fond : Blanc (#FFFFFF) ou dégradé subtil
- Texte principal : Noir (#000000) ou Bleu foncé
- Accent : Bleu brand (#3b82f6)

---

#### 3. Images Spécifiques par Page (Optionnel mais Recommandé)

| Fichier | Taille | Page | Statut |
|---------|--------|------|--------|
| `og-home.png` | 1200x630px | Page d'accueil | ❌ Optionnel |
| `og-services.png` | 1200x630px | Services | ❌ Optionnel |
| `og-about.png` | 1200x630px | À propos | ❌ Optionnel |
| `og-contact.png` | 1200x630px | Contact | ❌ Optionnel |

**Note** : Si vous ne créez pas d'images spécifiques, `og-image.png` sera utilisée pour toutes les pages.

---

#### 4. Logo pour Schema.org

| Fichier | Taille | Usage | Statut |
|---------|--------|-------|--------|
| `logo.png` | 512x512px | Logo pour données structurées | ❌ À créer |

**Instructions** :
- Utiliser votre logo `logo-nom.jpeg`
- Redimensionner à 512x512px
- Format PNG avec fond transparent (si possible)
- Optimiser le poids

---

## 🛠️ Outils de Création

### 1. RealFaviconGenerator
**URL** : https://realfavicongenerator.net/
- Upload votre logo
- Génère tous les formats de favicons
- Télécharge un package complet
- **Gratuit**

### 2. Canva
**URL** : https://www.canva.com/
- Templates Open Graph disponibles
- Design professionnel
- Export optimisé
- **Gratuit** (avec compte)

### 3. Figma
**URL** : https://www.figma.com/
- Design personnalisé
- Export PNG/JPG optimisé
- **Gratuit**

### 4. ImageOptim / TinyPNG
**URL** : https://tinypng.com/
- Compression d'images
- Réduction du poids sans perte de qualité
- **Gratuit**

---

## 📐 Spécifications Techniques

### Favicons
- **Format** : PNG (recommandé) ou ICO
- **Couleurs** : Support des couleurs réelles
- **Fond** : Transparent (PNG) ou solide (ICO)
- **Optimisation** : Compresser avec TinyPNG

### Images Open Graph
- **Format** : PNG (meilleure qualité) ou JPG (plus léger)
- **Ratio** : 1.91:1 (1200x630px)
- **Poids** : < 300 KB
- **Couleurs** : sRGB
- **Texte** : Lisible même en miniature (minimum 24px)

---

## ✅ Checklist de Vérification

### Favicons
- [ ] `favicon-16x16.png` créé et testé
- [ ] `favicon-32x32.png` créé et testé
- [ ] `favicon.png` (48x48) présent
- [ ] `apple-touch-icon.png` (180x180) créé
- [ ] `android-chrome-192x192.png` créé
- [ ] `android-chrome-512x512.png` créé
- [ ] `favicon.ico` créé (multi-résolutions)
- [ ] Tous les favicons testés dans différents navigateurs

### Images Open Graph
- [ ] `og-image.png` (1200x630px) créé
- [ ] `twitter-image.png` (1200x600px) créé
- [ ] Images optimisées (< 300 KB)
- [ ] Testées avec [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Testées avec [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] Testées avec [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### Logo
- [ ] `logo.png` (512x512px) créé
- [ ] Format PNG avec fond transparent (si possible)
- [ ] Optimisé

---

## 🧪 Tests de Vérification

### 1. Test des Favicons
```bash
# Vérifier que les fichiers sont accessibles
curl -I https://www.kobecorporation.com/favicon-16x16.png
curl -I https://www.kobecorporation.com/apple-touch-icon.png
```

### 2. Test Open Graph (Facebook)
1. Aller sur https://developers.facebook.com/tools/debug/
2. Entrer : `https://www.kobecorporation.com`
3. Cliquer sur "Scraper" pour voir l'aperçu
4. Vérifier que l'image s'affiche correctement

### 3. Test Twitter Card
1. Aller sur https://cards-dev.twitter.com/validator
2. Entrer : `https://www.kobecorporation.com`
3. Vérifier l'aperçu de la carte

### 4. Test LinkedIn
1. Aller sur https://www.linkedin.com/post-inspector/
2. Entrer : `https://www.kobecorporation.com`
3. Vérifier l'aperçu

---

## 📝 Notes Importantes

1. **Nommage** : Respecter exactement les noms de fichiers indiqués
2. **Emplacement** : Tous les fichiers dans `public/`
3. **Optimisation** : Toujours compresser les images avant upload
4. **Mise à jour** : Si vous changez le logo, régénérer toutes les images
5. **Cache** : Après création, vider le cache du navigateur pour voir les changements

---

## 🚀 Actions Immédiates

1. **Créer les favicons** avec RealFaviconGenerator
2. **Créer og-image.png** avec Canva ou Figma
3. **Créer twitter-image.png** (peut être identique à og-image)
4. **Créer logo.png** (512x512px)
5. **Tester toutes les images** avec les outils de validation
6. **Déployer** et vérifier que tout fonctionne

---

**Dernière mise à jour** : 17 janvier 2026
