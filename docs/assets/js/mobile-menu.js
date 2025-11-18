/* Mobile menu enhancer for Minimal Mistakes (works across all pages) */
(function () {
  function ready(fn){ if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function(){
    var nav = document.querySelector('.site-header .greedy-nav, .masthead .greedy-nav');
    if (!nav) return;

    // Ensure toggle button exists
    var btn = nav.querySelector('.greedy-nav__toggle');
    if (!btn) {
      btn = document.createElement('button');
      btn.className = 'greedy-nav__toggle';
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Toggle menu');
      btn.innerHTML = '<span class="visually-hidden">Toggle menu</span><span aria-hidden="true">&#9776;</span>';
      nav.insertBefore(btn, nav.firstChild);
    }
    btn.classList.remove('hidden');
    btn.setAttribute('aria-expanded', 'false');

    var visible = nav.querySelector('.visible-links');
    var hidden = nav.querySelector('.hidden-links');
    function openMenu() {
      nav.classList.add('is-open');
      document.documentElement.classList.add('nav-open');
      btn.setAttribute('aria-expanded', 'true');
    }
    function closeMenu() {
      nav.classList.remove('is-open');
      document.documentElement.classList.remove('nav-open');
      btn.setAttribute('aria-expanded', 'false');
    }
    function toggleMenu() {
      if (nav.classList.contains('is-open')) closeMenu(); else openMenu();
    }

    btn.addEventListener('click', function(e){ e.stopPropagation(); toggleMenu(); });

    // Close when clicking a link
    (visible ? visible.querySelectorAll('a') : []).forEach(function(a){
      a.addEventListener('click', closeMenu);
    });
    (hidden ? hidden.querySelectorAll('a') : []).forEach(function(a){
      a.addEventListener('click', closeMenu);
    });

    // Close when clicking outside
    document.addEventListener('click', function(e){
      if (!nav.contains(e.target)) closeMenu();
    });

    // Close on Escape
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape') closeMenu();
    });

    // Close if we resize to desktop
    var mq = window.matchMedia('(min-width: 901px)');
    function onChange(){ if (mq.matches) closeMenu(); }
    mq.addEventListener ? mq.addEventListener('change', onChange) : mq.addListener(onChange);
  });
})();
