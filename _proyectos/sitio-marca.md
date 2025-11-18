---
title: "Sitio web de marca: estructura y diseño"
description: "Diseño de una experiencia web clara y enfocada en comunicación y conversión."
date: 2024-09-15
categories: ["Web"]
tags: ["web", "ux", "seo", "landing"]
feature_image: "https://images.unsplash.com/photo-1487014679447-9f8336843c0e?q=80&w=1200&auto=format&fit=crop"
images:
  - url: "https://images.unsplash.com/photo-1487014679447-9f8336843c0e?q=80&w=1200&auto=format&fit=crop"
    alt: "Hero y estructura de la landing"
  - url: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?q=80&w=1200&auto=format&fit=crop"
    alt: "Secciones y componentes UI"
external_url: "https://javiernapoles.my.canva.site/"
layout: single
author_profile: false
toc: false
---

Construí una landing page con una estructura clara, copy enfocado y componentes visuales consistentes. Se aplicaron mejores prácticas de SEO on-page y se definió una jerarquía visual que guía la acción del usuario.

**Rol**: Diseño Web, UX básico, Copy y SEO

**Entregables**: Wireframe, diseño UI, implementación estática, optimización de contenido.

**Proceso**: Investigación de usuario, definición de estructura, diseño de componentes, iteración y validación.

{% if page.images %}
<div class="portfolio-gallery">
  {% for img in page.images %}
  <figure>
    <img src="{{ img.url }}" alt="{{ img.alt }}" loading="lazy" />
    <figcaption>{{ img.alt }}</figcaption>
  </figure>
  {% endfor %}
  </div>
{% endif %}

{% if page.external_url %}
<p><a class="btn btn-primary" href="{{ page.external_url }}" target="_blank" rel="noopener">Ver proyecto externo</a></p>
{% endif %}