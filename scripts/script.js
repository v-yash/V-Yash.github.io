document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize 3D Interactive Background (Vanta.js)
    // This creates a premium, dynamic network effect tied to mouse movement
    VANTA.NET({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x3b82f6,      // Matches our accent-blue
        backgroundColor: 0x050810, // Matches our bg-dark
        points: 12.00,
        maxDistance: 22.00,
        spacing: 18.00
    });

    // 2. GSAP Scroll Animations (Fixed Bug)
    gsap.registerPlugin(ScrollTrigger);

    // Using fromTo ensures the elements are forced to an opacity of 1, fixing the disappearing bug
    gsap.utils.toArray('.gs-reveal').forEach(function(elem) {
        gsap.fromTo(elem, 
            { y: 50, opacity: 0 }, 
            {
                scrollTrigger: {
                    trigger: elem,
                    start: "top 85%", // Triggers when element is 85% down the screen
                    toggleActions: "play none none reverse"
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out"
            }
        );
    });

    // Stagger animation for project cards (Fixed Bug)
    gsap.fromTo(".gs-project", 
        { y: 50, opacity: 0 },
        {
            scrollTrigger: {
                trigger: ".project-grid",
                start: "top 80%"
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out"
        }
    );

    // 3. Form Handling
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