/**
 * Photo Gallery - Main JavaScript
 * Handles gallery rendering, lightbox functionality, and accessibility
 */

(function () {
    'use strict';

    // DOM Elements
    const gallery = document.getElementById('gallery');
    const lightbox = document.getElementById('lightbox');
    const lightboxOverlay = document.getElementById('lightbox-overlay');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxDownload = document.getElementById('lightbox-download');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const lightboxLoading = document.getElementById('lightbox-loading');
    const btnClose = document.getElementById('lightbox-close');
    const btnPrev = document.getElementById('lightbox-prev');
    const btnNext = document.getElementById('lightbox-next');

    // State
    let currentIndex = 0;
    let focusedElementBeforeOpen = null;
    let focusableElements = [];

    // =============================================
    // Gallery Rendering
    // =============================================

    function renderGallery() {
        if (!gallery || typeof PHOTOS === 'undefined') return;

        const fragment = document.createDocumentFragment();

        PHOTOS.forEach((photo, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.setAttribute('role', 'listitem');
            item.setAttribute('tabindex', '0');
            item.setAttribute('data-index', index);

            const img = document.createElement('img');
            img.className = 'gallery-image loading';
            img.src = photo.thumb;
            img.alt = photo.alt || `Photo ${index + 1}`;
            img.loading = 'lazy';
            img.decoding = 'async';

            // Remove loading class when image loads
            img.onload = () => img.classList.remove('loading');
            img.onerror = () => {
                img.classList.remove('loading');
                img.alt = 'Image failed to load';
            };

            item.appendChild(img);
            fragment.appendChild(item);
        });

        gallery.appendChild(fragment);

        // Add click handlers
        gallery.addEventListener('click', handleGalleryClick);
        gallery.addEventListener('keydown', handleGalleryKeydown);
    }

    function handleGalleryClick(e) {
        const item = e.target.closest('.gallery-item');
        if (item) {
            const index = parseInt(item.dataset.index, 10);
            openLightbox(index);
        }
    }

    function handleGalleryKeydown(e) {
        const item = e.target.closest('.gallery-item');
        if (item && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            const index = parseInt(item.dataset.index, 10);
            openLightbox(index);
        }
    }

    // =============================================
    // Lightbox Core Functions
    // =============================================

    function openLightbox(index) {
        currentIndex = index;
        focusedElementBeforeOpen = document.activeElement;

        // Show lightbox
        lightbox.removeAttribute('hidden');
        document.body.classList.add('lightbox-open');

        // Force reflow for CSS transition
        lightbox.offsetHeight;
        lightbox.classList.add('active');

        // Load image
        loadImage(currentIndex);
        updateCounter();

        // Preload adjacent images
        preloadAdjacentImages();

        // Set up focus trap
        setupFocusTrap();

        // Focus close button
        setTimeout(() => btnClose.focus(), 100);
    }

    function closeLightbox() {
        lightbox.classList.remove('active');

        setTimeout(() => {
            lightbox.setAttribute('hidden', '');
            document.body.classList.remove('lightbox-open');

            // Return focus to previously focused element
            if (focusedElementBeforeOpen) {
                focusedElementBeforeOpen.focus();
            }
        }, 300);
    }

    function loadImage(index) {
        const photo = PHOTOS[index];
        if (!photo) return;

        // Show loading
        lightboxLoading.classList.remove('hidden');
        lightboxImage.classList.remove('loaded');

        // Create new image to preload
        const img = new Image();

        img.onload = () => {
            lightboxImage.src = photo.full;
            lightboxImage.alt = photo.alt || `Photo ${index + 1}`;
            lightboxImage.classList.add('loaded');
            lightboxLoading.classList.add('hidden');
        };

        img.onerror = () => {
            lightboxImage.alt = 'Failed to load image';
            lightboxLoading.classList.add('hidden');
        };

        img.src = photo.full;

        // Update caption
        if (photo.caption) {
            lightboxCaption.textContent = photo.caption;
            lightboxCaption.style.display = 'block';
        } else {
            lightboxCaption.style.display = 'none';
        }

        // Update download link
        lightboxDownload.href = photo.full;
        lightboxDownload.setAttribute('download', `photo-${String(index + 1).padStart(2, '0')}.jpg`);
    }

    function updateCounter() {
        lightboxCounter.textContent = `${currentIndex + 1} / ${PHOTOS.length}`;
    }

    function preloadAdjacentImages() {
        // Preload next image
        const nextIndex = (currentIndex + 1) % PHOTOS.length;
        if (PHOTOS[nextIndex]) {
            const nextImg = new Image();
            nextImg.src = PHOTOS[nextIndex].full;
        }

        // Preload previous image
        const prevIndex = (currentIndex - 1 + PHOTOS.length) % PHOTOS.length;
        if (PHOTOS[prevIndex]) {
            const prevImg = new Image();
            prevImg.src = PHOTOS[prevIndex].full;
        }
    }

    function navigateNext() {
        currentIndex = (currentIndex + 1) % PHOTOS.length;
        loadImage(currentIndex);
        updateCounter();
        preloadAdjacentImages();
    }

    function navigatePrev() {
        currentIndex = (currentIndex - 1 + PHOTOS.length) % PHOTOS.length;
        loadImage(currentIndex);
        updateCounter();
        preloadAdjacentImages();
    }

    // =============================================
    // Accessibility - Focus Trap
    // =============================================

    function setupFocusTrap() {
        focusableElements = lightbox.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
    }

    function handleFocusTrap(e) {
        if (!lightbox.classList.contains('active') || focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }

    // =============================================
    // Event Listeners
    // =============================================

    function handleKeydown(e) {
        if (!lightbox.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                navigatePrev();
                break;
            case 'ArrowRight':
                e.preventDefault();
                navigateNext();
                break;
            case 'Tab':
                handleFocusTrap(e);
                break;
        }
    }

    function initEventListeners() {
        // Lightbox controls
        btnClose.addEventListener('click', closeLightbox);
        btnPrev.addEventListener('click', navigatePrev);
        btnNext.addEventListener('click', navigateNext);
        lightboxOverlay.addEventListener('click', closeLightbox);

        // Keyboard navigation
        document.addEventListener('keydown', handleKeydown);

        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        lightbox.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    navigateNext();
                } else {
                    navigatePrev();
                }
            }
        }
    }

    // =============================================
    // Initialize
    // =============================================

    function init() {
        renderGallery();
        initEventListeners();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
