document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });
  
  // Add animation classes to elements when they come into view
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.fade-in, .slide-up, .slide-in-left, .slide-in-right');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.classList.add('active');
      }
    });
  };

  // Run animation check on load and scroll
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);
  
  // Team member hover effects
  const teamMembers = document.querySelectorAll('.team-member');
  
  teamMembers.forEach(member => {
    member.addEventListener('mouseenter', function() {
      this.querySelector('.social-links').style.opacity = '1';
      this.querySelector('.member-info').style.transform = 'translateY(0)';
    });
    
    member.addEventListener('mouseleave', function() {
      this.querySelector('.social-links').style.opacity = '0';
      this.querySelector('.member-info').style.transform = 'translateY(20px)';
    });
  });

  // Testimonial slider functionality
  const testimonialSlider = new Swiper('.testimonial-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    }
  });

  // Counter animation for statistics
  const counters = document.querySelectorAll('.stat-box h3');
  const speed = 200;
  
  const animateCounter = function(counter) {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / speed;
    
    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(() => animateCounter(counter), 1);
    } else {
      counter.innerText = target;
    }
  };
  
  // Start counter animation when element is in viewport
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Parallax effect for header background
  const header = document.querySelector('.page-header');
  
  window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    header.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
  });

  // Timeline animation
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  timelineItems.forEach(item => {
    timelineObserver.observe(item);
  });

  // Form validation for contact form
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const formInputs = this.querySelectorAll('input, textarea');
      
      formInputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
          isValid = false;
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }
        
        if (input.type === 'email' && input.value.trim()) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(input.value.trim())) {
            isValid = false;
            input.classList.add('error');
          }
        }
      });
      
      if (isValid) {
        // Form submission logic would go here
        this.reset();
        alert('Thank you for your message! We will get back to you soon.');
      }
    });
  }

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });
  }

  // Image gallery lightbox
  const galleryImages = document.querySelectorAll('.gallery-item img');
  
  galleryImages.forEach(image => {
    image.addEventListener('click', function() {
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      
      const lightboxImg = document.createElement('img');
      lightboxImg.src = this.src;
      
      lightbox.appendChild(lightboxImg);
      document.body.appendChild(lightbox);
      
      lightbox.addEventListener('click', function() {
        this.remove();
      });
    });
  });
});

// Extra animation for the team members section if needed
function initTeamMembers() {
  const teamMembers = document.querySelectorAll('.team-member');
  
  if (teamMembers.length) {
    teamMembers.forEach(member => {
      member.addEventListener('mouseenter', function() {
        const overlay = this.querySelector('.overlay');
        
        if (overlay) {
          overlay.style.opacity = '1';
          overlay.style.transform = 'translateY(0)';
        }
      });
      
      member.addEventListener('mouseleave', function() {
        const overlay = this.querySelector('.overlay');
        
        if (overlay) {
          overlay.style.opacity = '0';
          overlay.style.transform = 'translateY(20px)';
        }
      });
    });
  }
}