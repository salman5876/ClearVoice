// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Enhanced navbar interaction
    const navbar = document.querySelector('.navbar');
    
    // Handle navbar transparency and stickiness
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });

    // Initialize smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });

    // Enhanced scroll to top button functionality
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    const toggleScrollButton = () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
            setTimeout(() => scrollToTopBtn.style.opacity = '1', 50);
        } else {
            scrollToTopBtn.style.opacity = '0';
            setTimeout(() => scrollToTopBtn.classList.remove('show'), 300);
        }
    };

    window.addEventListener('scroll', toggleScrollButton);

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Enhanced form validation with floating labels
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('input, textarea');
        
        // Add floating label effect
        formInputs.forEach(input => {
            const formGroup = input.parentElement;
            
            // Add focused class on input focus
            input.addEventListener('focus', () => {
                formGroup.classList.add('focused');
            });

            // Remove focused class if input is empty
            input.addEventListener('blur', () => {
                if (!input.value) {
                    formGroup.classList.remove('focused');
                }
            });

            // Initialize if field has value
            if (input.value) {
                formGroup.classList.add('focused');
            }

            // Add input animation on type
            input.addEventListener('input', () => {
                if (!formGroup.classList.contains('typing')) {
                    formGroup.classList.add('typing');
                    setTimeout(() => formGroup.classList.remove('typing'), 300);
                }
            });
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            let isValid = true;
            
            // Enhanced validation with shake animation
            if (name.value.trim() === '') {
                showError(name, 'Full name is required');
                shakeElement(name.parentElement);
                isValid = false;
            } else {
                removeError(name);
            }
            
            if (email.value.trim() === '') {
                showError(email, 'Email address is required');
                shakeElement(email.parentElement);
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                shakeElement(email.parentElement);
                isValid = false;
            } else {
                removeError(email);
            }
            
            if (message.value.trim() === '') {
                showError(message, 'Message is required');
                shakeElement(message.parentElement);
                isValid = false;
            } else {
                removeError(message);
            }
            
            if (isValid) {
                // Show success message with animation
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-3 fade-in';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle me-2"></i>
                    Thank you for your message! We will get back to you soon.
                `;
                contactForm.appendChild(successMessage);
                
                // Reset form with delay
                setTimeout(() => {
                    contactForm.reset();
                    formInputs.forEach(input => {
                        input.parentElement.classList.remove('focused');
                    });
                    successMessage.classList.add('fade-out');
                    setTimeout(() => successMessage.remove(), 300);
                }, 3000);
            }
        });
    }

    // Helper functions
    function showError(input, message) {
        const formGroup = input.parentElement;
        const error = formGroup.querySelector('.error-message') || document.createElement('div');
        error.className = 'error-message text-danger mt-1 fade-in';
        error.innerHTML = `<i class="fas fa-exclamation-circle me-1"></i>${message}`;
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(error);
        }
        input.classList.add('is-invalid');
    }

    function removeError(input) {
        const formGroup = input.parentElement;
        const error = formGroup.querySelector('.error-message');
        if (error) {
            error.classList.add('fade-out');
            setTimeout(() => error.remove(), 300);
        }
        input.classList.remove('is-invalid');
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function shakeElement(element) {
        element.classList.add('shake');
        setTimeout(() => {
            element.classList.remove('shake');
        }, 500);
    }
}); 