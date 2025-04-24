// enquire-now.js

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    const inquiryForm = document.getElementById('inquiryForm');
    const floatingInquiryBtn = document.getElementById('floatingInquiryBtn');
    const inquiryContainer = document.querySelector('.inquiry-container');
    const closeBtn = document.querySelector('.close-btn');
    
    // Get form elements
    const formGroups = inquiryForm.querySelectorAll('.form-group');
    const successMessage = document.querySelector('.success-message');

    // Validation patterns
    const patterns = {
        name: /^[a-zA-Z\s]{2,}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^[\d\s-+()]{10,}$/,
        message: /^.{10,}$/
    };

    // Show inquiry form when floating button is clicked
    floatingInquiryBtn.addEventListener('click', () => {
        inquiryContainer.style.display = 'block';
        setTimeout(() => {
            inquiryContainer.style.opacity = '1';
            inquiryContainer.style.transform = 'translateY(0)';
        }, 10);
    });

    // Close inquiry form
    closeBtn.addEventListener('click', () => {
        inquiryContainer.style.opacity = '0';
        inquiryContainer.style.transform = 'translateY(20px)';
        setTimeout(() => {
            inquiryContainer.style.display = 'none';
        }, 300);
    });

    // Add input event listeners for real-time validation
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea, select');
        const errorMessage = group.querySelector('.error-message');

        input.addEventListener('input', function() {
            validateField(this, errorMessage);
        });

        input.addEventListener('blur', function() {
            validateField(this, errorMessage);
        });
    });

    // Form submission handler
    inquiryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Validate all fields
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea, select');
            const errorMessage = group.querySelector('.error-message');
            
            if (!validateField(input, errorMessage)) {
                isValid = false;
                group.classList.add('shake');
                setTimeout(() => group.classList.remove('shake'), 500);
            }
        });

        if (isValid) {
            // Show success message with animation
            successMessage.style.display = 'flex';
            successMessage.style.opacity = '1';
            successMessage.style.transform = 'translateY(0)';

            // Reset form
            inquiryForm.reset();
            formGroups.forEach(group => group.classList.remove('error'));

            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.opacity = '0';
                successMessage.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 300);
            }, 5000);

            // Log form data (replace with your actual form submission logic)
            const formData = new FormData(inquiryForm);
            const data = Object.fromEntries(formData.entries());
            console.log('Form submitted:', data);
        }
    });

    // Field validation function
    function validateField(input, errorMessage) {
        const value = input.value.trim();
        const type = input.type;
        let isValid = true;

        // Check if field is empty
        if (!value) {
            showError(input, errorMessage, 'This field is required');
            isValid = false;
        }
        // Validate based on field type
        else if (type === 'email' && !patterns.email.test(value)) {
            showError(input, errorMessage, 'Please enter a valid email address');
            isValid = false;
        }
        else if (type === 'tel' && !patterns.phone.test(value)) {
            showError(input, errorMessage, 'Please enter a valid phone number');
            isValid = false;
        }
        else if (type === 'text' && input.id === 'name' && !patterns.name.test(value)) {
            showError(input, errorMessage, 'Please enter a valid name');
            isValid = false;
        }
        else if (input.id === 'message' && !patterns.message.test(value)) {
            showError(input, errorMessage, 'Message must be at least 10 characters long');
            isValid = false;
        }
        else {
            hideError(input, errorMessage);
        }

        return isValid;
    }

    // Helper functions for showing/hiding errors
    function showError(input, errorMessage, message) {
        input.parentElement.classList.add('error');
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    function hideError(input, errorMessage) {
        input.parentElement.classList.remove('error');
        errorMessage.style.display = 'none';
    }

    // Add floating label effect
    const inputs = inquiryForm.querySelectorAll('input');
    inputs.forEach(input => {
        input.setAttribute('placeholder', ' ');
    });
}); 