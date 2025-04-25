// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 1000,
  once: false,
  mirror: true,
  offset: 100,
  easing: 'ease-out-cubic'
});

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Hero Section Animation
gsap.from('.hero-title', {
  duration: 1.5,
  y: 100,
  opacity: 0,
  ease: 'power4.out',
  delay: 0.5
});

gsap.from('.hero-subtitle', {
  duration: 1.5,
  y: 50,
  opacity: 0,
  ease: 'power4.out',
  delay: 0.8
});

gsap.from('.hero-cta', {
  duration: 1,
  y: 30,
  opacity: 0,
  ease: 'power4.out',
  delay: 1.1
});

// Parallax Effect for Hero Video
gsap.to('.hero-video', {
  yPercent: 30,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});

// Section Title Animations
gsap.utils.toArray('.section-title').forEach(title => {
  gsap.from(title, {
    scrollTrigger: {
      trigger: title,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power4.out'
  });
});

// Gallery Item Animations
gsap.utils.toArray('.gallery-item').forEach((item, i) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power4.out',
    delay: i * 0.1
  });
});

// Floor Plan Tabs Animation
const floorPlanTabs = document.querySelectorAll('.floor-plan-tab');
const floorPlanContents = document.querySelectorAll('.floor-plan-content');

floorPlanTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    // Remove active class from all tabs
    floorPlanTabs.forEach(t => t.classList.remove('active'));
    // Add active class to clicked tab
    tab.classList.add('active');
    
    // Hide all contents
    floorPlanContents.forEach(content => {
      content.style.display = 'none';
    });
    
    // Show selected content with animation
    const selectedContent = floorPlanContents[index];
    selectedContent.style.display = 'block';
    gsap.from(selectedContent, {
      duration: 0.5,
      y: 20,
      opacity: 0,
      ease: 'power4.out'
    });
  });
});

// Floor Plan Hotspots Animation
const hotspots = document.querySelectorAll('.hotspot');
hotspots.forEach(hotspot => {
  gsap.from(hotspot, {
    scale: 0,
    opacity: 0,
    duration: 0.5,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: hotspot,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });
  
  // Hotspot hover animation
  hotspot.addEventListener('mouseenter', () => {
    gsap.to(hotspot, {
      scale: 1.2,
      duration: 0.3
    });
    
    const tooltip = hotspot.querySelector('.hotspot-tooltip');
    if (tooltip) {
      gsap.to(tooltip, {
        opacity: 1,
        y: 0,
        duration: 0.3
      });
    }
  });
  
  hotspot.addEventListener('mouseleave', () => {
    gsap.to(hotspot, {
      scale: 1,
      duration: 0.3
    });
    
    const tooltip = hotspot.querySelector('.hotspot-tooltip');
    if (tooltip) {
      gsap.to(tooltip, {
        opacity: 0,
        y: 10,
        duration: 0.3
      });
    }
  });
});

// Contact Form Animation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  gsap.from(contactForm, {
    scrollTrigger: {
      trigger: contactForm,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power4.out'
  });
}

// Form Input Animation
const formInputs = document.querySelectorAll('.form-control');
formInputs.forEach(input => {
  input.addEventListener('focus', () => {
    gsap.to(input, {
      scale: 1.02,
      duration: 0.3
    });
  });
  
  input.addEventListener('blur', () => {
    gsap.to(input, {
      scale: 1,
      duration: 0.3
    });
  });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: target,
          offsetY: 80
        },
        ease: 'power4.inOut'
      });
    }
  });
});

// Back to Top Button Animation
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  gsap.set(backToTop, { opacity: 0, y: 20 });
  
  ScrollTrigger.create({
    start: 'top -100',
    onEnter: () => gsap.to(backToTop, { opacity: 1, y: 0, duration: 0.5 }),
    onLeaveBack: () => gsap.to(backToTop, { opacity: 0, y: 20, duration: 0.5 })
  });
  
  backToTop.addEventListener('click', () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: 0 },
      ease: 'power4.inOut'
    });
  });
}

// Mobile Menu Toggle Animation
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('active');
    
    if (!isOpen) {
      mobileMenu.classList.add('active');
      gsap.from(mobileMenu, {
        duration: 0.5,
        x: '100%',
        ease: 'power4.out'
      });
      
      gsap.from(mobileMenu.querySelectorAll('a'), {
        duration: 0.3,
        x: 50,
        opacity: 0,
        stagger: 0.1,
        ease: 'power4.out'
      });
    } else {
      gsap.to(mobileMenu, {
        duration: 0.5,
        x: '100%',
        ease: 'power4.in',
        onComplete: () => mobileMenu.classList.remove('active')
      });
    }
  });
}

// Initialize Splide Sliders
document.addEventListener('DOMContentLoaded', function() {
  // Villas Slider
  if (document.querySelector('.villas-slider')) {
    new Splide('.villas-slider', {
      type: 'slide',
      perPage: 3,
      perMove: 1,
      gap: '30px',
      pagination: false,
      arrows: true,
      autoplay: true,
      interval: 5000,
      pauseOnHover: true,
      breakpoints: {
        992: { perPage: 2 },
        768: { perPage: 1 }
      }
    }).mount();
  }

  // Interior Views Slider
  if (document.querySelector('.interior-views-slider')) {
    new Splide('.interior-views-slider', {
      type: 'loop',
      perPage: 3,
      gap: '20px',
      autoplay: true,
      interval: 4000,
      pauseOnHover: true,
      breakpoints: {
        992: { perPage: 2 },
        576: { perPage: 1 }
      }
    }).mount();
  }
  
  // Fix Floor Plans Tabs with smooth transitions
  const floorPlanTabs = document.querySelectorAll('#floorPlanTab button');
  const floorPlanContents = document.querySelectorAll('#floorPlanTabContent .tab-pane');
  
  floorPlanTabs.forEach((tab, index) => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs and contents with animation
      floorPlanTabs.forEach(t => {
        t.classList.remove('active');
        gsap.to(t, { scale: 1, duration: 0.3 });
      });
      floorPlanContents.forEach(c => {
        c.classList.remove('show', 'active');
        gsap.to(c, { opacity: 0, y: 20, duration: 0.3 });
      });
      
      // Add active class to current tab and content with animation
      this.classList.add('active');
      gsap.to(this, { scale: 1.05, duration: 0.3 });
      floorPlanContents[index].classList.add('show', 'active');
      gsap.to(floorPlanContents[index], { opacity: 1, y: 0, duration: 0.5, delay: 0.2 });
    });
  });
  
  // Enhanced Floor Plan Hotspots
  const hotspots = document.querySelectorAll('.hotspot');
  hotspots.forEach(hotspot => {
    hotspot.addEventListener('mouseenter', function() {
      gsap.to(this.querySelector('.hotspot-tooltip'), {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(this.querySelector('.hotspot-dot'), {
        scale: 1.5,
        duration: 0.3,
        ease: 'back.out(1.7)'
      });
    });
    hotspot.addEventListener('mouseleave', function() {
      gsap.to(this.querySelector('.hotspot-tooltip'), {
        opacity: 0,
        y: 10,
        duration: 0.3,
        ease: 'power2.in'
      });
      gsap.to(this.querySelector('.hotspot-dot'), {
        scale: 1,
        duration: 0.3,
        ease: 'back.out(1.7)'
      });
    });
  });
});

// Animate sections on scroll
const sections = document.querySelectorAll('section');
sections.forEach(section => {
  gsap.from(section, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      end: 'top 20%',
      toggleActions: 'play none none reverse'
    }
  });
});

// Enhanced Gallery Popup with GSAP
const galleryItems = document.querySelectorAll('.gallery-item');
const popup = document.querySelector('.gallery-popup');
const popupImg = popup.querySelector('.popup-image');
const popupCaption = popup.querySelector('.popup-caption');
let currentIndex = 0;

galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentIndex = index;
    updatePopup();
    gsap.to(popup, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'power3.out'
    });
    popup.classList.add('active');
  });
});

function updatePopup() {
  const imgSrc = galleryItems[currentIndex].querySelector('img').src;
  const caption = galleryItems[currentIndex].querySelector('.gallery-caption').textContent;
  
  gsap.to(popupImg, {
    opacity: 0,
    scale: 0.8,
    duration: 0.3,
    onComplete: () => {
      popupImg.src = imgSrc;
      popupCaption.textContent = caption;
      gsap.to(popupImg, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power3.out'
      });
    }
  });
}

// Enhanced Popup Navigation
document.querySelector('.popup-next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  updatePopup();
});

document.querySelector('.popup-prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  updatePopup();
});

// Close Popup with animation
popup.querySelector('.popup-close').addEventListener('click', () => {
  gsap.to(popup, {
    opacity: 0,
    scale: 0.8,
    duration: 0.5,
    ease: 'power3.in',
    onComplete: () => popup.classList.remove('active')
  });
});

popup.querySelector('.popup-bg').addEventListener('click', () => {
  gsap.to(popup, {
    opacity: 0,
    scale: 0.8,
    duration: 0.5,
    ease: 'power3.in',
    onComplete: () => popup.classList.remove('active')
  });
});

// Enhanced Contact Form Handling with animations
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    
    // Add your form submission logic here
    console.log('Form submitted:', Object.fromEntries(formData));
    
    // Show success message with animation
    Swal.fire({
      icon: 'success',
      title: 'Message Sent!',
      text: 'We will contact you shortly',
      confirmButtonColor: '#3c5f9f',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
    
    // Reset form with animation
    gsap.to(this, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      onComplete: () => {
        this.reset();
        gsap.to(this, {
          opacity: 1,
          y: 0,
          duration: 0.3
        });
      }
    });
  });
}

// Enhanced Smooth Scroll with GSAP
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: target,
          offsetY: 80
        },
        ease: 'power3.inOut'
      });
    }
  });
});

// Enhanced Back to Top Button
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    gsap.to(backToTop, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
    backToTop.classList.add('show');
  } else {
    gsap.to(backToTop, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: 'power2.in'
    });
    backToTop.classList.remove('show');
  }
});

backToTop.addEventListener('click', (e) => {
  e.preventDefault();
  gsap.to(window, {
    duration: 1,
    scrollTo: {
      y: 0
    },
    ease: 'power3.inOut'
  });
});

// Enhanced Mobile Menu Toggle with GSAP
const hamburger = document.querySelector('.hamburger');
const sideNav = document.querySelector('.side-navigation');

if (hamburger && sideNav) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.contains('active');
    
    if (!isOpen) {
      gsap.to(sideNav, {
        x: 0,
        duration: 0.5,
        ease: 'power3.out'
      });
      gsap.to('.side-nav-link', {
        opacity: 1,
        x: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out'
      });
    } else {
      gsap.to(sideNav, {
        x: '100%',
        duration: 0.5,
        ease: 'power3.in'
      });
      gsap.to('.side-nav-link', {
        opacity: 0,
        x: 50,
        stagger: 0.05,
        duration: 0.3,
        ease: 'power2.in'
      });
    }
    
    hamburger.classList.toggle('active');
  });
}

// Preloader
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    preloader.style.transition = 'opacity 0.5s';
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }
});

// Initialize other components
$(function() {
  $('.navbar .language a').click(function(e) {
    e.preventDefault();
    $(this).addClass('active').siblings().removeClass('active');
  });

  $('.select-box .dropdown-menu a').click(function(e) {
    e.preventDefault();
    const text = $(this).text();
    const icon = $(this).find('img').clone();
    $(this).closest('.select-box').find('.dropdown-toggle span').html(icon.add(text));
  });
});