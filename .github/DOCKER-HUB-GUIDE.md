# 📦 Guide Docker Hub - Gestion des Images

## 🔍 Comment fonctionne Docker Hub ?

### 1. **Les Images ne s'écrasent PAS, mais les Tags peuvent changer**

**Important** : Quand vous poussez une image avec un tag, voici ce qui se passe :

- ✅ **L'image précédente avec le même tag est remplacée** (le tag pointe vers la nouvelle image)
- ✅ **L'ancienne image existe toujours** sur Docker Hub (mais sans tag)
- ✅ **Chaque image a un ID unique** (digest SHA256) qui ne change jamais
- ✅ **Plusieurs tags peuvent pointer vers la même image**

**Exemple** :
```bash
# Push 1 : Image ID abc123 avec tag "latest"
docker push azerty78/kobecorporation-web:latest

# Push 2 : Image ID def456 avec tag "latest" 
docker push azerty78/kobecorporation-web:latest

# Résultat :
# - L'image abc123 existe toujours (orpheline, sans tag)
# - Le tag "latest" pointe maintenant vers def456
# - Les deux images occupent de l'espace !
```

### 2. **Limites Docker Hub**

#### Plan Gratuit (Free) :
- ✅ **1 repository privé** OU **illimité de repositories publics**
- ✅ **6 mois de rétention** pour les images non utilisées
- ⚠️ **Pas de limite de taille** mais attention à l'accumulation
- ⚠️ **Rate limiting** : 200 pulls toutes les 6 heures (anonyme), illimité (authentifié)

#### Plan Payant (Pro/Team) :
- ✅ **Repositories privés illimités**
- ✅ **Rétention illimitée**
- ✅ **Pas de rate limiting**

### 3. **Problème : Accumulation d'Images**

Avec votre workflow actuel, à chaque push :
- Une nouvelle image est créée
- Plusieurs tags sont créés (latest, branch-name, sha, etc.)
- Les anciennes images restent sur Docker Hub (sans tag)

**Exemple après 100 commits** :
- 100 images différentes
- Chaque image ~50-200 MB
- **Total : 5-20 GB d'espace utilisé !**

---

## 🛠️ Solutions et Bonnes Pratiques

### Solution 1 : Nettoyage Automatique (Recommandé)

Ajouter un job dans votre workflow pour supprimer les anciennes images :

```yaml
# Job de nettoyage (à ajouter)
cleanup:
  name: 🧹 Cleanup Old Images
  runs-on: ubuntu-latest
  needs: build
  if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/master'
  
  steps:
    - name: 🗑️ Delete old untagged images
      # Utiliser l'API Docker Hub pour supprimer les images orphelines
```

### Solution 2 : Limiter les Tags Créés

Modifier votre workflow pour créer moins de tags :

**Actuellement** (beaucoup de tags) :
- `latest`
- `main` ou `master`
- `main-{sha}`
- `v1.0.0` (si release)
- `dev-{sha}-{timestamp}` (si développement)

**Recommandé** (moins de tags) :
- `latest` (seulement sur main)
- `v{version}` (seulement pour les releases)
- `dev-{sha}` (seulement pour le développement, sans timestamp)

### Solution 3 : Utiliser Docker Hub Retention Policies

Docker Hub peut automatiquement supprimer les images :
- Non utilisées depuis X jours
- Sans tag depuis X jours
- Basées sur des règles personnalisées

**Configuration** : Dans Docker Hub → Settings → Retention Policies

### Solution 4 : Nettoyer Manuellement

Via l'interface Docker Hub :
1. Allez sur https://hub.docker.com/r/azerty78/kobecorporation-web
2. Onglet "Tags"
3. Supprimez les tags inutiles
4. Les images orphelines seront supprimées automatiquement après 6 mois (plan gratuit)

Via l'API Docker Hub :
```bash
# Lister les tags
curl -u azerty78:password https://hub.docker.com/v2/repositories/azerty78/kobecorporation-web/tags/

# Supprimer un tag spécifique
curl -X DELETE -u azerty78:password https://hub.docker.com/v2/repositories/azerty78/kobecorporation-web/tags/{tag_name}/
```

---

## 📊 Votre Workflow Actuel

### Tags créés actuellement :

1. **Sur chaque push vers main** :
   - `latest` ← **Écrase l'ancien**
   - `main` ← **Écrase l'ancien**
   - `main-{sha}` ← **Nouveau à chaque fois** (unique)
   - `dev-{sha}-{timestamp}` ← **Nouveau à chaque fois** (unique)

2. **Sur chaque release (v1.0.0)** :
   - `v1.0.0` ← **Écrase si le tag existe déjà**
   - `v1.0` ← **Écrase si le tag existe déjà**
   - `latest` ← **Écrase l'ancien**

### Problème identifié :

- ✅ Les tags `latest`, `main`, `v1.0.0` écrasent les anciennes images (OK)
- ⚠️ Les tags `main-{sha}` et `dev-{sha}-{timestamp}` créent une nouvelle image à chaque fois
- ⚠️ Les anciennes images restent sur Docker Hub (sans tag, mais occupent de l'espace)

---

## ✅ Recommandations pour Votre Projet

### Option A : Garder l'historique (Recommandé pour le développement)

**Avantages** :
- ✅ Peut revenir à n'importe quelle version
- ✅ Traçabilité complète
- ✅ Débogage facilité

**Inconvénients** :
- ⚠️ Accumulation d'images
- ⚠️ Consommation d'espace

**Action** : Ajouter un job de nettoyage qui garde seulement les 10-20 dernières images

### Option B : Nettoyer automatiquement (Recommandé pour la production)

**Avantages** :
- ✅ Économie d'espace
- ✅ Docker Hub plus propre

**Inconvénients** :
- ⚠️ Impossible de revenir aux anciennes versions
- ⚠️ Perte de l'historique

**Action** : Supprimer les tags `main-{sha}` et `dev-{sha}-{timestamp}`, garder seulement `latest` et les versions sémantiques

### Option C : Hybride (Meilleur compromis)

**Stratégie** :
- ✅ Garder `latest` (toujours la dernière version)
- ✅ Garder les versions sémantiques (`v1.0.0`, `v1.1.0`, etc.)
- ✅ Supprimer les tags de développement après 30 jours
- ✅ Supprimer les tags `main-{sha}` après 7 jours

---

## 🔧 Amélioration Proposée

Je peux ajouter au workflow :

1. **Job de nettoyage automatique** qui :
   - Garde les 10 dernières images avec tag `main-{sha}`
   - Supprime les images de développement de plus de 30 jours
   - Garde toutes les versions sémantiques

2. **Optimisation des tags** :
   - Créer moins de tags par défaut
   - Option pour activer/désactiver certains tags

Souhaitez-vous que j'implémente ces améliorations ?

---

## 📚 Ressources

- [Docker Hub Documentation](https://docs.docker.com/docker-hub/)
- [Docker Hub Pricing](https://www.docker.com/pricing)
- [Docker Hub API](https://docs.docker.com/docker-hub/api/latest/)

---

**Dernière mise à jour** : 14 janvier 2026
