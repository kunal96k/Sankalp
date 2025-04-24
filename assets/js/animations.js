/**
 * Mountain Bliss Animations
 * Handles all animation activations for the Mountain Bliss website
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations
  initHeroAnimations();
  initScrollAnimations();
  initParallaxEffects();
});

/**
 * Initialize hero section animations
 */
function initHeroAnimations() {
  // Hero title animation
  const titleLines = document.querySelectorAll('.title-line');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroCta = document.querySelector('.hero-cta');
  const heroScroll = document.querySelector('.hero-scroll');
  const heroSocial = document.querySelector('.hero-social');
  
  // Animate title lines with delay
  if (titleLines.length > 0) {
    titleLines.forEach((line, index) => {
      setTimeout(() => {
        line.classList.add('active');
      }, 500 + (index * 200));
    });
  }
  
  // Animate subtitle
  if (heroSubtitle) {
    setTimeout(() => {
      heroSubtitle.classList.add('active');
    }, 1000);
  }
  
  // Animate CTA button
  if (heroCta) {
    setTimeout(() => {
      heroCta.classList.add('active');
    }, 1500);
  }
  
  // Animate scroll indicator
  if (heroScroll) {
    setTimeout(() => {
      heroScroll.classList.add('active');
    }, 2000);
  }
  
  // Animate social links
  if (heroSocial) {
    setTimeout(() => {
      heroSocial.classList.add('active');
    }, 2000);
  }
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
  // Elements to animate on scroll
  const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-in-left, .slide-in-right, .about-text p, .feature-item');
  
  // Check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }
  
  // Add active class to elements in viewport
  function checkElements() {
    animatedElements.forEach(element => {
      if (isInViewport(element) && !element.classList.contains('active')) {
        element.classList.add('active');
      }
    });
  }
  
  // Check elements on load and scroll
  window.addEventListener('scroll', checkElements);
  window.addEventListener('resize', checkElements);
  checkElements();
}

/**
 * Initialize parallax effects
 */
function initParallaxEffects() {
  // Hero video parallax
  const heroVideo = document.querySelector('.hero-video');
  
  if (heroVideo) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      heroVideo.style.transform = `scale(1.05) translateY(${scrollPosition * 0.1}px)`;
    });
  }
  
  // Image parallax
  const parallaxImages = document.querySelectorAll('.img-cover');
  
  if (parallaxImages.length > 0) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      
      parallaxImages.forEach(image => {
        if (isInViewport(image)) {
          const speed = image.dataset.speed || 0.1;
          image.style.transform = `translateY(${scrollPosition * speed}px)`;
        }
      });
    });
  }
  
  // Helper function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }
}

/**
 * Initialize smooth scrolling for anchor links
 */
document.addEventListener('DOMContentLoaded', function() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}); 