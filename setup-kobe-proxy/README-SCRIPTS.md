# 📜 Scripts Utilitaires - setup-kobe-proxy

## ❓ Ces scripts sont-ils utilisés par le CI/CD ?

### ❌ NON, ces scripts ne sont PAS utilisés par le CI/CD

Le workflow CI/CD **ne copie PAS** ces scripts sur le serveur et **ne les exécute PAS**.

Le workflow CI/CD fait tout **directement en ligne** dans les étapes SSH, sans utiliser ces scripts.

## 🎯 À quoi servent ces scripts alors ?

Ces scripts sont des **utilitaires manuels** pour exécuter les tâches directement sur le serveur VPS, **sans passer par le CI/CD**.

### Cas d'usage

1. **Configuration manuelle** : Si vous voulez configurer blogpress-nginx manuellement
2. **Dépannage** : Si le CI/CD échoue et que vous devez corriger manuellement
3. **Tests locaux** : Pour tester les configurations avant de les déployer
4. **Première configuration** : Pour configurer le serveur la première fois

## 📋 Description des Scripts

### 1. `configure-blogpress-nginx.sh`

**Usage :** Configuration manuelle de blogpress-nginx

**Ce qu'il fait :**

- ✅ Vérifie/ajoute blogpress-nginx au réseau `kobecorp-network`
- ✅ Copie les configurations KOBE dans blogpress-nginx
- ✅ Teste la syntaxe Nginx
- ✅ Recharge Nginx
- ⚠️ Demande interactivement si vous voulez obtenir les certificats SSL

**Quand l'utiliser :**

- Première configuration du serveur
- Dépannage après une erreur CI/CD
- Modification manuelle des configurations

**Exécution :**

```bash
cd ~/kobe-corporation/setup-kobe-proxy
chmod +x configure-blogpress-nginx.sh
./configure-blogpress-nginx.sh
```

### 2. `obtain-ssl-certificates.sh`

**Usage :** Obtention manuelle des certificats SSL

**Ce qu'il fait :**

- ✅ Vérifie que les conteneurs sont en cours d'exécution
- ✅ Vérifie que les configurations Nginx sont présentes
- ✅ Obtient les certificats SSL via certbot
- ⚠️ **NE décommente PAS** les sections HTTPS (c'est manuel)

**Quand l'utiliser :**

- Si le CI/CD n'a pas pu obtenir les certificats
- Pour renouveler manuellement les certificats
- Pour tester l'obtention des certificats

**Exécution :**

```bash
cd ~/kobe-corporation/setup-kobe-proxy
chmod +x obtain-ssl-certificates.sh
./obtain-ssl-certificates.sh
```

### 3. `uncomment-https.sh`

**Usage :** Décommentage manuel des sections HTTPS

**Ce qu'il fait :**

- ✅ Décommente les sections HTTPS dans un fichier de configuration
- ✅ Crée une sauvegarde avant modification
- ✅ Restaure la sauvegarde si le décommentage échoue

**Quand l'utiliser :**

- Si le décommentage automatique du CI/CD a échoué
- Pour activer HTTPS manuellement après obtention des certificats
- Pour tester le décommentage

**Exécution :**

```bash
cd ~/kobe-corporation/setup-kobe-proxy
chmod +x uncomment-https.sh
./uncomment-https.sh conf.d/kobecorporation.com.conf kobecorporation.com
./uncomment-https.sh conf.d/ben-djibril.kobecorporation.com.conf ben-djibril.kobecorporation.com
```

## 🔄 Comparaison : Scripts vs CI/CD

| Tâche                          | Script Manuel                  | CI/CD Automatique                              |
| ------------------------------ | ------------------------------ | ---------------------------------------------- |
| **Configurer blogpress-nginx** | `configure-blogpress-nginx.sh` | ✅ Automatique dans l'étape SSL                |
| **Obtenir certificats SSL**    | `obtain-ssl-certificates.sh`   | ✅ Automatique dans l'étape SSL                |
| **Décommenter HTTPS**          | `uncomment-https.sh`           | ✅ Automatique après obtention des certificats |
| **Copie sur serveur**          | ❌ Non copié                   | ✅ Copié automatiquement (conf.d seulement)    |
| **Exécution**                  | Manuel sur serveur             | Automatique lors du déploiement                |

## 📝 Recommandation

### Pour un usage normal

**Utilisez le CI/CD** - Tout est automatique lors du déploiement :

1. Les configurations sont copiées
2. blogpress-nginx est configuré
3. Les certificats sont obtenus
4. HTTPS est activé automatiquement

### Pour le dépannage

**Utilisez les scripts manuels** si :

- Le CI/CD échoue et vous devez corriger manuellement
- Vous voulez tester une configuration avant de la déployer
- Vous configurez le serveur pour la première fois

## 🚀 Workflow Recommandé

### Première configuration (manuel)

```bash
# 1. Copier les fichiers sur le serveur (via git pull ou rsync)
cd ~/kobe-corporation/setup-kobe-proxy

# 2. Configurer blogpress-nginx
./configure-blogpress-nginx.sh

# 3. Obtenir les certificats SSL
./obtain-ssl-certificates.sh

# 4. Décommenter HTTPS (si le CI/CD ne l'a pas fait)
./uncomment-https.sh conf.d/kobecorporation.com.conf kobecorporation.com
./uncomment-https.sh conf.d/ben-djibril.kobecorporation.com.conf ben-djibril.kobecorporation.com

# 5. Copier les fichiers décommentés dans blogpress-nginx
docker cp conf.d/kobecorporation.com.conf blogpress-nginx:/etc/nginx/conf.d/
docker cp conf.d/ben-djibril.kobecorporation.com.conf blogpress-nginx:/etc/nginx/conf.d/

# 6. Recharger Nginx
docker exec blogpress-nginx nginx -t
docker exec blogpress-nginx nginx -s reload
```

### Déploiements suivants (automatique)

**Rien à faire !** Le CI/CD fait tout automatiquement :

- ✅ Copie les configurations
- ✅ Configure blogpress-nginx
- ✅ Obtient les certificats (si nécessaire)
- ✅ Active HTTPS automatiquement

## ⚠️ Important

Ces scripts **ne sont PAS copiés** sur le serveur par le CI/CD. Si vous voulez les utiliser sur le serveur, vous devez :

1. **Les copier manuellement** via `rsync` ou `scp`
2. **Ou les créer directement** sur le serveur
3. **Ou utiliser git pull** si le dépôt est cloné sur le serveur

## 📚 Documentation Complémentaire

- [Guide Reverse Proxy Multi-Domaines](../../.github/GUIDE-REVERSE-PROXY-MULTI-DOMAINES.md)
- [Guide SSL Automatisation](../../.github/GUIDE-SSL-AUTOMATISATION.md)
- [Réponses SSL](../../.github/REPONSES-SSL.md)
