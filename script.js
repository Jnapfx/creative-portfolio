document.addEventListener('DOMContentLoaded', () => {
    // Portfolio Data
    const portfolioData = {
        web_design: [
            { src: 'assets/portfolio/web_desing/malcan_physicaltherapy_screen.jpg', title: 'Malcan Physicaltherapy Screen', description: 'A modern and responsive website design for Malcan Physical Therapy.' },
            { src: 'assets/portfolio/web_desing/website_malcan_physical_therapy_mac.png', title: 'Website Malcan Physical Therapy Mac', description: 'Desktop view of the Malcan Physical Therapy website.' },
            { src: 'assets/portfolio/web_desing/website_norwalk_business_center_mac.png', title: 'Website Norwalk Business Center Mac', description: 'Business center website interface design.' },
            { src: 'assets/portfolio/web_desing/website_norwalk_business_center_page.png', title: 'Website Norwalk Business Center Page', description: 'Inner page layout for Norwalk Business Center.' }
        ],
        logos: [
            { src: 'assets/portfolio/logos/logo_delila.png', title: 'Logo Delila', description: 'Brand identity design for Delila.' },
            { src: 'assets/portfolio/logos/logo_escuela_de_cine.jpg', title: 'Logo Escuela De Cine', description: 'Logo design for a film school.' },
            { src: 'assets/portfolio/logos/logo_lucho.png', title: 'Logo Lucho', description: 'Personal branding logo design.' },
            { src: 'assets/portfolio/logos/logo_malcan.jpg', title: 'Logo Malcan', description: 'Corporate identity for Malcan.' },
            { src: 'assets/portfolio/logos/logo_pelvic_floor.jpg', title: 'Logo Pelvic Floor', description: 'Medical practice logo design.' },
            { src: 'assets/portfolio/logos/logo_tactical.jpg', title: 'Logo Tactical', description: 'Tactical gear brand logo.' }
        ],
        print: [
            { src: 'assets/portfolio/print/fork%20box.jpg', title: 'Fork Box', description: 'Packaging design for a food product.' },
            { src: 'assets/portfolio/print/la_tortura_espumita_jones.jpg', title: 'La Tortura Espumita Jones', description: 'Creative print advertisement.' },
            { src: 'assets/portfolio/print/prrueba%202.jpg', title: 'Prrueba 2', description: 'Print design concept.' },
            { src: 'assets/portfolio/print/spice_water_mockup.png', title: 'Spice Water Mockup', description: 'Product label and bottle mockup.' }
        ],
        videos: [
            { src: 'assets/portfolio/videos/5de5a4cb94.mp4', title: '5de5a4cb94', description: 'Video project showcase.' },
            { src: 'assets/portfolio/videos/CAPSULA%20CONTRA%20EL%20ESTRES.mp4', title: 'Capsula Contra El Estres', description: 'Stress relief capsule video content.' },
            { src: 'assets/portfolio/videos/ESCUELA%20DE%20CINE%20COLETILLA.mp4', title: 'Escuela De Cine Coletilla', description: 'Film school promo spot.' },
            { src: 'assets/portfolio/videos/PROMO%20HALLOWEEN.mp4', title: 'Promo Halloween', description: 'Halloween promotional video.' },
            { src: 'assets/portfolio/videos/Promo%20Cancer%20de%20mama%20(2).mp4', title: 'Promo Cancer De Mama (2)', description: 'Breast cancer awareness campaign.' },
            { src: 'assets/portfolio/videos/d335aa247f.mp4', title: 'D335aa247f', description: 'Creative video editing work.' },
            { src: 'assets/portfolio/videos/dd535bbbf5.mp4', title: 'Dd535bbbf5', description: 'Video production sample.' },
            { src: 'assets/portfolio/videos/documental_intro.mp4', title: 'Documental Intro', description: 'Documentary introduction sequence.' },
            { src: 'assets/portfolio/videos/mapa%20video.mov', title: 'Mapa Video', description: 'Animated map visualization.' }
        ],
        photography: [
            { src: 'assets/portfolio/photography/IMG_5336.JPG%20copy.jpg', title: 'IMG 5336 Copy', description: 'Artistic photography shot.' },
            { src: 'assets/portfolio/photography/chinito_photo.jpg', title: 'Chinito Photo', description: 'Portrait photography.' },
            { src: 'assets/portfolio/photography/jonathan_photo.jpg', title: 'Jonathan Photo', description: 'Professional headshot.' },
            { src: 'assets/portfolio/photography/justin_photo.png', title: 'Justin Photo', description: 'Creative portrait.' },
            { src: 'assets/portfolio/photography/pau_photo.jpg', title: 'Pau Photo', description: 'Lifestyle photography.' },
            { src: 'assets/portfolio/photography/san_francisco_photo.jpg', title: 'San Francisco Photo', description: 'Cityscape photography of San Francisco.' },
            { src: 'assets/portfolio/photography/sanfran_photo.jpg', title: 'Sanfran Photo', description: 'Urban photography.' }
        ]
    };

    // Modal Elements
    const modal = document.getElementById('project-modal');
    const modalTitle = modal.querySelector('.modal-title');
    const modalCategory = modal.querySelector('.modal-category');
    const modalDescription = modal.querySelector('.modal-description');
    const modalClose = modal.querySelector('.modal-close');
    const modalBackdrop = modal.querySelector('.modal-backdrop');
    const prevBtn = modal.querySelector('.modal-nav-btn.prev');
    const nextBtn = modal.querySelector('.modal-nav-btn.next');
    const modalImageWrapper = modal.querySelector('.modal-image-wrapper');

    // State
    let currentCategory = null;
    let currentIndex = 0;

    // Helper: Create Media Element (Image or Video)
    function createMediaElement(item) {
        const isVideo = item.src.match(/\.(mp4|webm|mov)$/i);
        let element;

        if (isVideo) {
            element = document.createElement('video');
            element.src = item.src;
            element.muted = true; // Start muted
            element.loop = true;
            element.playsInline = true;
            element.controls = true; // Add controls for better UX
            element.className = 'modal-image'; // Reusing class for layout
            // Auto-play when ready
            element.oncanplay = () => {
                 // element.play().catch(e => console.log('Autoplay blocked', e));
            };
        } else {
            element = document.createElement('img');
            element.src = item.src;
            element.alt = item.title;
            element.className = 'modal-image';
        }
        return element;
    }

    // Helper: Update Modal Content
    function updateModalContent() {
        if (!currentCategory || !portfolioData[currentCategory]) return;
        
        const items = portfolioData[currentCategory];
        const item = items[currentIndex];
        
        // Find existing media to fade out
        const existingMedia = modalImageWrapper.querySelectorAll('.modal-image');
        
        // Create and append new element
        const newElement = createMediaElement(item);
        modalImageWrapper.appendChild(newElement);
        
        // Force reflow
        newElement.offsetWidth;
        newElement.classList.add('active'); // Ensure CSS has .modal-image.active { opacity: 1; }
        
        // Handle existing media (Cross-fade)
        existingMedia.forEach(media => {
            media.classList.remove('active');
            setTimeout(() => {
                if (media.parentNode === modalImageWrapper) {
                    modalImageWrapper.removeChild(media);
                }
            }, 500);
        });
        
        // Re-append buttons to ensure they are on top
        if (items.length > 1) {
            modalImageWrapper.appendChild(prevBtn);
            modalImageWrapper.appendChild(nextBtn);
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        } else {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        }

        // Update Text
        modalTitle.textContent = item.title;
        modalCategory.textContent = currentCategory.replace('_', ' ').toUpperCase();
        modalDescription.textContent = item.description || '';
    }

    // Open Modal
    function openCategoryGallery(category) {
        if (!portfolioData[category]) return;
        
        currentCategory = category;
        currentIndex = 0;
        
        // Clear previous content for fresh start
        modalImageWrapper.innerHTML = '';
        
        updateModalContent();
        
        modal.classList.add('is-visible');
        document.body.style.overflow = 'hidden';
    }

    // Close Modal
    function closeModal() {
        modal.classList.remove('is-visible');
        document.body.style.overflow = '';
        
        // Pause any playing videos
        const video = modalImageWrapper.querySelector('video');
        if (video) video.pause();
    }

    // Navigation Logic
    function nextProject() {
        if (!currentCategory) return;
        const items = portfolioData[currentCategory];
        currentIndex = (currentIndex + 1) % items.length;
        updateModalContent();
    }

    function prevProject() {
        if (!currentCategory) return;
        const items = portfolioData[currentCategory];
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateModalContent();
    }

    // Event Listeners
    
    // Category Cards Click
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            openCategoryGallery(category);
        });
    });

    // Modal Controls
    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
    
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        prevProject();
    });
    
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        nextProject();
    });

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('is-visible')) return;

        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight') nextProject();
        if (e.key === 'ArrowLeft') prevProject();
    });

    // Intersection Observer for Fade-in (retained)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });

    // Mobile Menu (retained)
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

    // Smooth Scroll (retained)
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

    const heroVideo = document.querySelector('.hero-video');
    const heroSection = document.querySelector('.hero');

    if (heroVideo && heroSection && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        heroVideo.pause();
        heroVideo.removeAttribute('autoplay');
        heroVideo.removeAttribute('loop');

        let isMetadataReady = false;
        let videoDuration = 0;
        let rafId = null;

        const clamp01 = (value) => Math.max(0, Math.min(1, value));

        const computeProgress = () => {
            const startY = heroSection.offsetTop;
            const endY = startY + heroSection.offsetHeight;
            const range = Math.max(1, endY - startY);
            return clamp01((window.scrollY - startY) / range);
        };

        const update = () => {
            rafId = null;
            if (!isMetadataReady || !Number.isFinite(videoDuration) || videoDuration <= 0) return;
            const progress = computeProgress();
            const maxTime = Math.max(0, videoDuration - 0.05);
            const targetTime = Math.max(0, Math.min(maxTime, progress * videoDuration));
            if (Number.isFinite(targetTime)) heroVideo.currentTime = targetTime;
        };

        const requestUpdate = () => {
            if (rafId !== null) return;
            rafId = window.requestAnimationFrame(update);
        };

        heroVideo.addEventListener('loadedmetadata', () => {
            videoDuration = heroVideo.duration;
            isMetadataReady = Number.isFinite(videoDuration) && videoDuration > 0;
            requestUpdate();
        });

        window.addEventListener('scroll', requestUpdate, { passive: true });
        window.addEventListener('resize', requestUpdate, { passive: true });

        heroVideo.load();
    }

    // Video Playback Enhancement
    const videoItems = document.querySelectorAll('.video-item');
    
    videoItems.forEach(item => {
        const video = item.querySelector('video');
        const playButton = document.createElement('button');
        playButton.className = 'video-play-button';
        playButton.innerHTML = '▶';
        
        item.style.position = 'relative';
        item.appendChild(playButton);
        
        // Show play button on hover
        item.addEventListener('mouseenter', () => {
            playButton.style.opacity = '1';
        });
        
        item.addEventListener('mouseleave', () => {
            playButton.style.opacity = '0';
        });
        
        // Play/pause functionality
        playButton.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playButton.innerHTML = '❚❚';
            } else {
                video.pause();
                playButton.innerHTML = '▶';
            }
        });
        
        // Auto-play when video ends
        video.addEventListener('ended', () => {
            video.currentTime = 0;
            video.play();
        });
        
        // Reset button when video is paused
        video.addEventListener('pause', () => {
            playButton.innerHTML = '▶';
        });
        
        video.addEventListener('play', () => {
            playButton.innerHTML = '❚❚';
        });
    });

    // Interactive Logo Logic
    const interactiveLogos = document.querySelectorAll('.logo-item-interactive');
    interactiveLogos.forEach(logo => {
        logo.addEventListener('click', (e) => {
            e.stopPropagation();
            const wasActive = logo.classList.contains('active');
            
            // Close others
            interactiveLogos.forEach(l => l.classList.remove('active'));
            // Close photos too
            document.querySelectorAll('.photo-interactive').forEach(p => p.classList.remove('active'));
            
            if (!wasActive) {
                logo.classList.add('active');
            }
        });
    });

    // Interactive Photo Logic
    const interactivePhotos = document.querySelectorAll('.photo-interactive');
    interactivePhotos.forEach(photo => {
        photo.addEventListener('click', (e) => {
            e.stopPropagation();
            const wasActive = photo.classList.contains('active');
            
            // Close others
            interactivePhotos.forEach(p => p.classList.remove('active'));
            // Close logos too
            document.querySelectorAll('.logo-item-interactive').forEach(l => l.classList.remove('active'));
            
            if (!wasActive) {
                photo.classList.add('active');
            }
        });
    });

    // Close logo/photo info when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.logo-item-interactive') && !e.target.closest('.photo-interactive')) {
            interactiveLogos.forEach(logo => logo.classList.remove('active'));
            interactivePhotos.forEach(photo => photo.classList.remove('active'));
        }
    });
});
