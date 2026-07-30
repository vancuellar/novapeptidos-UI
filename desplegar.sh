#!/bin/bash
# Despliegue del frontend a Cloudflare Pages — ÚNICA forma sancionada de publicar.
# Candados que hoy (2026-07-30) ya costaron un sitio roto:
#   1. El build DEBE traer horneada la URL del backend (un build desde una copia
#      limpia sin .env.local sale con "undefined" y rompe login y checkout).
#   2. 404.html no viaja (rompe /admin en Cloudflare), pero public/404.html no se toca.
#   3. El hash del bundle se verifica EN VIVO al final.
set -e
cd "$(dirname "$0")"

if ! grep -q "REACT_APP_BACKEND_URL=https://api.exygenlabs.com" .env.local 2>/dev/null; then
  echo "⛔ Falta .env.local con REACT_APP_BACKEND_URL — este build saldría roto. NO se publica."
  exit 1
fi

git pull --rebase --autostash
npm run build

BUNDLE=$(ls build/static/js/main.*.js)
if ! grep -q "api.exygenlabs.com" "$BUNDLE"; then
  echo "⛔ El bundle NO trae la URL del backend (saldría con 'undefined'). NO se publica."
  exit 1
fi

rm -f build/404.html
set -a; . ~/.config/exygen/cloudflare.env; set +a
npx wrangler pages deploy build --project-name exygenlabs --branch main --commit-dirty=true

HASH=$(basename "$BUNDLE")
echo "Esperando propagación de $HASH…"
for i in $(seq 1 36); do
  if curl -s "https://exygenlabs.com/?v=$RANDOM" --max-time 15 | grep -q "$HASH"; then
    echo "✅ EN VIVO y verificado: $HASH"
    exit 0
  fi
  sleep 5
done
echo "⚠️ Desplegado pero el hash aún no se ve en vivo — revisa a mano."
exit 1
