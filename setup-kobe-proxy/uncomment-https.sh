#!/bin/bash
# Script pour décommenter automatiquement les sections HTTPS dans les fichiers de configuration Nginx

set -e

FILE=$1
DOMAIN=$2

if [ -z "$FILE" ] || [ ! -f "$FILE" ]; then
  echo "❌ Usage: $0 <fichier.conf> <domaine>"
  exit 1
fi

echo "🔓 Décommentage des sections HTTPS pour $DOMAIN dans $FILE..."

# Créer une copie de sauvegarde
cp "$FILE" "$FILE.backup"

# Utiliser Python pour décommenter (plus fiable que sed/awk pour ce cas)
python3 << PYTHON_SCRIPT
import re

with open("$FILE", 'r') as f:
    content = f.read()

# Trouver la section HTTPS commentée
# Pattern: de "# Configuration HTTPS" jusqu'à la fin du fichier ou "# }"
pattern = r'(# ==========================================\n# Configuration HTTPS.*?\n# ==========================================\n# \n# # Redirection.*?\n)(.*?)(# })'

def uncomment_section(match):
    header = match.group(1)
    commented_section = match.group(2)
    footer = match.group(3)
    
    # Décommenter toutes les lignes dans la section
    uncommented = re.sub(r'^# ([^#].*)$', r'\1', commented_section, flags=re.MULTILINE)
    uncommented = re.sub(r'^#$', '', uncommented, flags=re.MULTILINE)
    
    return header + uncommented + footer

# Remplacer la section commentée par la version décommentée
new_content = re.sub(pattern, uncomment_section, content, flags=re.DOTALL)

with open("$FILE", 'w') as f:
    f.write(new_content)

PYTHON_SCRIPT

# Vérifier que le décommentage a fonctionné
if grep -q "^[[:space:]]*listen 443 ssl" "$FILE"; then
  echo "✅ Sections HTTPS décommentées avec succès"
  rm -f "$FILE.backup"
  exit 0
else
  echo "⚠️  Le décommentage a échoué, restauration de la sauvegarde"
  mv "$FILE.backup" "$FILE"
  exit 1
fi
