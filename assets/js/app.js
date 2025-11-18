document.addEventListener('DOMContentLoaded', function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var animateEls = document.querySelectorAll('[data-animate]');
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    animateEls.forEach(function (el) { io.observe(el); });
  } else { animateEls.forEach(function (el) { el.classList.add('is-visible'); }); }

  var filterBtns = document.querySelectorAll('.filter__btn');
  var cards = document.querySelectorAll('.card');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('is-active'); btn.setAttribute('aria-selected', 'true');
      var cat = btn.getAttribute('data-filter');
      cards.forEach(function (card) {
        var c = card.getAttribute('data-category');
        var show = cat === 'all' || c === cat;
        card.classList.toggle('is-hidden', !show);
      });
    });
  });

  var modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = '' +
    '<div class="modal__overlay" data-close></div>' +
    '<div class="modal__dialog" role="dialog" aria-modal="true" aria-labelledby="modal-title">' +
    '  <header class="modal__header">' +
    '    <h3 class="modal__title" id="modal-title"></h3>' +
    '    <button class="modal__close" type="button" data-close aria-label="Close">Close</button>' +
    '  </header>' +
    '  <div class="modal__body">' +
    '    <img class="modal__image" alt="">' +
    '    <p class="modal__desc"></p>' +
    '  </div>' +
    '</div>';
  document.body.appendChild(modal);

  var lastFocus = null;
  function openModal(title, desc, imgAlt, imgSrc) {
    lastFocus = document.activeElement;
    modal.querySelector('.modal__title').textContent = title || '';
    modal.querySelector('.modal__desc').textContent = desc || '';
    var img = modal.querySelector('.modal__image');
    img.alt = imgAlt || title || '';
    img.src = imgSrc || 'data:image/svg+xml,%3Csvg xmlns%3D%27http%3A//www.w3.org/2000/svg%27 width%3D%27960%27 height%3D%27540%27%3E%3Crect width%3D%27100%25%27 height%3D%27100%25%27 fill%3D%27%23F5F5F7%27/%3E%3Ctext x%3D%2750%25%27 y%3D%2750%25%27 dominant-baseline%3D%27middle%27 text-anchor%3D%27middle%27 fill%3D%27%2386868B%27 font-size%3D%2724%27%3EImagen%3C/text%3E%3C/svg%3E';
    modal.classList.add('is-open');
    modal.querySelector('[data-close]').focus();
  }
  function closeModal() {
    modal.classList.remove('is-open');
    if (lastFocus && typeof lastFocus.focus === 'function') { lastFocus.focus(); }
  }
  modal.addEventListener('click', function (e) { if (e.target.hasAttribute('data-close')) { closeModal(); } });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeModal(); } });

  document.querySelectorAll('[data-open-modal]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var card = link.closest('.card');
      var title = card.getAttribute('data-title');
      var desc = card.getAttribute('data-description');
      var img = card.querySelector('.card__image');
      openModal(title, desc, img.alt, img.currentSrc || img.src);
    });
  });
});