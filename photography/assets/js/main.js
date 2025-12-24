/**
 * Angelica & Alina Wedding Gallery
 * Main JavaScript - Gallery & Lightbox Controller
 */

(function () {
  'use strict';

  // ==========================================================================
  // DOM Elements
  // ==========================================================================
  const elements = {
    hero: document.getElementById('hero'),
    heroImage: document.getElementById('heroImage'),
    scrollBtn: document.getElementById('scrollToGallery'),
    gallery: document.getElementById('gallery'),
    galleryGrid: document.getElementById('galleryGrid'),
    lightbox: document.getElementById('lightbox'),
    lightboxBackdrop: document.getElementById('lightboxBackdrop'),
    lightboxImage: document.getElementById('lightboxImage'),
    lightboxImageWrapper: document.getElementById('lightboxImageWrapper'),
    lightboxLoader: document.getElementById('lightboxLoader'),
    lightboxCounter: document.getElementById('lightboxCounter'),
    lightboxCaption: document.getElementById('lightboxCaption'),
    lightboxClose: document.getElementById('lightboxClose'),
    lightboxPrev: document.getElementById('lightboxPrev'),
    lightboxNext: document.getElementById('lightboxNext'),
    lightboxDownload: document.getElementById('lightboxDownload'),
    lightboxOpen: document.getElementById('lightboxOpen')
  };

  // ==========================================================================
  // State
  // ==========================================================================
  let state = {
    currentIndex: 0,
    totalPhotos: 0,
    isLightboxOpen: false,
    isAnimating: false,
    touchStartX: 0,
    touchStartY: 0,
    touchCurrentX: 0,
    isSwiping: false,
    focusableElements: [],
    lastFocusedElement: null
  };

  // ==========================================================================
  // Utility Functions
  // ==========================================================================

  /**
   * Format photo number with leading zero
   */
  function formatPhotoNumber(num) {
    return num.toString().padStart(2, '0');
  }

  /**
   * Generate download filename
   */
  function getDownloadFilename(index) {
    return `Angelica-Alina-Wedding-${formatPhotoNumber(index + 1)}.jpg`;
  }

  /**
   * Preload an image
   */
  function preloadImage(src) {
    if (!src) return;
    const img = new Image();
    img.src = src;
  }

  /**
   * Get focusable elements within a container
   */
  function getFocusableElements(container) {
    return Array.from(
      container.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
  }

  // ==========================================================================
  // Hero Section
  // ==========================================================================

  function initHero() {
    // Set hero background from dedicated hero image
    elements.heroImage.style.backgroundImage = `url('./assets/img/full/hero_photo.jpg')`;

    // Smooth scroll to gallery
    elements.scrollBtn.addEventListener('click', () => {
      elements.gallery.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ==========================================================================
  // Gallery
  // ==========================================================================

  function initGallery() {
    if (typeof PHOTOS === 'undefined' || !Array.isArray(PHOTOS)) {
      console.error('PHOTOS array not found');
      return;
    }

    state.totalPhotos = PHOTOS.length;
    renderGallery();
    initLazyLoading();
  }

  function renderGallery() {
    const fragment = document.createDocumentFragment();

    PHOTOS.forEach((photo, index) => {
      const item = document.createElement('div');
      item.className = 'gallery__item';
      item.setAttribute('role', 'listitem');
      item.setAttribute('tabindex', '0');
      item.setAttribute('data-index', index);
      item.setAttribute('aria-label', `View photo ${index + 1} of ${state.totalPhotos}`);

      const img = document.createElement('img');
      img.className = 'gallery__image';
      img.alt = photo.alt || `Wedding photo ${index + 1}`;
      img.dataset.src = photo.thumb;
      img.loading = 'lazy';

      item.appendChild(img);
      fragment.appendChild(item);

      // Click handler
      item.addEventListener('click', () => openLightbox(index));

      // Keyboard handler
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(index);
        }
      });
    });

    elements.galleryGrid.appendChild(fragment);
  }

  function initLazyLoading() {
    const images = elements.galleryGrid.querySelectorAll('.gallery__image');

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.dataset.src;

          if (src) {
            img.src = src;
            img.addEventListener('load', () => {
              // Small delay for staggered effect
              requestAnimationFrame(() => {
                img.classList.add('loaded');
              });
            });
            img.removeAttribute('data-src');
          }

          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '200px',
      threshold: 0.01
    });

    images.forEach(img => imageObserver.observe(img));
  }

  // ==========================================================================
  // Lightbox
  // ==========================================================================

  function initLightbox() {
    // Close button
    elements.lightboxClose.addEventListener('click', closeLightbox);

    // Backdrop click
    elements.lightboxBackdrop.addEventListener('click', closeLightbox);

    // Navigation
    elements.lightboxPrev.addEventListener('click', () => navigatePhoto('prev'));
    elements.lightboxNext.addEventListener('click', () => navigatePhoto('next'));

    // Keyboard navigation
    document.addEventListener('keydown', handleKeydown);

    // Touch/swipe support - improved for iPhone
    elements.lightboxImageWrapper.addEventListener('touchstart', handleTouchStart, { passive: true });
    elements.lightboxImageWrapper.addEventListener('touchmove', handleTouchMove, { passive: false });
    elements.lightboxImageWrapper.addEventListener('touchend', handleTouchEnd);

    // Image load handler
    elements.lightboxImage.addEventListener('load', handleImageLoad);
  }

  function openLightbox(index) {
    state.lastFocusedElement = document.activeElement;
    state.currentIndex = index;
    state.isLightboxOpen = true;

    elements.lightbox.hidden = false;

    // Force reflow before adding active class for animation
    void elements.lightbox.offsetWidth;

    elements.lightbox.classList.add('active');
    document.body.classList.add('lightbox-open');

    updateLightboxContent();

    // Focus trap
    state.focusableElements = getFocusableElements(elements.lightbox);
    elements.lightboxClose.focus();
  }

  function closeLightbox() {
    state.isLightboxOpen = false;

    elements.lightbox.classList.remove('active');
    document.body.classList.remove('lightbox-open');

    // Wait for transition before hiding
    setTimeout(() => {
      elements.lightbox.hidden = true;
      elements.lightboxImage.src = '';
      elements.lightboxImage.classList.remove('loaded');
      elements.lightboxImage.style.transform = '';
    }, 400);

    // Return focus
    if (state.lastFocusedElement) {
      state.lastFocusedElement.focus();
    }
  }

  function updateLightboxContent(direction = null) {
    const photo = PHOTOS[state.currentIndex];

    if (!photo) return;

    // Show loader and prepare for transition
    elements.lightboxLoader.classList.remove('hidden');

    // Apply slide animation class based on direction
    if (direction) {
      elements.lightboxImage.classList.remove('loaded');
      elements.lightboxImage.classList.add(direction === 'next' ? 'slide-left' : 'slide-right');
    } else {
      elements.lightboxImage.classList.remove('loaded', 'slide-left', 'slide-right');
    }

    // Update image
    elements.lightboxImage.src = photo.full;
    elements.lightboxImage.alt = photo.alt || `Wedding photo ${state.currentIndex + 1}`;

    // Update counter
    elements.lightboxCounter.textContent = `${state.currentIndex + 1} / ${state.totalPhotos}`;

    // Update caption
    elements.lightboxCaption.textContent = photo.caption || '';

    // Update download link
    elements.lightboxDownload.href = photo.full;
    elements.lightboxDownload.download = getDownloadFilename(state.currentIndex);

    // Update open link
    elements.lightboxOpen.href = photo.full;

    // Preload adjacent images
    preloadAdjacentImages();
  }

  function handleImageLoad() {
    // Remove any slide classes and add loaded
    requestAnimationFrame(() => {
      elements.lightboxImage.classList.remove('slide-left', 'slide-right');
      elements.lightboxImage.classList.add('loaded');
      elements.lightboxLoader.classList.add('hidden');
      state.isAnimating = false;
    });
  }

  function preloadAdjacentImages() {
    const prevIndex = (state.currentIndex - 1 + state.totalPhotos) % state.totalPhotos;
    const nextIndex = (state.currentIndex + 1) % state.totalPhotos;

    if (PHOTOS[prevIndex]) preloadImage(PHOTOS[prevIndex].full);
    if (PHOTOS[nextIndex]) preloadImage(PHOTOS[nextIndex].full);
  }

  function navigatePhoto(direction) {
    if (state.isAnimating) return;
    state.isAnimating = true;

    if (direction === 'prev') {
      state.currentIndex = (state.currentIndex - 1 + state.totalPhotos) % state.totalPhotos;
    } else {
      state.currentIndex = (state.currentIndex + 1) % state.totalPhotos;
    }

    updateLightboxContent(direction);
  }

  function handleKeydown(e) {
    if (!state.isLightboxOpen) return;

    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        navigatePhoto('prev');
        break;
      case 'ArrowRight':
        e.preventDefault();
        navigatePhoto('next');
        break;
      case 'Tab':
        handleTabKey(e);
        break;
    }
  }

  function handleTabKey(e) {
    const focusable = state.focusableElements;
    if (focusable.length === 0) return;

    const firstElement = focusable[0];
    const lastElement = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }

  // ==========================================================================
  // Touch/Swipe handling - Enhanced for iPhone
  // ==========================================================================

  function handleTouchStart(e) {
    if (state.isAnimating) return;

    state.touchStartX = e.touches[0].clientX;
    state.touchStartY = e.touches[0].clientY;
    state.touchCurrentX = state.touchStartX;
    state.isSwiping = false;

    // Reset any inline transform
    elements.lightboxImage.style.transition = 'none';
  }

  function handleTouchMove(e) {
    if (state.isAnimating) return;

    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    const diffX = touchX - state.touchStartX;
    const diffY = touchY - state.touchStartY;

    // Determine if horizontal swipe (prevent vertical scroll interference)
    if (!state.isSwiping && Math.abs(diffX) > 10) {
      if (Math.abs(diffX) > Math.abs(diffY)) {
        state.isSwiping = true;
      }
    }

    if (state.isSwiping) {
      e.preventDefault();
      state.touchCurrentX = touchX;

      // Apply transform for drag feedback (with resistance at edges)
      const resistance = 0.4;
      const translateX = diffX * resistance;
      elements.lightboxImage.style.transform = `translateX(${translateX}px)`;
    }
  }

  function handleTouchEnd(e) {
    if (!state.isSwiping || state.isAnimating) {
      elements.lightboxImage.style.transition = '';
      elements.lightboxImage.style.transform = '';
      return;
    }

    const diffX = state.touchCurrentX - state.touchStartX;
    const swipeThreshold = 40;

    // Restore transition
    elements.lightboxImage.style.transition = '';
    elements.lightboxImage.style.transform = '';

    if (Math.abs(diffX) > swipeThreshold) {
      if (diffX < 0) {
        // Swipe left - next
        navigatePhoto('next');
      } else {
        // Swipe right - prev
        navigatePhoto('prev');
      }
    }

    state.isSwiping = false;
  }

  // ==========================================================================
  // Initialize
  // ==========================================================================

  function init() {
    initHero();
    initGallery();
    initLightbox();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
