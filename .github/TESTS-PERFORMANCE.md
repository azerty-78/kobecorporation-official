# 🚀 Guide de Tests de Performance - KOBE Corporation

## Outils Recommandés

### 1. Lighthouse (Chrome DevTools)

**Accès** :
1. Ouvrir Chrome DevTools (F12)
2. Onglet "Lighthouse"
3. Sélectionner "Performance"
4. Cliquer sur "Analyze page load"

**Objectifs** :
- Performance : **> 90**
- Accessibility : **> 90**
- Best Practices : **> 90**
- SEO : **> 90**

### 2. PageSpeed Insights

**URL** : https://pagespeed.web.dev/

**Utilisation** :
1. Entrer l'URL du site
2. Cliquer sur "Analyze"
3. Vérifier les scores mobile et desktop

**Objectifs** :
- Performance : **> 90**
- FCP (First Contentful Paint) : **< 1.8s**
- LCP (Largest Contentful Paint) : **< 2.5s**
- CLS (Cumulative Layout Shift) : **< 0.1**

### 3. WebPageTest

**URL** : https://www.webpagetest.org/

**Utilisation** :
1. Entrer l'URL
2. Sélectionner l'emplacement de test
3. Lancer le test
4. Analyser les résultats

## Métriques Clés à Surveiller

### Performance Core Web Vitals

1. **LCP (Largest Contentful Paint)**
   - Objectif : < 2.5s
   - Mesure : Temps de chargement du plus grand élément visible

2. **FID (First Input Delay)**
   - Objectif : < 100ms
   - Mesure : Temps de réponse à la première interaction

3. **CLS (Cumulative Layout Shift)**
   - Objectif : < 0.1
   - Mesure : Stabilité visuelle de la page

### Autres Métriques

- **TTFB (Time to First Byte)** : < 600ms
- **FCP (First Contentful Paint)** : < 1.8s
- **Speed Index** : < 3.4s
- **Total Blocking Time** : < 200ms

## Checklist de Performance

### ✅ Images

- [ ] Images optimisées (compression)
- [ ] Format WebP utilisé quand possible
- [ ] Lazy loading activé (`loading="lazy"`)
- [ ] Dimensions appropriées (pas de redimensionnement CSS)
- [ ] Alt text présent

### ✅ CSS

- [ ] CSS minifié en production
- [ ] CSS critique inline pour above-the-fold
- [ ] Unused CSS supprimé (purge)
- [ ] Pas de @import dans CSS

### ✅ JavaScript

- [ ] JS minifié en production
- [ ] Code splitting activé
- [ ] Tree shaking activé
- [ ] Pas de polyfills inutiles
- [ ] Déferrer les scripts non critiques

### ✅ Réseau

- [ ] Compression gzip/brotli activée
- [ ] Cache headers configurés
- [ ] CDN utilisé (si applicable)
- [ ] HTTP/2 activé

### ✅ Serveur

- [ ] Nginx optimisé
- [ ] Cache configuré
- [ ] Headers de sécurité présents
- [ ] SSL/TLS configuré

## Commandes de Test

### Test Local avec Lighthouse CLI

```bash
# Installer Lighthouse CLI
npm install -g lighthouse

# Tester une page
lighthouse http://localhost:5173 --view

# Tester avec options
lighthouse http://localhost:5173 --only-categories=performance --output=html --output-path=./lighthouse-report.html
```

### Test avec Vite Preview

```bash
# Build de production
npm run build

# Preview
npm run preview

# Tester avec Lighthouse
lighthouse http://localhost:4173 --view
```

### Test Docker

```bash
# Build et démarrer
cd setup-front
docker compose up -d --build

# Tester
lighthouse http://localhost:80 --view
```

## Optimisations Déjà en Place

### ✅ Implémentées

1. **Lazy Loading** : Toutes les images ont `loading="lazy"`
2. **Code Splitting** : Vite le fait automatiquement
3. **Minification** : CSS et JS minifiés en production
4. **Compression** : Gzip activé dans nginx
5. **Cache** : Headers de cache configurés dans nginx
6. **Tree Shaking** : Activé par Vite

### ⚠️ À Vérifier

1. **Images** : Vérifier la compression et le format
2. **Fonts** : Vérifier le chargement (si Google Fonts utilisé)
3. **Third-party scripts** : Minimiser les scripts externes

## Actions Correctives

### Si Performance < 90

1. **Optimiser les images**
   - Utiliser WebP
   - Compresser avec TinyPNG ou ImageOptim
   - Redimensionner aux bonnes dimensions

2. **Réduire le JavaScript**
   - Analyser le bundle avec `npm run build -- --analyze`
   - Supprimer les dépendances inutiles
   - Utiliser dynamic imports pour les routes

3. **Optimiser le CSS**
   - Vérifier le purge CSS
   - Inline le CSS critique
   - Déferrer le CSS non critique

4. **Améliorer le serveur**
   - Vérifier la compression
   - Optimiser les cache headers
   - Utiliser HTTP/2

## Rapport de Performance

Après chaque test, documenter :

- **Date** : [Date du test]
- **URL testée** : [URL]
- **Lighthouse Score** : [Score]
- **Core Web Vitals** :
  - LCP : [Valeur]
  - FID : [Valeur]
  - CLS : [Valeur]
- **Problèmes identifiés** : [Liste]
- **Actions correctives** : [Liste]

## Automatisation

### GitHub Actions (Optionnel)

Créer un workflow pour tester automatiquement la performance :

```yaml
name: Performance Test
on:
  pull_request:
    branches: [main]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install -g lighthouse
      - run: lighthouse https://votre-site.com --output=html --output-path=./lighthouse-report.html
      - uses: actions/upload-artifact@v3
        with:
          name: lighthouse-report
          path: ./lighthouse-report.html
```

## Ressources

- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [Web.dev Performance](https://web.dev/performance/)
- [Core Web Vitals](https://web.dev/vitals/)
- [PageSpeed Insights](https://pagespeed.web.dev/)

---

**Note** : Effectuer ces tests régulièrement, notamment après chaque déploiement majeur.
