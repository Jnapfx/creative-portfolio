document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            nav.classList.toggle('nav-open');
            const icon = mobileBtn.querySelector('i');
            if (nav.classList.contains('nav-open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-open')) {
                nav.classList.remove('nav-open');
                const icon = mobileBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 60;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Modal Logic
    const modal = document.getElementById('project-modal');
    const modalTitle = modal.querySelector('.modal-title');
    const modalCategory = modal.querySelector('.modal-category');
    const modalDescription = modal.querySelector('.modal-description');
    const modalClose = modal.querySelector('.modal-close');
    const modalBackdrop = modal.querySelector('.modal-backdrop');
    const projectCards = document.querySelectorAll('.project-card');
    const prevBtn = modal.querySelector('.modal-nav-btn.prev');
    const nextBtn = modal.querySelector('.modal-nav-btn.next');
    const modalImageWrapper = modal.querySelector('.modal-image-wrapper');

    // We need to query the image dynamically or keep a reference to the current one
    // Since we are swapping elements, let's just use the wrapper to find the current image

    let currentProjectImages = [];
    let currentImageIndex = 0;
    let isAnimating = false;

    // Touch variables
    let touchStartX = 0;
    let currentTranslate = 0;
    let isDragging = false;
    let animationID;

    function createImageElement(src) {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'modal-image';
        img.alt = modalTitle.textContent;
        return img;
    }

    function updateMainImage(direction = 'next') {
        if (isAnimating) return;
        isAnimating = true;

        const currentImg = modalImageWrapper.querySelector('.modal-image');
        const nextIndex = currentImageIndex; // Already updated before calling this
        const nextSrc = currentProjectImages[nextIndex];
        const nextImg = createImageElement(nextSrc);

        // Position next image based on direction
        if (direction === 'next') {
            nextImg.style.transform = 'translateX(100%)';
        } else {
            nextImg.style.transform = 'translateX(-100%)';
        }

        modalImageWrapper.appendChild(nextImg);

        // Force reflow
        nextImg.offsetWidth;

        // Animate
        requestAnimationFrame(() => {
            currentImg.style.transform = direction === 'next' ? 'translateX(-100%)' : 'translateX(100%)';
            nextImg.style.transform = 'translateX(0)';
        });

        // Cleanup after animation
        setTimeout(() => {
            if (currentImg && currentImg.parentNode === modalImageWrapper) {
                modalImageWrapper.removeChild(currentImg);
            }
            isAnimating = false;
        }, 400); // Match CSS transition duration
    }

    function openModal(card) {
        const img = card.querySelector('.project-image').src;
        const title = card.querySelector('.project-title').textContent;
        const category = card.querySelector('.project-category').textContent;
        const description = card.getAttribute('data-description');
        const galleryImages = card.getAttribute('data-gallery') ? card.getAttribute('data-gallery').split(',') : [];

        // Initialize gallery state
        currentProjectImages = [img, ...galleryImages];
        currentImageIndex = 0;

        // Reset wrapper content
        modalImageWrapper.innerHTML = '';
        const initialImg = createImageElement(img);
        modalImageWrapper.appendChild(initialImg);

        // Re-append buttons (they were cleared by innerHTML = '')
        modalImageWrapper.appendChild(prevBtn);
        modalImageWrapper.appendChild(nextBtn);

        modalTitle.textContent = title;
        modalCategory.textContent = category;
        modalDescription.textContent = description;

        // Show/Hide buttons based on image count
        if (currentProjectImages.length > 1) {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        } else {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        }

        modal.classList.add('is-visible');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeModal() {
        modal.classList.remove('is-visible');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Navigation Event Listeners
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isAnimating) return;
        currentImageIndex = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
        updateMainImage('prev');
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isAnimating) return;
        currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
        updateMainImage('next');
    });

    // Swipe / Drag Gestures
    modalImageWrapper.addEventListener('touchstart', touchStart);
    modalImageWrapper.addEventListener('touchmove', touchMove);
    modalImageWrapper.addEventListener('touchend', touchEnd);

    function touchStart(index) {
        return function (event) {
            if (currentProjectImages.length <= 1 || isAnimating) return;
            isDragging = true;
            touchStartX = event.touches[0].clientX;

            // Disable transition for drag
            const currentImg = modalImageWrapper.querySelector('.modal-image');
            if (currentImg) currentImg.style.transition = 'none';

            animationID = requestAnimationFrame(animation);
        }
    }

    function touchMove(event) {
        if (isDragging) {
            const currentX = event.touches[0].clientX;
            currentTranslate = currentX - touchStartX;
        }
    }

    function touchEnd() {
        isDragging = false;
        cancelAnimationFrame(animationID);

        const currentImg = modalImageWrapper.querySelector('.modal-image');
        if (!currentImg) return;

        const movedBy = currentTranslate;
        const threshold = 100; // px to trigger slide

        // Re-enable transition
        currentImg.style.transition = 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)';

        if (movedBy < -threshold) {
            // Swipe Left -> Next
            currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
            // We need to manually handle the "finish" of the drag into a slide
            // But since updateMainImage creates a NEW image, we can just call it
            // However, for a true 1:1 feel, we should have created the next image already.
            // For simplicity in this iteration, let's just trigger the slide animation
            // but we need to reset the current image transform first or let updateMainImage handle it.

            // Let's reset transform to 0 then call updateMainImage to animate properly
            // Or better: just call updateMainImage and let it take over. 
            // But updateMainImage expects to start from 0. 

            // To make it smooth, we should probably just animate the current one out and new one in manually here
            // OR, just let it snap back and then slide. 
            // Let's try calling updateMainImage('next') but it might jump.

            // Refined approach:
            currentImg.style.transform = 'translateX(0)'; // Reset first to avoid jump
            setTimeout(() => {
                updateMainImage('next');
            }, 10);

        } else if (movedBy > threshold) {
            // Swipe Right -> Prev
            currentImageIndex = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
            currentImg.style.transform = 'translateX(0)';
            setTimeout(() => {
                updateMainImage('prev');
            }, 10);
        } else {
            // Snap back
            currentImg.style.transform = 'translateX(0)';
        }

        currentTranslate = 0;
    }

    function animation() {
        if (isDragging) {
            const currentImg = modalImageWrapper.querySelector('.modal-image');
            if (currentImg) currentImg.style.transform = `translateX(${currentTranslate}px)`;
            requestAnimationFrame(animation);
        }
    }

    // Fix for the touchStart function wrapper above
    modalImageWrapper.removeEventListener('touchstart', touchStart);
    modalImageWrapper.removeEventListener('touchmove', touchMove);
    modalImageWrapper.removeEventListener('touchend', touchEnd);

    // Re-bind properly
    modalImageWrapper.addEventListener('touchstart', (e) => touchStart()(e), { passive: true });
    modalImageWrapper.addEventListener('touchmove', touchMove, { passive: true });
    modalImageWrapper.addEventListener('touchend', touchEnd);

    projectCards.forEach(card => {
        card.addEventListener('click', () => openModal(card));
    });

    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);

    // Keyboard Navigation (Escape + Arrows)
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('is-visible')) return;

        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            if (isAnimating) return;
            currentImageIndex = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
            updateMainImage('prev');
        } else if (e.key === 'ArrowRight') {
            if (isAnimating) return;
            currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
            updateMainImage('next');
        }
    });
});
