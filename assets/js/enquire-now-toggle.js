document.addEventListener('DOMContentLoaded', function() {
    // Create and append the Enquire Now button to the body
    const floatingInquiryBtn = document.createElement('button');
    floatingInquiryBtn.className = 'floating-inquiry-btn';
    floatingInquiryBtn.id = 'floatingInquiryBtn';
    floatingInquiryBtn.innerHTML = '<i class="fas fa-envelope"></i><span>Enquire Now</span>';
    document.body.appendChild(floatingInquiryBtn);

    // Create and append the inquiry form container
    const inquiryContainer = document.createElement('div');
    inquiryContainer.className = 'inquiry-container';
    inquiryContainer.innerHTML = `
        <div class="inquiry-header">
            <div class="inquiry-header-title">
                <img src="assets/images/logo/logo.webp" alt="Sankalp Landmark" class="inquiry-logo">
                <h3>Enquire Now</h3>
            </div>
            <button class="close-btn" title="Close Form"><i class="fas fa-times"></i></button>
        </div>
        <form class="inquiry-form" id="inquiryForm">
            <div class="form-group">
                <input type="text" id="name" name="name" required>
                <label for="name">Full Name</label>
            </div>
            <div class="form-group">
                <input type="tel" id="phone" name="phone" required>
                <label for="phone">Contact Number</label>
            </div>
            <div class="form-group">
                <select id="site" name="site" required>
                    <option value="" disabled selected></option>
                    <option value="site1">Site Name 1</option>
                    <option value="site2">Site Name 2</option>
                    <option value="site3">Site Name 3</option>
                </select>
                <label for="site">Select Site</label>
            </div>
            <div class="form-group">
                <textarea id="remark" name="remark" rows="4" required></textarea>
                <label for="remark">Your Remark</label>
            </div>
            <button type="submit" class="submit-btn">
                <span>Submit Inquiry</span>
                <i class="fas fa-paper-plane"></i>
            </button>
        </form>
    `;
    document.body.appendChild(inquiryContainer);

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
    const closeBtn = inquiryContainer.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        inquiryContainer.style.opacity = '0';
        inquiryContainer.style.transform = 'translateY(20px)';
        setTimeout(() => {
            inquiryContainer.style.display = 'none';
        }, 300);
    });

    // Form submission
    const inquiryForm = document.getElementById('inquiryForm');
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
    const formGroups = inquiryContainer.querySelectorAll('.form-group');
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