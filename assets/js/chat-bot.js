// Chat Bot Configuration
const config = {
  botName: 'Sankalp AI Assistant',
  typingSpeed: 50, // milliseconds per character
  responseDelay: 1000, // milliseconds before bot responds
  welcomeMessage: "Hello! I'm your AI assistant for Sankalp Landmark. How can I help you today?"
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
let conversationHistory = [];

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
  
  // Save first message to conversation history
  conversationHistory.push({
    role: "assistant",
    content: config.welcomeMessage
  });
}

// Create Chat Elements
function createChatElements() {
  const chatHTML = `
    <div class="chat-container">
      <div class="chat-header">
        <div class="chat-header-title">
          <img src="assets/images/logo/letter.png" alt="Sankalp Landmark" class="chat-logo">
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
    
    // Add entrance animation
    chatContainer.classList.add('chat-enter');
    setTimeout(() => {
      chatContainer.classList.remove('chat-enter');
    }, 500);
  }
}

// Minimize Chat
function minimizeChat() {
  // Add minimize animation
  chatContainer.classList.add('chat-minimize');
  
  setTimeout(() => {
    chatContainer.classList.remove('active', 'chat-minimize');
    floatingChatBtn.style.display = 'flex';
    isChatOpen = false;
  }, 300);
}

// Close Chat
function closeChat() {
  // Add close animation
  chatContainer.classList.add('chat-close');
  
  setTimeout(() => {
    chatContainer.classList.remove('active', 'chat-close');
    floatingChatBtn.style.display = 'flex';
    isChatOpen = false;
  }, 300);
}

// Handle Send Message
function handleSendMessage() {
  const message = chatInput.value.trim();
  if (message) {
    addMessage(message, 'user');
    
    // Add user message to conversation history
    conversationHistory.push({
      role: "user",
      content: message
    });
    
    chatInput.value = '';
    processUserMessage(message);
  }
}

// Handle Quick Reply
function handleQuickReply(text) {
  addMessage(text, 'user');
  
  // Add quick reply to conversation history
  conversationHistory.push({
    role: "user",
    content: text
  });
  
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
  
  // Add message appear animation
  messageDiv.style.opacity = '0';
  messageDiv.style.transform = 'translateY(20px)';
  
  chatMessages.appendChild(messageDiv);
  
  // Trigger animation
  setTimeout(() => {
    messageDiv.style.opacity = '1';
    messageDiv.style.transform = 'translateY(0)';
  }, 10);
  
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
async function processUserMessage(message) {
  showTypingIndicator();
  
  try {
    const aiResponse = await fetchAIResponse(message);
    
    setTimeout(() => {
      removeTypingIndicator();
      typeMessage(aiResponse);
      
      // Save AI response to conversation history
      conversationHistory.push({
        role: "assistant",
        content: aiResponse
      });
    }, config.responseDelay);
  } catch (error) {
    console.error("Error getting AI response:", error);
    
    setTimeout(() => {
      removeTypingIndicator();
      typeMessage("I'm sorry, I'm having trouble connecting right now. Please try again later or contact our team directly.");
    }, config.responseDelay);
  }
}

// Fetch AI Response
async function fetchAIResponse(message) {
  try {
    // You'll need to replace this with your actual AI service endpoint
    const response = await fetch('https://api.yourai-service.com/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
      },
      body: JSON.stringify({
        messages: conversationHistory,
        max_tokens: 150,
        temperature: 0.7,
        system_prompt: "You are a helpful AI assistant for Sankalp Landmark, a real estate company. Provide friendly, concise responses about their properties, services, and assist users with their real estate inquiries. The company specializes in luxury apartments, villas, and commercial spaces."
      })
    });
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.response || data.choices[0].message.content;
    
  } catch (error) {
    console.error('Error fetching AI response:', error);
    
    // Fallback responses if AI service fails
    const fallbackResponses = [
      "I understand your query. Let me connect you with our sales team for more detailed information.",
      "That's a great question! I'll make sure our team gets back to you with the information you need.",
      "Thank you for your interest. Our team will contact you shortly with more details."
    ];
    
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }
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
  
  // Add message appear animation
  messageDiv.style.opacity = '0';
  messageDiv.style.transform = 'translateY(20px)';
  chatMessages.appendChild(messageDiv);
  
  // Trigger appear animation
  setTimeout(() => {
    messageDiv.style.opacity = '1';
    messageDiv.style.transform = 'translateY(0)';
  }, 10);
  
  // Type out the message
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