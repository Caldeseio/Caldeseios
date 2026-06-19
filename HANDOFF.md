# Caldeseio CV — Handoff

Proyecto: CV personal en React, diseño tipo libro snap-scroll con fondo de constelación Three.js.

## Stack

- **Vite 8** + **React 19** + **Tailwind CSS 4** + **Three.js 0.184**
- Node requerido: ≥ 18

## Cómo correrlo

```bash
cd c:\laragon\www\Caldeseios
npm install          # solo la primera vez
npm run dev          # http://localhost:5173
npm run build        # build de producción a /dist
```

## Arquitectura del libro

El CV tiene 5 páginas-capítulo que hacen snap al scroll (como pasar páginas):

```
App.jsx
├── <canvas>      → posición: fixed, z-index: 0  ← fondo de estrellas Three.js
├── <ChapterNav>  → posición: fixed, derecha      ← puntos de capítulo
├── <NavBar>      → posición: fixed, arriba        ← se muestra después de la portada
└── <div.book>    → scroll-snap-type: y mandatory
    ├── <Cover />     — página 0: portada
    ├── <About />     — página 1: sobre mí
    ├── <Skills />    — página 2: habilidades
    ├── <Projects />  — página 3: proyectos
    └── <Contact />   — página 4: contacto
```

**CSS clave en `src/index.css`:**
```css
body   { overflow: hidden }
.book  { height: 100dvh; overflow-y: scroll; scroll-snap-type: y mandatory }
.page  { height: 100dvh; scroll-snap-align: start; scroll-snap-stop: always }
```

## Estructura de archivos

```
src/
├── App.jsx                       ← orquestador: canvas + refs + IntersectionObserver
├── main.jsx                      ← sin StrictMode (causa crash WebGL si está activo)
├── index.css                     ← tema Tailwind + clases .book/.page
├── context/
│   └── LangContext.jsx           ← bilingüe ES/EN, todas las traducciones aquí
├── hooks/
│   └── useAmbientSeeds.js        ← único renderer Three.js: 325 estrellas (3 capas)
└── components/
    ├── Cover.jsx                 ← portada: tipografía grande + stats strip + ilustración
    ├── ChapterNav.jsx            ← puntos laterales (glow en activo)
    ├── NavBar.jsx                ← nav fija que aparece al pasar de portada
    ├── About.jsx                 ← capítulo 01
    ├── Skills.jsx                ← capítulo 02: barras CSS animadas (.skillbar .in)
    ├── Projects.jsx              ← capítulo 03: grid 3×2
    └── Contact.jsx               ← capítulo 04 + footer
```

## Sistema de partículas (src/hooks/useAmbientSeeds.js)

Constelación estilo cielo nocturno — 325 estrellas en 3 capas:

| Capa | Cantidad | Comportamiento |
|------|----------|---------------|
| Bright | 35 | Titileo individual via vertex colors (frecuencia aleatoria per-star) |
| Mid    | 110 | Deriva muy lenta con dirección aleatoria + titileo suave |
| Dim    | 180 | Estáticas, muy tenues — densidad de fondo |

- Sprite: gradiente radial blanco en canvas 64×64px → `THREE.CanvasTexture`
- Mezcla: `THREE.AdditiveBlending` sobre el fondo verde oscuro
- Mouse: rotación de cámara muy sutil (no repulsión)
- Scroll: `canvas.style.opacity` va de 1.0 (portada) → 0.15 (contacto)

## Animaciones

- `.reveal` → `opacity: 0 → 1` + `translateY: 28px → 0` al entrar al viewport  
  Observado por IntersectionObserver con `root: bookRef` y `threshold: 0.15`
- `.skillbar .in > i` → `scaleX: 0 → var(--lv)` (barras de habilidades)  
  Se activa junto con `.reveal` al snapear a la página Skills
- `.proj:hover` → `translateY(-6px)` + borde verde
- `.magnet` → sigue al cursor con factor 0.18x/0.28y

## Paleta de colores

| Variable | Hex | Uso |
|---------|-----|-----|
| `--color-forest` | `#2C3A2E` | Fondo principal |
| `--color-green` | `#4F9D5B` | Acento, barras, activo |
| `--color-bone` | `#F1EDE3` | Texto principal |
| `--color-green-light` | `#6FB877` | Verde secundario |
| `--color-green-muted` | `#AFC3B2` | Texto secundario / labels |

## Tipografía

- **Bricolage Grotesque** — títulos y headings (Google Fonts, cargada en index.html)
- **JetBrains Mono** — labels, badges, monospace (Google Fonts)

## Traducciones

Todo el texto del CV está en `src/context/LangContext.jsx` bajo dos objetos:
- `translations.es` — español
- `translations.en` — inglés

Para agregar texto nuevo: añadir la misma key en ambos objetos y usar `t('key')` en el componente.

## Pendiente — Ilustración botánica

La portada espera una ilustración en:
```
public/images/botanical.svg
```

Si el archivo no existe, el `<img>` se oculta automáticamente (`onError`). Cuando esté lista:
- Formato: SVG con fondo transparente
- Colores: solo `#2C3A2E`, `#4F9D5B`, `#F1EDE3`, `#AFC3B2`
- Estilo: ilustración botánica delicada — semilla / plántula / rama — trazo fino
- La portada ya la posiciona a la derecha con `clamp(220px, 28vw, 400px)` de ancho

## Notas importantes

1. **Sin StrictMode**: `main.jsx` NO usa `<StrictMode>`. Si lo activas en dev, React double-invoca useEffects y el renderer WebGL crashea (`context loss`). Mantenerlo así.

2. **Single WebGL renderer**: solo existe UN `WebGLRenderer` en toda la app (en `useAmbientSeeds`). Nunca crear otro renderer en otro componente.

3. **Scroll es del .book, no del body**: el body tiene `overflow: hidden`. Todo el scroll ocurre en el div `.book`. Los IntersectionObserver usan `root: bookRef.current`.

4. **Barras de Skills**: el patrón es `<div className="skillbar reveal" style={{'--lv': 0.9}}><i /></div>`. El CSS anima `scaleX` de la `<i>` via `.skillbar.in > i { transform: scaleX(var(--lv)) }`.

## Cosas que quedarían bien en el futuro

- Añadir cursor personalizado (ver referencias de Seeds of Dreams)
- Transición animada entre capítulos (actualmente snap inmediato)
- Versión móvil: los dots de capítulo podrían moverse abajo en móvil
- Proyecto 6 ("3D Web Experience") podría enlazar a este mismo CV
