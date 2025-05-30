document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded successfully');

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Simple animation for project cards
    const projectCards = document.querySelectorAll('.project-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    projectCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });

    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) { // Safety check
        window.onscroll = function() {
            const show = document.body.scrollTop > 300 || 
                        document.documentElement.scrollTop > 300;
            backToTopBtn.style.display = show ? "block" : "none";
        };
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    } else {
        console.warn('Back to Top button not found');
    }

    // Contact Form Submission - MOVED INSIDE DOMContentLoaded
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            
            // Show loading state
            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            fetch(this.action, {
                method: 'POST',
                body: formData,
                mode: 'no-cors'
            })
            .then(() => {
                formMessage.textContent = 'Message sent successfully!';
                formMessage.className = 'success';
                contactForm.reset();
            })
            .catch(error => {
                formMessage.textContent = 'Error sending message. Please try again.';
                formMessage.className = 'error';
                console.error('Form submission error:', error);
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                
                // Auto-hide message after 5 seconds
                setTimeout(() => {
                    formMessage.textContent = '';
                    formMessage.className = '';
                }, 5000);
            });
        });
    } else {
        console.warn('Contact form not found');
    }
});