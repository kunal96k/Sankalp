// Chat Bot Configuration
const config = {
  botName: 'Sankalp AI Assistant',
  typingSpeed: 50, // milliseconds per character
  responseDelay: 1000, // milliseconds before bot responds
  welcomeMessage: "Hello! I'm your AI assistant for Sankalp Landmark. How can I help you today?"
};

// Predefined responses for common queries
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

// DOM Elements
let chatContainer;
let chatMessages;
let chatInput;
let sendButton;
let floatingChatBtn;
let minimizeBtn;
let closeBtn;
let quickReplies;

// Chat State
let isChatOpen = false;
let isTyping = false;

// Initialize Chat Bot
function initChatBot() {
  // Create chat container if it doesn't exist
  if (!document.querySelector('.chat-container')) {
    createChatElements();
  }

  // Get DOM elements
  chatContainer = document.querySelector('.chat-container');
  chatMessages = document.getElementById('chatMessages');
  chatInput = document.getElementById('chatInput');
  sendButton = document.getElementById('sendButton');
  floatingChatBtn = document.getElementById('floatingChatBtn');
  minimizeBtn = document.querySelector('.minimize-btn');
  closeBtn = document.querySelector('.close-btn');
  quickReplies = document.getElementById('quickReplies');

  // Add event listeners
  floatingChatBtn.addEventListener('click', toggleChat);
  sendButton.addEventListener('click', handleSendMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSendMessage();
  });
  minimizeBtn.addEventListener('click', minimizeChat);
  closeBtn.addEventListener('click', closeChat);

  // Quick reply buttons
  document.querySelectorAll('.quick-reply-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      handleQuickReply(btn.textContent);
    });
  });

  // Add welcome message
  addMessage(config.welcomeMessage, 'bot');
}

// Create Chat Elements
function createChatElements() {
  const chatHTML = `
    <div class="chat-container">
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
      <div class="chat-messages" id="chatMessages"></div>
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
    </div>
    <button class="floating-chat-btn" id="floatingChatBtn">
      <i class="fas fa-comments"></i>
      <span>Chat with AI</span>
    </button>
  `;

  document.body.insertAdjacentHTML('beforeend', chatHTML);
}

// Toggle Chat Window
function toggleChat() {
  isChatOpen = !isChatOpen;
  chatContainer.classList.toggle('active');
  floatingChatBtn.style.display = isChatOpen ? 'none' : 'flex';
  
  if (isChatOpen) {
    chatInput.focus();
  }
}

// Minimize Chat
function minimizeChat() {
  chatContainer.classList.remove('active');
  floatingChatBtn.style.display = 'flex';
  isChatOpen = false;
}

// Close Chat
function closeChat() {
  chatContainer.classList.remove('active');
  floatingChatBtn.style.display = 'flex';
  isChatOpen = false;
}

// Handle Send Message
function handleSendMessage() {
  const message = chatInput.value.trim();
  if (message) {
    addMessage(message, 'user');
    chatInput.value = '';
    processUserMessage(message);
  }
}

// Handle Quick Reply
function handleQuickReply(text) {
  addMessage(text, 'user');
  processUserMessage(text);
}

// Add Message to Chat
function addMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}-message`;
  
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  messageDiv.innerHTML = `
    <div class="message-content">
      <div class="message-text">${text}</div>
      <div class="message-time">${currentTime}</div>
    </div>
  `;
  
  chatMessages.appendChild(messageDiv);
  scrollToBottom();
}

// Show Typing Indicator
function showTypingIndicator() {
  const typingDiv = document.createElement('div');
  typingDiv.className = 'typing-indicator';
  typingDiv.innerHTML = `
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
  `;
  
  chatMessages.appendChild(typingDiv);
  scrollToBottom();
  isTyping = true;
}

// Remove Typing Indicator
function removeTypingIndicator() {
  const typingIndicator = document.querySelector('.typing-indicator');
  if (typingIndicator) {
    typingIndicator.remove();
  }
  isTyping = false;
}

// Process User Message
function processUserMessage(message) {
  showTypingIndicator();
  
  setTimeout(() => {
    removeTypingIndicator();
    const response = getBotResponse(message.toLowerCase());
    typeMessage(response);
  }, config.responseDelay);
}

// Get Bot Response
function getBotResponse(message) {
  if (message.match(/^(hi|hello|hey|greetings)/i)) {
    return getRandomResponse(responses.greeting);
  }
  
  if (message.match(/project|property|house|apartment|flat/i)) {
    return getRandomResponse(responses.projects);
  }
  
  if (message.match(/book|visit|schedule|appointment/i)) {
    return getRandomResponse(responses.booking);
  }
  
  if (message.match(/location|address|where|place/i)) {
    return getRandomResponse(responses.location);
  }
  
  return getRandomResponse(responses.default);
}

// Get Random Response
function getRandomResponse(responses) {
  return responses[Math.floor(Math.random() * responses.length)];
}

// Type Message with Animation
function typeMessage(message) {
  let index = 0;
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message bot-message';
  
  const messageContent = document.createElement('div');
  messageContent.className = 'message-content';
  
  const messageText = document.createElement('div');
  messageText.className = 'message-text';
  
  const messageTime = document.createElement('div');
  messageTime.className = 'message-time';
  messageTime.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  messageContent.appendChild(messageText);
  messageContent.appendChild(messageTime);
  messageDiv.appendChild(messageContent);
  chatMessages.appendChild(messageDiv);
  
  function type() {
    if (index < message.length) {
      messageText.textContent += message.charAt(index);
      index++;
      scrollToBottom();
      setTimeout(type, config.typingSpeed);
    }
  }
  
  type();
}

// Scroll to Bottom
function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Initialize Chat Bot when DOM is loaded
document.addEventListener('DOMContentLoaded', initChatBot); 