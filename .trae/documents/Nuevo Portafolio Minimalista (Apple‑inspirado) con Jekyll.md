## Objetivo
- Reemplazar el repositorio por un sitio nuevo, minimalista y elegante, inspirado en el estilo de Apple, con animaciones sutiles y una estructura clara de portafolio.

## Stack Técnico
- Jekyll (compatible con GitHub Pages) para plantillas, includes y colecciones.
- HTML + SCSS + JS sin dependencias pesadas; opcional Swup (transiciones fluidas entre páginas, progresivo).
- Tipografía: system font stack (`-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Inter`, `sans-serif`).

## Arquitectura de Archivos
- Raíz del repositorio (fuente de GitHub Pages):
  - `_config.yml` (site, plugins, colecciones, SEO)
  - `_layouts/` → `default.html`, `page.html`, `project.html`
  - `_includes/` → `head.html`, `header.html`, `footer.html`, `nav.html`
  - `_proyectos/` → archivos Markdown por proyecto (colección Jekyll)
  - `index.md` (inicio)
  - `proyectos/index.md` (grid de destacados)
  - `about.md` (acerca de mí)
  - `contact.md` (formulario con Formspree)
  - `assets/css/main.scss` (variables, tokens, componentes)
  - `assets/js/app.js` (micro-interacciones, loader, hover; init de Swup opcional)
  - `assets/img/` (imágenes optimizadas)

## Diseño y UX (Apple‑inspirado)
- Espacios en blanco generosos y layout aireado.
- Tipografía limpia y jerarquía clara (tamaños, peso, interlineado cuidados).
- Paleta neutra: grises suaves, blanco, acentos sutiles (azul/gris azulado).
- Iconografía simple (SVG inline) y micro-interacciones discretas.

## Animaciones y Micro‑interacciones
- Transiciones fluidas entre páginas: Swup con fade/slide minimal, fallback sin JS.
- Hover sutil en tarjetas e imágenes (elevación ligera, cambio de color)
- Loader minimal (punto o barra suave) con respeto a `prefers-reduced-motion`.
- Enfoque accesible: estados `focus` visibles, roles ARIA y semántica correcta.

## Contenido
- Inicio: hero breve (nombre, rol, CTA), proyectos destacados.
- Proyectos: index con grid y filtros por categoría; páginas detalle (case study) desde `_proyectos/`.
- Acerca de: bio profesional, experiencia y enfoque.
- Contacto: formulario simple con Formspree.

## Optimización y Rendimiento
- Imágenes en `webp/jpg` con `loading="lazy"` y tamaños responsivos.
- CSS modular con variables; minificación automática de Jekyll.
- JS ligero; sin grandes frameworks.
- SEO básico con `jekyll-seo-tag`, metadatos por página y OpenGraph.

## Proceso de Implementación
1. Limpiar el repositorio (eliminar contenido actual y ramas innecesarias).
2. Crear estructura base y configuración Jekyll mínima.
3. Implementar layout y componentes (header, nav, footer) con diseño.
4. Añadir páginas (inicio, proyectos, about, contacto) y colección `_proyectos`.
5. Integrar animaciones progresivas (Swup opcional) y micro‑interacciones.
6. Optimizar imágenes, accesibilidad y SEO.
7. Validar en local y publicar en GitHub Pages.

## Entregables
- Sitio funcional y responsive con diseño minimalista.
- 3 proyectos de ejemplo en `_proyectos/` y grid de destacados.
- Formulario de contacto funcionando (Formspree).
- Código estructurado y comentado en layouts/SCSS/JS.

## Mantenimiento
- Añadir proyectos creando archivos en `_proyectos/` (front matter consistente).
- Actualizar textos en `index.md`, `about.md`, `contact.md`.

¿Confirmas este plan para proceder con la limpieza del repositorio e implementación del sitio nuevo? 