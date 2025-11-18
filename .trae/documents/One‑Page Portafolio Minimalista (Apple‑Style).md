## Objetivo
Implementar un sitio one‑page minimalista y elegante para portafolio de diseño gráfico, con secciones Inicio, Galería de proyectos, Sobre mí y Contacto, optimizado para rendimiento, accesible y compatible con GitHub Pages.

## Stack Técnico
- HTML5 semántico con estructura modular: `header`, `section`, `footer`
- CSS/SCSS organizado por módulos con metodología BEM
- JavaScript vanilla para interacciones (sin frameworks)
- Compatible con Jekyll para despliegue en GitHub Pages (layout único + assets)

## Arquitectura de Archivos
- `_config.yml` (mínimo para Pages; `title`, `url`, `baseurl`, `permalink`, `jekyll-seo-tag` opcional)
- `_layouts/onepage.html` (layout base de toda la página)
- `index.md` (contenido one‑page usando el layout)
- `assets/css/main.scss` (tokens, utilidades, layout, componentes BEM)
- `assets/js/app.js` (animaciones, filtros, modal, lazy)
- `assets/images/projects/` (WebP + fallback JPEG calidad ~80%)
- `CNAME` opcional si se usa dominio propio

## Contenido y Secciones
- Inicio: presentación breve (≤150 palabras) y CTA claro (“Ver proyectos” / “Contactar”)
- Galería: grid responsive con 6–12 proyectos (imagen, título, categoría)
- Sobre mí: biografía profesional 300–500 palabras, habilidades y formación
- Contacto: formulario funcional con nombre, email, asunto, mensaje

## Diseño y Tipografía
- Paleta: fondo `#FFFFFF`, texto `#000000`, grises `#F5F5F7` y `#86868B`
- Tipografía: stack San Francisco/Inter/Helvetica Neue (`-apple-system`, `BlinkMacSystemFont`, `"Helvetica Neue"`, `Inter`)
- Espaciado: mínimo 60px entre secciones; contenedor con anchura cómoda (máx ~1120px)
- Componentes: botones, tarjetas, navegación simple con estados focus/hover visibles

## Animaciones y Micro‑interacciones
- Fade‑in al cargar secciones (IntersectionObserver)
- Transiciones on‑scroll sutiles: translateY/opacity con `prefers-reduced-motion` respetado
- Hover en tarjetas: opacidad 0.8 + escala 1.02 con easing suave
- Estado activo de filtros con transición de color/opacidad

## Galería y Filtros
- Grid CSS: 3 columnas desktop, 2 tablet, 1 móvil
- Filtros por categorías (Identidad, Packaging, Digital, etc.) implementados con data‑attributes y botones
- Modal de proyecto (vanilla JS): imagen principal alta resolución, descripción 150–300 palabras, características, galería secundaria opcional; incluye focus trap, cierre por `Esc`, overlay click y `aria` roles
- Degradación: si JS no está disponible, se muestran todas las tarjetas sin modal

## Optimización y Performance
- Imágenes: fuente en WebP con fallback JPEG (~80%), dimensiones ajustadas a layout
- Lazy loading (`loading="lazy"`) para imágenes y `IntersectionObserver` para diferir cargas
- CSS crítico inlined mínimo (si aplica) y resto en un único `main.css` minificado
- JS ligero en un único `app.js`, sin dependencias externas pesadas
- Presupuesto: peso total < 2MB; evitar fuentes externas (usar system font)

## Accesibilidad y Estándares
- Contraste suficiente; tamaños de fuente y line‑height legibles
- Semántica: roles y landmarks (`header`, `main`, `footer`); `aria` para modal
- Navegación por teclado completa (filtros y modal); enfoque visible
- Validación W3C sin errores críticos

## Compatibilidad
- Probado en Chrome, Safari, Firefox (últimas 2 versiones)
- Evitar APIs no soportadas ampliamente; incluir polyfill ligero si fuera imprescindible

## GitHub Pages
- Estructura Jekyll mínima en raíz; layout one‑page y assets
- `_config.yml` con `url`/`baseurl` correctos y `jekyll-seo-tag` opcional
- Deployment automático desde `main`; `CNAME` si se usa dominio personalizado

## Validación y Métricas
- Lighthouse: objetivo >90 en performance, accessibility y best practices
- Tiempo de carga <2s en 3G simulado (medición en Lighthouse/DevTools)
- Verificación de lazy loading, pesos, número de requests y caché

## Fases de Implementación
1) Estructura base Jekyll (layout, `_config.yml`, assets) y HTML semántico
2) SCSS BEM: tokens, layout, grid, componentes, responsive 320–1920px
3) JS: fade‑in, on‑scroll, filtros por categoría, modal accesible, lazy
4) Optimización: imágenes WebP/JPEG, minificación, presupuesto <2MB
5) Verificación: Lighthouse, W3C, cross‑browser, ajustes finales
