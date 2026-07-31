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

### ⛔ NO SE DESPLIEGA SIN AVISARLE A CHRISTIÁN

Regla del 2026-07-31, después de un día en que el sitio se cayó varias veces
por nuestros propios despliegues (diez en tres horas, desde varias sesiones a
la vez). El compromiso que pidió Christián es **99.99 % en pie**: eso son 4
minutos y medio de caída AL MES. Un despliegue de más, hecho sin avisar, se
come el presupuesto del mes entero.

1. **Avísale antes.** Se despliega cuando él lo sabe, no cuando tú acabas.
2. **Los cambios se acumulan y salen JUNTOS.** No un despliegue por arreglo.
3. **Uno a la vez.** Si otra sesión está publicando, espera. El árbol es
   compartido y el sitio es uno solo.
4. **Verificado antes y después.** Si algo falla, marcha atrás inmediata.

### Cómo

Sólo con `./desplegar.sh`. Nunca `wrangler pages deploy` a mano. El script:

- exige `.env.local` con la URL del backend (sin eso el build sale con
  `undefined` y tumba login y checkout);
- **construye desde una copia limpia de git**, no desde tu directorio — en
  este árbol hay varias sesiones y lo que otra dejó a medias no sale a
  producción;
- corre el candado de imports sobre todo el árbol;
- confirma el hash del bundle en vivo;
- **abre la portada, el catálogo y una ficha en un navegador de verdad**
  (`scripts/verificar-en-vivo.js`) y comprueba que PINTAN y que sus botones se
  pueden picar, en escritorio y en teléfono chico. Un 200 no prueba nada:
  Cloudflare devuelve el mismo `index.html` aunque el bundle esté roto;
- y si el sitio quedó roto, **vuelve solo** al despliegue anterior de
  Cloudflare Pages y lo revalida.

Necesita `playwright` con Chromium instalado (`npx playwright install chromium`).
Si falta, el script sale con código 2 y avisa: no publica un "no sé" como un
"sí". A mano: `./desplegar.sh --lista` y `./desplegar.sh --marcha-atras <id>`.

### Vigilancia

En el EC2 corre `vigilante.py` (del repo del backend) por cron cada 3 minutos:
revisa la API, el catálogo y la portada, apunta todo en una bitácora y le manda
correo a Christián cuando algo se cae y cuando vuelve.

```bash
sudo python3 /opt/exygen/vigilante/vigilante.py --resumen 7   # % real medido
```
