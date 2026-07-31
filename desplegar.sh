#!/bin/bash
# ============================================================================
#  DESPLIEGUE DEL FRONTEND A CLOUDFLARE PAGES — única forma sancionada.
# ============================================================================
#
#  POR QUE ESTE ARCHIVO ES ASI DE PARANOICO
#  ----------------------------------------
#  El 2026-07-30 un build hecho sin `.env.local` salió con la URL del backend en
#  "undefined" y tumbó login y checkout. El 2026-07-31 un `git commit -a` dejó
#  `main` con un import a un archivo sin subir: cualquier build de esa ventana
#  habría tronado. Las dos veces el sitio "respondía 200".
#
#  Un 200 no es un sitio vivo. Por eso el orden aquí es:
#
#      candados del build  ->  guardar a dónde volver  ->  publicar
#          ->  COMPROBAR QUE SE VE  ->  si no se ve, MARCHA ATRÁS SOLA
#
#  Los candados, en orden:
#    1. El build DEBE traer horneada la URL del backend.
#    2. Se construye desde una COPIA LIMPIA de git, no desde tu directorio: en
#       este árbol trabajan varias sesiones y lo que otro dejó a medias no sale
#       a producción. Y los imports deben apuntar a archivos que existan en git.
#    3. 404.html no viaja (rompe /admin en Cloudflare); public/404.html no se toca.
#    4. El hash del bundle se confirma EN VIVO.
#    5. La portada, el catálogo y una ficha se abren en un navegador de verdad y
#       se comprueba que PINTAN y que sus botones se pueden picar
#       (scripts/verificar-en-vivo.js).
#    6. Si (5) dice que está roto, se vuelve solo al despliegue anterior de
#       Cloudflare y se vuelve a comprobar. La tienda nunca se queda rota
#       esperando a que un humano se entere.
#
#  REGLA OPERATIVA: no se despliega sin avisarle a Christián. Los cambios se
#  acumulan y salen juntos, en un despliegue a la vez.
#
#  Marcha atrás a mano, si hiciera falta:
#      ./desplegar.sh --marcha-atras <id-de-despliegue>
#      ./desplegar.sh --lista           # ver los últimos despliegues
# ============================================================================
set -e
cd "$(dirname "$0")"

CF_ENV=~/.config/exygen/cloudflare.env
PROYECTO=exygenlabs
SITIO=https://exygenlabs.com

cf_api() { curl -s --max-time 30 -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" "$@"; }

# El despliegue de producción que está sirviendo AHORA.
ultimo_bueno() {
  cf_api "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/pages/projects/$PROYECTO/deployments?per_page=10" \
  | python3 -c "
import sys, json
try: d = json.load(sys.stdin)
except Exception: sys.exit(0)
if not d.get('success'): sys.exit(0)
for r in d.get('result') or []:
    e = r.get('latest_stage') or {}
    if r.get('environment') == 'production' and e.get('name') == 'deploy' and e.get('status') == 'success':
        print(r['id']); break
" 2>/dev/null || true
}

# ----------------------------------------------------- modos de sólo lectura
if [ "$1" = "--lista" ]; then
  set -a; . "$CF_ENV"; set +a
  cf_api "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/pages/projects/$PROYECTO/deployments?per_page=10" \
  | python3 -c "
import sys, json
for r in json.load(sys.stdin).get('result') or []:
    e = r.get('latest_stage') or {}
    print(r['id'], r['created_on'][:19], r.get('environment'), e.get('status'))
"
  exit 0
fi

if [ "$1" = "--marcha-atras" ]; then
  [ -n "$2" ] || { echo "⛔ Falta el id. Míralos con: ./desplegar.sh --lista"; exit 1; }
  set -a; . "$CF_ENV"; set +a
  RESP=$(cf_api -X POST "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/pages/projects/$PROYECTO/deployments/$2/rollback")
  echo "$RESP" | grep -q '"success": *true' || { echo "⛔ Falló: $RESP"; exit 1; }
  echo "🔙 Vuelto a $2. Esperando propagación…"; sleep 20
  node scripts/verificar-en-vivo.js
  exit $?
fi

# ---------------------------------------------------------------- candado 1
if ! grep -q "REACT_APP_BACKEND_URL=https://api.exygenlabs.com" .env.local 2>/dev/null; then
  echo "⛔ Falta .env.local con REACT_APP_BACKEND_URL — este build saldría roto. NO se publica."
  exit 1
fi

git pull --rebase --autostash

# ------------------------------------------------- candado 2: copia limpia
# EN ESTE ÁRBOL TRABAJAN VARIAS SESIONES A LA VEZ. Construir desde el
# directorio de trabajo publica lo que OTRO dejó a medias en su archivo, sin
# que nadie lo note. Así que no se construye aquí: se saca una copia limpia de
# git (worktree desechable en el último commit) y se construye ALLÁ.
#
# Lo que sale a producción es, por definición, lo que está commiteado.
if [ -n "$(git status --porcelain --untracked-files=no)" ]; then
  echo "ℹ️  Hay cambios sin commitear en este árbol (tuyos o de otra sesión)."
  echo "    NO van a salir: se publica el último commit, $(git rev-parse --short HEAD)."
fi
if ! git merge-base --is-ancestor HEAD origin/main 2>/dev/null; then
  echo "⚠️  Tu último commit NO está en origin/main todavía. Se va a publicar igual,"
  echo "    pero súbelo (git push) o nadie más podrá reproducir lo que hay en vivo."
fi

LIMPIO=$(mktemp -d "${TMPDIR:-/tmp}/exygen-build-XXXXXX")
limpiar() { git worktree remove --force "$LIMPIO" >/dev/null 2>&1 || rm -rf "$LIMPIO"; }
trap limpiar EXIT
git worktree add --detach "$LIMPIO" HEAD >/dev/null
cp .env.local "$LIMPIO/.env.local"
ln -s "$PWD/node_modules" "$LIMPIO/node_modules"

# El mismo candado del pre-commit, pero sobre TODO el árbol y sobre la copia
# limpia: si alguien commiteó un import a un archivo que no subió, se para aquí
# y no en la cara del cliente.
if ! (cd "$LIMPIO" && npm run --silent verificar:imports); then
  echo "⛔ Hay imports que apuntan a archivos que no existen en git. NO se publica."
  exit 1
fi

(cd "$LIMPIO" && npm run build)

BUNDLE=$(ls "$LIMPIO"/build/static/js/main.*.js)
if ! grep -q "api.exygenlabs.com" "$BUNDLE"; then
  echo "⛔ El bundle NO trae la URL del backend (saldría con 'undefined'). NO se publica."
  exit 1
fi
HASH=$(basename "$BUNDLE")

# ---------------------------------------------------------------- candado 3
rm -f "$LIMPIO/build/404.html"

set -a; . "$CF_ENV"; set +a

# --------------------------------------------------- a dónde volver si truena
# Cloudflare Pages guarda todos los despliegues. Antes de tocar nada apuntamos
# el que está sirviendo AHORA: es el único al que tiene sentido volver.
ANTERIOR=$(ultimo_bueno)
if [ -z "$ANTERIOR" ]; then
  echo "⚠️  No pude leer el despliegue anterior de Cloudflare: si esto sale mal NO habrá"
  echo "    marcha atrás automática. (Revisa el token en $CF_ENV.) Sigo, pero atento."
else
  echo "🔙 Marcha atrás preparada hacia el despliegue $ANTERIOR"
fi

# ------------------------------------------------------------------ publicar
npx wrangler pages deploy "$LIMPIO/build" --project-name "$PROYECTO" --branch main --commit-dirty=true

# ---------------------------------------------------------------- candado 4
echo "Esperando propagación de $HASH…"
VISTO=no
for i in $(seq 1 36); do
  if curl -s "$SITIO/?v=$RANDOM" --max-time 15 | grep -q "$HASH"; then VISTO=si; break; fi
  sleep 5
done
if [ "$VISTO" = no ]; then
  echo "⛔ Desplegado, pero el hash $HASH NO se ve en vivo después de 3 minutos."
  echo "   No sé qué se está sirviendo, así que NO toco nada. Revisa el panel de Cloudflare."
  exit 1
fi
echo "✅ El bundle $HASH ya se sirve. Ahora la prueba de verdad: ¿se VE?"

# ---------------------------------------------------------------- candado 5
set +e
node scripts/verificar-en-vivo.js --hash="$HASH"
VEREDICTO=$?
set -e

if [ "$VEREDICTO" -eq 0 ]; then
  echo ""
  echo "✅ EN VIVO Y VERIFICADO: $HASH — portada, catálogo y ficha pintan y se pueden usar."
  exit 0
fi

if [ "$VEREDICTO" -eq 2 ]; then
  echo ""
  echo "⚠️  NO SE PUDO COMPROBAR el pintado (falta el navegador, o se cayó la red)."
  echo "    El despliegue $HASH está EN VIVO SIN VERIFICAR. Ábrelo tú: $SITIO"
  echo "    Para volver atrás:  ./desplegar.sh --marcha-atras $ANTERIOR"
  exit 2
fi

# ---------------------------------------------------------------- candado 6
echo ""
echo "⛔⛔ EL SITIO QUEDÓ ROTO. MARCHA ATRÁS AUTOMÁTICA. ⛔⛔"
if [ -z "$ANTERIOR" ]; then
  echo "⛔ …y no tengo a dónde volver (no leí el despliegue anterior). ARREGLA A MANO YA."
  exit 1
fi

RESP=$(cf_api -X POST "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/pages/projects/$PROYECTO/deployments/$ANTERIOR/rollback")
if ! echo "$RESP" | grep -q '"success": *true'; then
  echo "⛔ La marcha atrás FALLÓ: $RESP"
  echo "   ARREGLA A MANO YA — el sitio está roto."
  exit 1
fi
echo "🔙 Vuelto al despliegue $ANTERIOR. Esperando propagación…"
sleep 20

set +e
node scripts/verificar-en-vivo.js
TRAS=$?
set -e
if [ "$TRAS" -eq 0 ]; then
  echo ""
  echo "✅ El sitio volvió a estar bien con la versión anterior."
  echo "⛔ TU CAMBIO NO ESTÁ PUBLICADO: rompía el sitio. Arréglalo y vuelve a intentar."
  exit 1
fi
echo ""
echo "⛔ NI SIQUIERA LA VERSIÓN ANTERIOR PASA LA PRUEBA. Esto no lo arregla un script."
echo "   Avísale a Christián AHORA y revisa a mano: $SITIO"
exit 1
