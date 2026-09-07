document.addEventListener('DOMContentLoaded', () => {
    // --- Cinematic Scroll Reveal System ---
    const revealItems = document.querySelectorAll('.reveal-item');
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        let delay = 0;
        let lastIntersectTime = 0;
        
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            const now = Date.now();
            // Reset delay if items enter the viewport at different times
            if (now - lastIntersectTime > 150) {
                delay = 0;
            }
            
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!entry.target.classList.contains('active')) {
                        // Stagger delay for grouped items appearing simultaneously
                        entry.target.style.transitionDelay = `${delay}ms`;
                        entry.target.classList.add('active');
                        delay += 100; // 100ms stagger between elements
                        lastIntersectTime = now;
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, observerOptions);

        revealItems.forEach(item => observer.observe(item));
    } else {
        // If reduced motion is enabled, make all visible immediately
        revealItems.forEach(item => item.classList.add('active', 'no-transition'));
    }

    // --- Scrollspy Navigation ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a:not(.btn-premium)');

    const scrollSpy = () => {
        let current = '';
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (current && link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', scrollSpy);
    scrollSpy(); // Trigger once on load

    // --- Inline Bio Expansion Logic ---
    const readMoreBtn = document.getElementById('readMoreBtn');
    const expandedBio = document.getElementById('expandedBio');

    if (readMoreBtn && expandedBio) {
        readMoreBtn.addEventListener('click', () => {
            expandedBio.classList.toggle('expanded');
            
            if (expandedBio.classList.contains('expanded')) {
                readMoreBtn.innerHTML = 'SHOW LESS <span>&uarr;</span>';
            } else {
                readMoreBtn.innerHTML = 'READ MORE <span>&rarr;</span>';
            }
        });
    }

    // Initialize Particles
    if (typeof tsParticles !== 'undefined') {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        tsParticles.load("particles-js", {
            fpsLimit: 60,
            particles: {
                number: {
                    value: prefersReducedMotion ? 20 : 60,
                    density: { enable: true, value_area: 800 }
                },
                color: {
                    value: ["#9062ff", "#b89cff", "#4d2899", "#2962ff"]
                },
                shape: { type: "circle" },
                opacity: {
                    value: 0.25,
                    random: true,
                    anim: { enable: true, speed: 0.3, opacity_min: 0.1, sync: false }
                },
                size: {
                    value: 2,
                    random: true,
                    anim: { enable: false }
                },
                links: {
                    enable: true,
                    distance: 150,
                    color: "#9062ff",
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: !prefersReducedMotion,
                    speed: 0.3,
                    direction: "none",
                    random: true,
                    straight: false,
                    outModes: { default: "out" },
                    attract: { enable: false }
                }
            },
            interactivity: {
                detectsOn: "canvas",
                events: {
                    onHover: { enable: false },
                    onClick: { enable: false },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mobileMenu.classList.toggle('active');
            
            // Prevent body scrolling when menu is open
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
});
