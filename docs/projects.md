---
title: "Portafolio"
permalink: /portafolio/
layout: single
---

Explora mi trabajo por categoría y entra a cada proyecto para ver el proceso y las imágenes.

### Filtros rápidos

- [Todos](#todos)
- [Logo](#logo)
- [Web](#web)
- [Video](#video)

## Todos
<div class="portfolio-grid">
{% for p in site.proyectos %}
  <article class="portfolio-card">
    <a href="{{ p.url | relative_url }}" aria-label="Ver {{ p.title }}">
      <img src="{{ p.feature_image | default: p.images[0].url }}" alt="{{ p.title }}" loading="lazy" />
    </a>
    <h3><a href="{{ p.url | relative_url }}">{{ p.title }}</a></h3>
    <p class="portfolio-meta">{{ p.categories | join: ", " }}</p>
  </article>
{% endfor %}
</div>

## Logo {#logo}
{% assign logos = site.proyectos | where_exp: "item","item.categories contains 'Logo'" %}
<div class="portfolio-grid">
{% for p in logos %}
  <article class="portfolio-card">
    <a href="{{ p.url | relative_url }}">
      <img src="{{ p.feature_image | default: p.images[0].url }}" alt="{{ p.title }}" loading="lazy" />
    </a>
    <h3><a href="{{ p.url | relative_url }}">{{ p.title }}</a></h3>
    <p class="portfolio-meta">Logo</p>
  </article>
{% endfor %}
</div>

## Web {#web}
{% assign webs = site.proyectos | where_exp: "item","item.categories contains 'Web'" %}
<div class="portfolio-grid">
{% for p in webs %}
  <article class="portfolio-card">
    <a href="{{ p.url | relative_url }}">
      <img src="{{ p.feature_image | default: p.images[0].url }}" alt="{{ p.title }}" loading="lazy" />
    </a>
    <h3><a href="{{ p.url | relative_url }}">{{ p.title }}</a></h3>
    <p class="portfolio-meta">Web</p>
  </article>
{% endfor %}
</div>

## Video {#video}
{% assign videos = site.proyectos | where_exp: "item","item.categories contains 'Video'" %}
<div class="portfolio-grid">
{% for p in videos %}
  <article class="portfolio-card">
    <a href="{{ p.url | relative_url }}">
      <img src="{{ p.feature_image | default: p.images[0].url }}" alt="{{ p.title }}" loading="lazy" />
    </a>
    <h3><a href="{{ p.url | relative_url }}">{{ p.title }}</a></h3>
    <p class="portfolio-meta">Video</p>
  </article>
{% endfor %}
</div>

---

¿Quieres ver más o hablar de un proyecto? [Contáctame](/contacto/) y construyamos algo excelente.