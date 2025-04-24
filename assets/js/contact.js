document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('inquiryForm');
    const formGroups = form.querySelectorAll('.form-group');
    
    // Add input event listeners for real-time validation
    formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        const errorMessage = group.querySelector('.error-message');
        
        if (input && errorMessage) {
            input.addEventListener('input', () => {
                validateField(input, errorMessage);
            });
            
            input.addEventListener('blur', () => {
                validateField(input, errorMessage);
            });
        }
    });
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate all fields
        formGroups.forEach(group => {
            const input = group.querySelector('input, select, textarea');
            const errorMessage = group.querySelector('.error-message');
            
            if (input && errorMessage) {
                if (!validateField(input, errorMessage)) {
                    isValid = false;
                }
            }
        });
        
        if (isValid) {
            // Show success message
            const successMessage = form.querySelector('.success-message');
            successMessage.style.display = 'block';
            
            // Reset form
            form.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
            
            // Here you would typically send the form data to your server
            // For now, we'll just log it to the console
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            console.log('Form submitted:', data);
        }
    });
    
    // Field validation function
    function validateField(input, errorMessage) {
        let isValid = true;
        const value = input.value.trim();
        
        // Remove any existing error styling
        input.classList.remove('error');
        errorMessage.style.display = 'none';
        
        // Check if field is empty
        if (!value) {
            isValid = false;
        }
        
        // Email validation
        if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
            }
        }
        
        // Phone validation
        if (input.type === 'tel' && value) {
            const phoneRegex = /^[\d\s-+()]{10,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
            }
        }
        
        // Show error if validation fails
        if (!isValid) {
            input.classList.add('error');
            errorMessage.style.display = 'block';
        }
        
        return isValid;
    }
}); 