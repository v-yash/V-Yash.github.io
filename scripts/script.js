document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize Particles.js (Network connecting nodes aesthetic)
    particlesJS('particles-js', {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: '#64ffda' },
            shape: { type: 'circle' },
            opacity: { value: 0.3, random: false },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#64ffda',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: 'none',
                random: true,
                out_mode: 'out'
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'grab' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 0.8 } }
            }
        },
        retina_detect: true
    });

    // 2. Typewriter Effect for Hero
    const words = ["Software Engineer", "DevOps Engineer", "Cloud Architect", "Automation Expert"];
    let i = 0, j = 0, currentWord = "", isDeleting = false;
    const typeTarget = document.getElementById("typewriter");

    function type() {
        currentWord = words[i];
        if (isDeleting) {
            typeTarget.textContent = currentWord.substring(0, j - 1);
            j--;
            if (j == 0) { isDeleting = false; i++; if (i == words.length) i = 0; }
        } else {
            typeTarget.textContent = currentWord.substring(0, j + 1);
            j++;
            if (j == currentWord.length) { isDeleting = true; setTimeout(type, 2000); return; }
        }
        setTimeout(type, isDeleting ? 50 : 100);
    }
    type();

    // 3. GSAP Scroll Animations
    gsap.registerPlugin(ScrollTrigger);

    // Fade in sections as you scroll down
    gsap.utils.toArray('.gs-reveal').forEach(function(elem) {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: "top 85%", // Trigger when element is 85% down the viewport
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Stagger animation for skill icons
    gsap.from(".gs-skill", {
        scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 80%"
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1, // Delays each icon slightly
        ease: "back.out(1.7)"
    });

    // Stagger animation for project cards
    gsap.from(".gs-project", {
        scrollTrigger: {
            trigger: ".project-grid",
            start: "top 80%"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    });

    // 4. Back to Top Logic
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 5. Form Handling (Kept from your original)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('.submit-btn');
            btn.textContent = 'Processing...';
            
            fetch(this.action, {
                method: 'POST',
                body: new FormData(this),
                headers: { 'Accept': 'application/json' }
            }).then(res => {
                if(res.ok) {
                    btn.textContent = 'Transmission Successful';
                    btn.style.color = '#64ffda';
                    this.reset();
                    setTimeout(() => { btn.textContent = '> Execute_Send'; btn.style.color=''; }, 3000);
                }
            });
        });
    }
});