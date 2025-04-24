// Import GSAP if not already imported in the HTML
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/gsap.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/ScrollTrigger.min.js"></script>

// Initialize animations when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize WOW.js for basic animations
    new WOW().init();
    
    // Initialize GSAP ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      initGSAPAnimations();
    } else {
      // Fallback to basic animations if GSAP is not available
      initBasicAnimations();
    }
    
    // Initialize Swiper for testimonials
    initTestimonialsSlider();
    
    // Initialize Odometer for counting animations
    initOdometerCounters();
    
    // Add intersection observer for fade-in elements
    observeElements();
  });
  
  // GSAP Animations
  function initGSAPAnimations() {
    // Header animations
    gsap.from('.page-header h1', {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power3.out'
    });
    
    gsap.from('.page-header p', {
      duration: 1,
      y: 30,
      opacity: 0,
      delay: 0.3,
      ease: 'power3.out'
    });
    
    gsap.from('.breadcrumb', {
      duration: 1,
      y: 20,
      opacity: 0,
      delay: 0.5,
      ease: 'power3.out'
    });
    
    // Careers intro section animations
    gsap.from('.careers-intro .section-title', {
      scrollTrigger: {
        trigger: '.careers-intro',
        start: 'top 80%'
      },
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: 'power3.out'
    });
    
    gsap.from('.careers-intro p', {
      scrollTrigger: {
        trigger: '.careers-intro',
        start: 'top 80%'
      },
      duration: 0.8,
      y: 30,
      opacity: 0,
      delay: 0.2,
      stagger: 0.2,
      ease: 'power3.out'
    });
    
    gsap.from('.careers-intro figure', {
      scrollTrigger: {
        trigger: '.careers-intro figure',
        start: 'top 80%'
      },
      duration: 1,
      x: 50,
      opacity: 0,
      ease: 'power3.out'
    });
    
    // Stat boxes animations with bounce effect
    gsap.from('.stat-box', {
      scrollTrigger: {
        trigger: '.career-stats',
        start: 'top 80%'
      },
      duration: 0.8,
      y: 50,
      opacity: 0,
      stagger: 0.15,
      ease: 'back.out(1.5)'
    });
    
    // Why join us section animations
    gsap.from('.why-join-us .section-title, .why-join-us .section-description', {
      scrollTrigger: {
        trigger: '.why-join-us',
        start: 'top 80%'
      },
      duration: 0.8,
      y: 30,
      opacity: 0,
      stagger: 0.2,
      ease: 'power3.out'
    });
    
    // Benefit boxes animations with stagger
    gsap.from('.benefit-box', {
      scrollTrigger: {
        trigger: '.why-join-us .row',
        start: 'top 80%'
      },
      duration: 0.8,
      y: 50,
      opacity: 0,
      stagger: 0.1,
      ease: 'power3.out'
    });
    
    // Open positions section animations
    gsap.from('.open-positions .section-title, .open-positions .section-description', {
      scrollTrigger: {
        trigger: '.open-positions',
        start: 'top 80%'
      },
      duration: 0.8,
      y: 30,
      opacity: 0,
      stagger: 0.2,
      ease: 'power3.out'
    });
    
    // Position boxes animations
    gsap.from('.position-box', {
      scrollTrigger: {
        trigger: '.open-positions .row',
        start: 'top 80%'
      },
      duration: 0.8,
      y: 50,
      opacity: 0,
      stagger: 0.2,
      ease: 'power3.out'
    });
    
    // Application process section
    gsap.from('.application-process .section-title, .application-process .section-description', {
      scrollTrigger: {
        trigger: '.application-process',
        start: 'top 80%'
      },
      duration: 0.8,
      y: 30,
      opacity: 0,
      stagger: 0.2,
      ease: 'power3.out'
    });
    
    // Process boxes animations with stagger and rotation
    gsap.from('.process-box', {
      scrollTrigger: {
        trigger: '.application-process .row',
        start: 'top 80%'
      },
      duration: 1,
      y: 50,
      opacity: 0,
      stagger: 0.15,
      ease: 'back.out(1.2)'
    });
    
    // Number counters with a bounce effect
    gsap.from('.process-box .number', {
      scrollTrigger: {
        trigger: '.application-process .row',
        start: 'top 80%'
      },
      duration: 0.8,
      scale: 0,
      opacity: 0,
      stagger: 0.15,
      delay: 0.5,
      ease: 'back.out(2)'
    });
    
    // Testimonials section
    gsap.from('.testimonials .section-title, .testimonials .section-description', {
      scrollTrigger: {
        trigger: '.testimonials',
        start: 'top 80%'
      },
      duration: 0.8,
      y: 30,
      opacity: 0,
      stagger: 0.2,
      ease: 'power3.out'
    });
    
    // Footer animations
    gsap.from('.footer-bar .inner', {
      scrollTrigger: {
        trigger: '.footer-bar',
        start: 'top 90%'
      },
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power3.out'
    });
  }
  
  // Basic animations fallback (in case GSAP is not loaded)
  function initBasicAnimations() {
    // Add fade-in class to elements for CSS animations
    const animatedElements = document.querySelectorAll('.section-title, .section-description, .stat-box, .benefit-box, .position-box, .process-box, .testimonial-box');
    
    animatedElements.forEach(element => {
      element.classList.add('fade-in');
    });
  }
  
  // Initialize Swiper testimonials slider
  function initTestimonialsSlider() {
    new Swiper('.testimonials-slider', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      speed: 1000,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      breakpoints: {
        768: {
          slidesPerView: 2
        },
        1200: {
          slidesPerView: 3
        }
      }
    });
  }
  
  // Initialize Odometer counters for animated counting
  function initOdometerCounters() {
    const odometerElements = document.querySelectorAll('.odometer');
    
    if (odometerElements.length) {
      odometerElements.forEach(element => {
        // Create intersection observer for each counter
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Get target count from data attribute
              const targetCount = parseInt(element.getAttribute('data-count'));
              
              // Set timeout to let the animation happen after the element is visible
              setTimeout(() => {
                element.innerHTML = targetCount;
              }, 500);
              
              // Unobserve after animation is triggered
              observer.unobserve(element);
            }
          });
        }, { threshold: 0.5 });
        
        // Start observing the element
        observer.observe(element);
      });
    }
  }
  
  // Add intersection observer for fade-in elements
  function observeElements() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      fadeElements.forEach(element => {
        observer.observe(element);
      });
    }
  }
  
  // Enhance hover interactions
  document.addEventListener('DOMContentLoaded', function() {
    // Add hover animations for position boxes
    const positionBoxes = document.querySelectorAll('.position-box');
    positionBoxes.forEach(box => {
      box.addEventListener('mouseenter', function() {
        if (typeof gsap !== 'undefined') {
          gsap.to(this, { 
            duration: 0.3, 
            backgroundColor: '#fffbee', 
            ease: 'power2.out' 
          });
        }
      });
      
      box.addEventListener('mouseleave', function() {
        if (typeof gsap !== 'undefined') {
          gsap.to(this, { 
            duration: 0.3, 
            backgroundColor: '#fff', 
            ease: 'power2.out' 
          });
        }
      });
    });
    
    // Add hover animations for benefit boxes
    const benefitBoxes = document.querySelectorAll('.benefit-box');
    benefitBoxes.forEach(box => {
      box.addEventListener('mouseenter', function() {
        const icon = this.querySelector('figure img');
        if (icon && typeof gsap !== 'undefined') {
          gsap.to(icon, { 
            duration: 0.5, 
            rotation: 10, 
            scale: 1.1, 
            ease: 'elastic.out(1, 0.3)' 
          });
        }
      });
      
      box.addEventListener('mouseleave', function() {
        const icon = this.querySelector('figure img');
        if (icon && typeof gsap !== 'undefined') {
          gsap.to(icon, { 
            duration: 0.5, 
            rotation: 0, 
            scale: 1, 
            ease: 'elastic.out(1, 0.3)' 
          });
        }
      });
    });
    
    // Add particle effects to apply buttons
    const applyButtons = document.querySelectorAll('.btn-apply');
    applyButtons.forEach(button => {
      button.addEventListener('mouseenter', function() {
        if (typeof gsap !== 'undefined') {
          gsap.to(this, { 
            duration: 0.3, 
            backgroundColor: '#222', 
            color: '#fff', 
            ease: 'power2.out' 
          });
        }
      });
      
      button.addEventListener('mouseleave', function() {
        if (typeof gsap !== 'undefined') {
          gsap.to(this, { 
            duration: 0.3, 
            backgroundColor: '#ffc107', 
            color: '#222', 
            ease: 'power2.out' 
          });
        }
      });
    });
  });
  
  // Add AOS (Animate On Scroll) initialization (if available)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic'
    });
  }
  
  // Add responsive behavior for the careers page
  window.addEventListener('resize', function() {
    adjustResponsiveLayout();
  });
  
  function adjustResponsiveLayout() {
    const windowWidth = window.innerWidth;
    
    // Adjust testimonials slider
    if (windowWidth < 768) {
      // Mobile layout adjustments
      document.querySelectorAll('.process-box').forEach(box => {
        box.style.height = 'auto';
      });
    } else {
      // Reset heights for desktop
      equalizeHeights('.process-box');
      equalizeHeights('.benefit-box');
    }
  }
  
  // Helper function to equalize heights of elements
  function equalizeHeights(selector) {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;
    
    // Reset heights first
    elements.forEach(el => {
      el.style.height = 'auto';
    });
    
    // Find the tallest element
    let maxHeight = 0;
    elements.forEach(el => {
      const height = el.offsetHeight;
      if (height > maxHeight) {
        maxHeight = height;
      }
    });
    
    // Set all elements to the height of the tallest one
    elements.forEach(el => {
      el.style.height = maxHeight + 'px';
    });
  }
  
  // Call responsive adjustment on load
  document.addEventListener('DOMContentLoaded', function() {
    adjustResponsiveLayout();
  });
  
  // Add smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId !== '#') {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Add special animation for page header
  if (document.querySelector('.page-header')) {
    if (typeof gsap !== 'undefined') {
      gsap.from('.page-header', {
        duration: 1.5,
        backgroundPosition: '0% 30%',
        ease: 'power2.out'
      });
      
      gsap.to('.page-header h1:after', {
        duration: 1.5,
        width: '100%',
        delay: 1,
        ease: 'power3.inOut'
      });
    }
  }