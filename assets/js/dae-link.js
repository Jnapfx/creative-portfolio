document.addEventListener('DOMContentLoaded', function () {
  var logo = document.querySelector('.masthead .site-logo, .site-header .site-logo, .masthead a.site-title, .site-header a.site-title');
  if (logo) {
    logo.setAttribute('href', 'https://www.mydae.org/');
    logo.setAttribute('target', '_blank');
    logo.setAttribute('rel', 'noopener');
  }
});