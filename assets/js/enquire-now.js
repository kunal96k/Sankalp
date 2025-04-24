document.addEventListener('DOMContentLoaded', function() {
    const inquiryForm = document.getElementById('inquiryForm');
    const floatingInquiryBtn = document.getElementById('floatingInquiryBtn');
    const inquiryContainer = document.querySelector('.inquiry-container');
    const closeBtn = document.querySelector('.close-btn');
    
    // Form validation patterns
    const patterns = {
        phone: /^\+?[\d\s-]{10,}$/,
        name: /^[a-zA-Z\s]{2,}$/
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

    // Form submission
    inquiryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const formData = new FormData(inquiryForm);
        
        // Validate name
        if (!patterns.name.test(formData.get('name'))) {
            showError('name', 'Please enter a valid name');
            isValid = false;
        }

        // Validate phone
        if (!patterns.phone.test(formData.get('phone'))) {
            showError('phone', 'Please enter a valid phone number');
            isValid = false;
        }

        // Validate site selection
        if (!formData.get('site')) {
            showError('site', 'Please select a site');
            isValid = false;
        }

        // Validate remark
        if (!formData.get('remark').trim()) {
            showError('remark', 'Please enter your remark');
            isValid = false;
        }

        if (isValid) {
            // Here you would typically send the form data to your server
            // For now, we'll just show a success message
            showSuccessMessage();
            inquiryForm.reset();
            
            // Close the form after successful submission
            setTimeout(() => {
                closeBtn.click();
            }, 2000);
        }
    });

    // Show error message
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const formGroup = field.closest('.form-group');
        
        // Remove any existing error message
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        formGroup.appendChild(errorMessage);
        
        // Add error class to form group
        formGroup.classList.add('error');
    }

    // Show success message
    function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for your inquiry! We will contact you soon.';
        
        inquiryForm.appendChild(successMessage);
        
        setTimeout(() => {
            successMessage.style.opacity = '1';
        }, 10);
    }

    // Add floating label functionality
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        const label = group.querySelector('label');

        if (input && label) {
            // Set initial placeholder
            if (input.tagName !== 'SELECT') {
                input.setAttribute('placeholder', ' ');
            }

            // Handle focus events
            input.addEventListener('focus', () => {
                label.classList.add('active');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    label.classList.remove('active');
                }
            });

            // Check initial state
            if (input.value) {
                label.classList.add('active');
            }
        }
    });
}); 