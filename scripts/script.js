document.addEventListener('DOMContentLoaded', () => {
    
    // GSAP Scroll Animations
    gsap.registerPlugin(ScrollTrigger);

    // Fade in sections as you scroll down
    gsap.utils.toArray('.gs-reveal').forEach(function(elem) {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    });

    // Stagger animation for project cards
    gsap.from(".gs-project", {
        scrollTrigger: {
            trigger: ".project-grid",
            start: "top 80%"
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
    });

    // Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('.submit-btn');
            const originalText = btn.textContent;
            btn.textContent = 'Deploying request...';
            
            fetch(this.action, {
                method: 'POST',
                body: new FormData(this),
                headers: { 'Accept': 'application/json' }
            }).then(res => {
                if(res.ok) {
                    btn.textContent = 'Deployment Successful';
                    btn.style.background = '#10b981'; // Green success color
                    this.reset();
                    setTimeout(() => { 
                        btn.textContent = originalText; 
                        btn.style.background = ''; 
                    }, 3000);
                }
            });
        });
    }
});