# Guide de déploiement complet - KOBE Corporation

Ce guide explique comment déployer l'application KOBE Corporation en production avec Docker et nginx reverse proxy.

## Architecture

```
Internet → Reverse Proxy (nginx) → Application Web (React)
           Port 80/443              Port 80 (interne)
           kobecorporation.com
```

## Structure des dossiers

```
kobecorporation/
├── setup-front/          # Configuration Docker pour l'application React
│   ├── Dockerfile        # Build multi-stage (Node.js + nginx)
│   ├── nginx.conf        # Configuration nginx pour l'application
│   ├── compose.yaml      # Docker Compose pour l'application seule
│   ├── .env.example      # Exemple de variables d'environnement
│   └── ENV.md            # Documentation des variables d'environnement
│
└── setup-kobe-proxy/     # Configuration du reverse proxy
    ├── Dockerfile        # Image nginx pour reverse proxy
    ├── nginx.conf        # Configuration reverse proxy avec SSL
    ├── compose.yaml      # Docker Compose complet (proxy + web)
    ├── ssl/              # Dossier pour les certificats SSL
    └── README.md         # Documentation du reverse proxy
```

## Prérequis

1. **Serveur** avec Docker et Docker Compose installés
2. **Domaine** : kobecorporation.com pointant vers l'IP du serveur
3. **Certificats SSL** : Pour HTTPS (Let's Encrypt recommandé)

## Déploiement étape par étape

### Étape 1 : Préparer les certificats SSL

#### Option A : Let's Encrypt (Recommandé)

```bash
# Installer certbot
sudo apt-get update
sudo apt-get install certbot

# Obtenir les certificats
sudo certbot certonly --standalone -d kobecorporation.com -d www.kobecorporation.com

# Les certificats seront dans /etc/letsencrypt/live/kobecorporation.com/
```

#### Option B : Certificats existants

Placez vos certificats dans `setup-kobe-proxy/ssl/` :
- `kobecorporation.com.crt`
- `kobecorporation.com.key`

### Étape 2 : Configurer les variables d'environnement

```bash
cd setup-front
cp .env.example .env
# Éditez .env avec vos valeurs
```

### Étape 3 : Configurer le reverse proxy

Si vous utilisez Let's Encrypt, modifiez `setup-kobe-proxy/compose.yaml` :

```yaml
volumes:
  - /etc/letsencrypt:/etc/letsencrypt:ro
```

Et `setup-kobe-proxy/nginx.conf` :

```nginx
ssl_certificate /etc/letsencrypt/live/kobecorporation.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/kobecorporation.com/privkey.pem;
```

### Étape 4 : Déployer l'application

```bash
cd setup-kobe-proxy
docker compose up -d --build
```

### Étape 5 : Vérifier le déploiement

```bash
# Vérifier les conteneurs
docker compose ps

# Vérifier les logs
docker compose logs -f

# Tester l'application
curl -I https://kobecorporation.com
```

## Scénarios de déploiement

### Déploiement avec reverse proxy (Production)

Utilisez `setup-kobe-proxy/compose.yaml` qui inclut :
- Reverse proxy nginx avec SSL
- Application web React
- Réseau Docker isolé

```bash
cd setup-kobe-proxy
docker compose up -d --build
```

### Déploiement sans reverse proxy (Développement/Test)

Utilisez `setup-front/compose.yaml` pour tester l'application seule :

```bash
cd setup-front
docker compose up -d --build
```

L'application sera accessible sur http://localhost:80

## Maintenance

### Mettre à jour l'application

```bash
cd setup-kobe-proxy
docker compose pull
docker compose up -d --build
```

### Renouveler les certificats Let's Encrypt

```bash
# Renouveler
sudo certbot renew

# Redémarrer le proxy
cd setup-kobe-proxy
docker compose restart proxy
```

### Automatiser le renouvellement

Ajoutez une tâche cron :

```bash
sudo crontab -e

# Ajouter cette ligne
0 3 * * * certbot renew --quiet && docker compose -f /chemin/vers/setup-kobe-proxy/compose.yaml restart proxy
```

### Voir les logs

```bash
# Tous les services
docker compose logs -f

# Un service spécifique
docker compose logs -f proxy
docker compose logs -f web
```

### Redémarrer les services

```bash
# Tout redémarrer
docker compose restart

# Un service spécifique
docker compose restart proxy
docker compose restart web
```

## Dépannage

### L'application ne démarre pas

1. Vérifiez les logs : `docker compose logs web`
2. Vérifiez que le build s'est bien passé : `docker compose build --no-cache`
3. Vérifiez les variables d'environnement dans `.env`

### Erreur SSL

1. Vérifiez que les certificats existent
2. Vérifiez les permissions : `ls -la setup-kobe-proxy/ssl/`
3. Vérifiez la configuration nginx : `docker compose exec proxy nginx -t`

### Le reverse proxy ne redirige pas correctement

1. Vérifiez que les deux services sont sur le même réseau
2. Vérifiez les logs du proxy : `docker compose logs proxy`
3. Testez la connexion interne : `docker compose exec proxy wget -O- http://web:80`

### Problèmes de DNS

1. Vérifiez que le domaine pointe vers l'IP du serveur : `dig kobecorporation.com`
2. Vérifiez que les ports 80 et 443 sont ouverts : `sudo ufw status`

## Sécurité

### Checklist de sécurité

- ✅ HTTPS activé avec redirection HTTP → HTTPS
- ✅ Headers de sécurité configurés (HSTS, X-Frame-Options, etc.)
- ✅ Certificats SSL valides et à jour
- ✅ Firewall configuré (ports 80, 443 uniquement)
- ✅ Services Docker sur réseau privé
- ✅ Pas de ports exposés directement (sauf via proxy)
- ✅ Variables d'environnement sécurisées

### Recommandations supplémentaires

1. **Mettre à jour régulièrement** : `docker compose pull && docker compose up -d`
2. **Surveiller les logs** : Configurer un système de monitoring
3. **Sauvegardes** : Sauvegarder les certificats et la configuration
4. **Rate limiting** : Ajouter rate limiting dans nginx si nécessaire

## Support

Pour toute question ou problème :
- Consultez les README.md dans chaque dossier
- Vérifiez les logs Docker
- Contactez l'équipe de développement
