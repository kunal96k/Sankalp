// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Form validation patterns
const patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[0-9]{10}$/,
    name: /^[a-zA-Z\s]{2,50}$/
};

// Form validation function
function validateField(input, pattern) {
    const value = input.value.trim();
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
    errorElement.className = 'error-message';
    
    if (!value) {
        errorElement.textContent = 'This field is required';
        formGroup.classList.add('error');
    } else if (pattern && !pattern.test(value)) {
        errorElement.textContent = 'Please enter a valid value';
        formGroup.classList.add('error');
    } else {
        formGroup.classList.remove('error');
        if (errorElement.parentNode) {
            errorElement.remove();
        }
        return true;
    }
    
    if (!errorElement.parentNode) {
        formGroup.appendChild(errorElement);
    }
    return false;
}

// Contact form validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Add error message element
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        input.parentNode.appendChild(errorElement);
        
        // Real-time validation
        input.addEventListener('input', () => {
            validateField(input, patterns[input.type] || null);
        });
        
        input.addEventListener('blur', () => {
            validateField(input, patterns[input.type] || null);
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input, patterns[input.type] || null)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>Thank you for your message! We'll get back to you soon.</p>
            `;
            
            contactForm.innerHTML = '';
            contactForm.appendChild(successMessage);
            
            // Reset form after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                contactForm.innerHTML = `
                    <div class="form-group">
                        <input type="text" id="name" name="name" required>
                        <label for="name">Your Name</label>
                    </div>
                    <div class="form-group">
                        <input type="email" id="email" name="email" required>
                        <label for="email">Your Email</label>
                    </div>
                    <div class="form-group">
                        <input type="tel" id="phone" name="phone" required>
                        <label for="phone">Your Phone</label>
                    </div>
                    <div class="form-group">
                        <textarea id="message" name="message" required></textarea>
                        <label for="message">Your Message</label>
                    </div>
                    <button type="submit" class="submit-btn">
                        <span>Send Message</span>
                        <i class="fas fa-paper-plane"></i>
                    </button>
                `;
            }, 3000);
        }
    });
}

// Map initialization
function initMap() {
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        // Add any map customization here
        mapContainer.style.opacity = '1';
    }
}

// Initialize map when the page loads
window.addEventListener('load', initMap);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation to info cards on scroll
const infoCards = document.querySelectorAll('.info-card');
if (infoCards.length) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });
    
    infoCards.forEach(card => observer.observe(card));
}

// Social media links hover effect
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-5px)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0)';
    });
}); 