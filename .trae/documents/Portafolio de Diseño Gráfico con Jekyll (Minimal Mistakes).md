## Objetivo
- Crear un sitio enfocado en diseño gráfico que muestre tu portafolio de forma profesional, navegable y visual, sobre tu base actual con Jekyll + Minimal Mistakes.

## Estado actual
- Sitio en `docs/` con Jekyll y tema `mmistakes/minimal-mistakes`.
- Portafolio concentrado en `docs/projects.md` como una página única con secciones y enlaces externos.

## Enfoque
- Estructurar el portafolio como una colección Jekyll (`_proyectos`) con una página índice visual y páginas detalle (case studies), manteniendo tu estilo y navegación actuales.

## Cambios clave
1. Colección `proyectos` en `docs/_config.yml` (output y permalink) para generar páginas individuales.
2. Página índice del portafolio (`docs/portafolio/index.md`) con grid de tarjetas, categorías y filtros.
3. Plantilla de proyecto reutilizando `layout: single` + componentes del tema (gallery/feature_row) para imágenes y detalles.
4. Estilos en `docs/assets/css/main.scss` para una estética de diseño gráfico: tipografía marcada, grid responsivo, hover suave.
5. Navegación actualizada en `docs/_data/navigation.yml` para apuntar a la nueva lista del portafolio.

## Estructura de contenido
- Cada proyecto como archivo Markdown en `docs/_proyectos/` con front matter:
  - `title`, `description`, `categories` (p.ej. Logo, Web, Print, Photo, Video), `tags`, `date`
  - `images`: lista de rutas a imágenes optimizadas
  - `external_url` opcional (Canva u otros)
- Recursos en `docs/assets/img/proyectos/<slug>/` con variantes responsive.

## Implementación técnica
- Configurar `collections: { proyectos: { output: true, permalink: /proyectos/:slug/ } }` y `defaults` para el layout.
- Índice del portafolio:
  - Iterar `site.proyectos` para renderizar tarjetas con imagen destacada, categoría y enlace.
  - Filtros por categoría (UI simple por hash/anchors) sin dependencias externas.
- Páginas de proyecto:
  - Usar `layout: single` y el include `gallery` del tema para una galería ligera.
  - Botón CTA a `external_url` cuando exista.
- JS ligero opcional para un lightbox básico; si prefieres sin JS, usar `gallery` del tema.

## Estilo y UX
- Hero en portada con mensaje claro y CTA al portafolio.
- Grid de 2–4 columnas responsive con `aspect-ratio`, `object-fit` y `loading="lazy"`.
- Paleta sobria con acentos en hover y foco; tipografía consistente.

## Accesibilidad y rendimiento
- Texto alternativo en imágenes, contraste adecuado.
- Imágenes optimizadas y `srcset` para tamaños; lazy loading.
- Rutas correctas con `url` y `baseurl` actuales (GitHub Pages).

## SEO y metadatos
- Aprovechar `jekyll-seo-tag` para títulos/descripciones.
- Open Graph social cards por proyecto (imagen destacada).

## Migración de contenido
- Convertir secciones de `projects.md` en archivos de `docs/_proyectos/`.
- Mantener enlaces externos relevantes como `external_url`.

## Entregables
- Colección `docs/_proyectos/` con 3–5 proyectos de ejemplo.
- Nueva página `docs/portafolio/index.md` con grid y filtros.
- Páginas detalle para cada proyecto con galería.
- Ajustes de estilos y navegación.

## Validación
- Probar navegación, responsividad y carga de imágenes.
- Verificar SEO y metadatos en páginas de proyecto.

¿Confirmas este plan para proceder con la implementación? 