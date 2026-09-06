document.addEventListener('DOMContentLoaded', () => {
    // Scroll reveal animation
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

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
});
