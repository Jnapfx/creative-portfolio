---
layout: page
title: Inicio
subtitle: Diseño gráfico y portafolio
permalink: /
---

<section class="hero">
  <h2>Diseño claro, elegante y funcional</h2>
  <p>Portafolio de proyectos seleccionados, con enfoque en identidad, web y contenido visual.</p>
  <p><a class="btn" href="{{ '/proyectos/' | relative_url }}">Ver proyectos</a></p>
</section>

<section>
  <h3>Proyectos destacados</h3>
  <div class="grid">
    {% assign destacados = site.proyectos | slice: 0, 3 %}
    {% for p in destacados %}
    <article class="card">
      <a href="{{ p.url | relative_url }}" data-swup>
        <img src="{{ p.feature_image | default: p.images[0].url }}" alt="{{ p.title }}" loading="lazy">
        <h4>{{ p.title }}</h4>
      </a>
    </article>
    {% endfor %}
  </div>
</section>