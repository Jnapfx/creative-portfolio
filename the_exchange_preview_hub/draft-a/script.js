const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

if (menuButton && nav) {
  const closeMenu = () => {
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      menuButton.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target) && !menuButton.contains(event.target)) {
      closeMenu();
    }
  });
}

const processGrid = document.querySelector(".process-grid");

if (processGrid) {
  const alignProcessSpine = () => {
    const items = processGrid.querySelectorAll("li");
    if (!items.length) return;

    const gridRect = processGrid.getBoundingClientRect();
    const firstRect = items[0].getBoundingClientRect();
    const lastRect = items[items.length - 1].getBoundingClientRect();

    const top = firstRect.top - gridRect.top + firstRect.height / 2;
    const bottom = lastRect.top - gridRect.top + lastRect.height / 2;

    processGrid.style.setProperty("--spine-top", `${top}px`);
    processGrid.style.setProperty("--spine-height", `${Math.max(bottom - top, 0)}px`);
  };

  alignProcessSpine();
  window.addEventListener("load", alignProcessSpine);
  window.addEventListener("resize", alignProcessSpine);
  processGrid.addEventListener("animationend", alignProcessSpine);
  // Fallback in case animationend doesn't fire (e.g. tab backgrounded on load)
  window.setTimeout(alignProcessSpine, 900);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(alignProcessSpine);
  }
}
