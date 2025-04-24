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

    // Create and append the Chat Bot container
    const chatContainer = document.createElement('div');
    chatContainer.className = 'chat-container';
    chatContainer.innerHTML = `
        <div class="chat-header">
            <div class="chat-header-title">
                <img src="assets/images/logo/logo.webp" alt="Sankalp Landmark" class="chat-logo">
                <div class="chat-title-text">
                    <h3>AI Assistant</h3>
                    <span class="status">Online</span>
                </div>
            </div>
            <div class="chat-header-actions">
                <button class="minimize-btn" title="Minimize Chat"><i class="fas fa-minus"></i></button>
                <button class="close-btn" title="Close Chat"><i class="fas fa-times"></i></button>
            </div>
        </div>
        <div class="chat-messages" id="chatMessages">
            <div class="message bot-message">
                <div class="message-content">
                    <div class="message-text">
                        Hello! I'm your AI assistant for Sankalp Landmark. How can I help you today?
                    </div>
                    <div class="message-time">Just now</div>
                </div>
            </div>
        </div>
        <div class="quick-replies" id="quickReplies">
            <button class="quick-reply-btn">View Projects</button>
            <button class="quick-reply-btn">Book a Visit</button>
            <button class="quick-reply-btn">Contact Sales</button>
            <button class="quick-reply-btn">Location Details</button>
        </div>
        <div class="chat-input-container">
            <div class="chat-input-wrapper">
                <input type="text" id="chatInput" placeholder="Type your message here..." class="chat-input">
                <button class="send-btn" id="sendButton" title="Send Message">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(chatContainer);

    // Create and append the floating chat button
    const floatingChatBtn = document.createElement('button');
    floatingChatBtn.className = 'floating-chat-btn';
    floatingChatBtn.id = 'floatingChatBtn';
    floatingChatBtn.innerHTML = '<i class="fas fa-comments"></i><span>Chat with AI</span>';
    document.body.appendChild(floatingChatBtn);

    // Chat bot responses
    const responses = {
        greeting: [
            "Hello! I'm your AI assistant for Sankalp Landmark. How can I help you today?",
            "Welcome to Sankalp Landmark! I'm here to assist you with any questions about our properties.",
            "Hi there! Thank you for reaching out to Sankalp Landmark. How may I assist you today?"
        ],
        projects: [
            "We have several exciting projects across prime locations. Would you like to know more about any specific project?",
            "Our current projects include luxury apartments, villas, and commercial spaces. Which type of property interests you?",
            "I can provide detailed information about our ongoing and upcoming projects. What would you like to know?"
        ],
        booking: [
            "I can help you schedule a site visit. What would be your preferred date and time?",
            "To book a site visit, I'll need your preferred date and contact details. Would you like to proceed?",
            "Our sales team can arrange a site visit at your convenience. When would you like to visit?"
        ],
        location: [
            "Our properties are strategically located with excellent connectivity. Which area are you interested in?",
            "We have projects in prime locations with easy access to major landmarks. Would you like specific location details?",
            "Each of our projects is carefully chosen for its location advantages. Which project's location would you like to know about?"
        ],
        default: [
            "I understand your query. Let me connect you with our sales team for more detailed information.",
            "That's a great question! I'll make sure our team gets back to you with the information you need.",
            "Thank you for your interest. Our team will contact you shortly with more details."
        ]
    };

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
    const inquiryCloseBtn = inquiryContainer.querySelector('.close-btn');
    inquiryCloseBtn.addEventListener('click', () => {
        inquiryContainer.style.opacity = '0';
        inquiryContainer.style.transform = 'translateY(20px)';
        setTimeout(() => {
            inquiryContainer.style.display = 'none';
        }, 300);
    });

    // Show chat when floating button is clicked
    floatingChatBtn.addEventListener('click', () => {
        chatContainer.style.display = 'block';
        setTimeout(() => {
            chatContainer.style.opacity = '1';
            chatContainer.style.transform = 'translateY(0)';
        }, 10);
    });

    // Minimize chat
    const chatMinimizeBtn = chatContainer.querySelector('.minimize-btn');
    chatMinimizeBtn.addEventListener('click', () => {
        chatContainer.style.opacity = '0';
        chatContainer.style.transform = 'translateY(20px)';
        setTimeout(() => {
            chatContainer.style.display = 'none';
        }, 300);
    });

    // Close chat
    const chatCloseBtn = chatContainer.querySelector('.close-btn');
    chatCloseBtn.addEventListener('click', () => {
        chatContainer.style.opacity = '0';
        chatContainer.style.transform = 'translateY(20px)';
        setTimeout(() => {
            chatContainer.style.display = 'none';
        }, 300);
    });

    // Handle quick reply buttons
    const quickReplyButtons = chatContainer.querySelectorAll('.quick-reply-btn');
    quickReplyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const message = button.textContent;
            addMessage(message, 'user');
            handleUserInput(message);
        });
    });

    // Handle send button click
    const sendButton = chatContainer.querySelector('#sendButton');
    const chatInput = chatContainer.querySelector('#chatInput');
    sendButton.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            handleUserInput(message);
            chatInput.value = '';
        }
    });

    // Handle enter key press
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const message = chatInput.value.trim();
            if (message) {
                addMessage(message, 'user');
                handleUserInput(message);
                chatInput.value = '';
            }
        }
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
                inquiryCloseBtn.click();
            }, 2000);
        }
    });

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const textDiv = document.createElement('div');
        textDiv.className = 'message-text';
        textDiv.textContent = text;
        
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = getCurrentTime();
        
        contentDiv.appendChild(textDiv);
        contentDiv.appendChild(timeDiv);
        messageDiv.appendChild(contentDiv);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Handle user input
    function handleUserInput(input) {
        // Simulate typing delay
        setTimeout(() => {
            let response;
            
            // Check for keywords in input
            if (input.toLowerCase().includes('project') || input.toLowerCase().includes('property')) {
                response = getRandomResponse('projects');
            } else if (input.toLowerCase().includes('book') || input.toLowerCase().includes('visit')) {
                response = getRandomResponse('booking');
            } else if (input.toLowerCase().includes('location') || input.toLowerCase().includes('where')) {
                response = getRandomResponse('location');
            } else if (input.toLowerCase().includes('hi') || input.toLowerCase().includes('hello')) {
                response = getRandomResponse('greeting');
            } else {
                response = getRandomResponse('default');
            }
            
            addMessage(response, 'bot');
        }, 1000);
    }

    // Get random response from category
    function getRandomResponse(category) {
        const categoryResponses = responses[category];
        return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
    }

    // Get current time in HH:MM format
    function getCurrentTime() {
        const now = new Date();
        return now.getHours().toString().padStart(2, '0') + ':' + 
               now.getMinutes().toString().padStart(2, '0');
    }

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