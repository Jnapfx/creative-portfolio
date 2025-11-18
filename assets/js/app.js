// Inicialización de transiciones y micro-interacciones
document.addEventListener('DOMContentLoaded', function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && window.Swup) {
    try {
      new Swup({ animateHistoryBrowsing: true });
    } catch (e) {}
  }

  // Hover suave en tarjetas (mejora táctil no intrusiva)
  document.querySelectorAll('.card').forEach(function (card) {
    card.addEventListener('mouseenter', function(){ card.classList.add('is-hover'); });
    card.addEventListener('mouseleave', function(){ card.classList.remove('is-hover'); });
  });
});