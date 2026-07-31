# Reglas de este repo

## Aquí hay varias sesiones trabajando a la vez

En este árbol suele haber más de una sesión de Claude abierta (además de los
worktrees en `.claude/worktrees/`). El índice de git es **compartido**: lo que
una sesión deja a medias, otra se lo puede llevar en su commit.

**PROHIBIDO `git add -A`, `git add .`, `git commit -a` y `git stash` sin ruta.**
Siempre con rutas explícitas, sólo los archivos que TÚ tocaste:

```bash
git add src/pages/OrderConfirmation.js src/components/RastreoEnvio.js
git commit -m "…"
```

Antes de commitear, `git status` y compara con tu propia lista de ediciones. Si
aparece un archivo que no reconoces, no es tuyo: déjalo fuera.

**Qué pasó el 2026-07-31.** Una sesión hizo `git commit -a` y se llevó las
ediciones en curso de otra (`OrderConfirmation.js` y los tres `i18n/*.js`
acabaron dentro del commit c691ae3), pero el archivo nuevo que esas ediciones
importaban —`src/components/RastreoEnvio.js`— se quedó sin versionar. Durante
varios minutos `main` tuvo un import apuntando a un archivo inexistente:
cualquier `npm run build` o despliegue en esa ventana habría tronado.

## El candado de imports

`.githooks/pre-commit` corre `scripts/verificar-imports.js` antes de cada commit:
por cada `@/…`, `./…` y `../…` de los archivos que van en el commit, comprueba
que el destino esté en el índice de git. Existir en el disco no basta — eso es
justo lo que falló. Tarda ~0.3 s.

Si aborta un commit, léelo: casi siempre te falta un `git add`.
Para saltarlo (con motivo): `git commit --no-verify`.
A mano, sobre todo el repo: `npm run verificar:imports`.

Tras un clon nuevo hay que activarlo una vez (`core.hooksPath` no se versiona):

```bash
git config core.hooksPath .githooks
```

## Publicar

Sólo con `./desplegar.sh`. Nunca `wrangler pages deploy` a mano: el script
verifica que el build traiga horneada la URL del backend y confirma en vivo el
hash del bundle.
