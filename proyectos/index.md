---
layout: page
title: Proyectos
permalink: /proyectos/
---

<div class="grid">
  {% for p in site.proyectos %}
  <article class="card">
    <a href="{{ p.url | relative_url }}" data-swup>
      <img src="{{ p.feature_image | default: p.images[0].url }}" alt="{{ p.title }}" loading="lazy">
      <h4>{{ p.title }}</h4>
    </a>
  </article>
  {% endfor %}
</div>