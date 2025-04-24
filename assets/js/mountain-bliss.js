// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 1000,
  once: true,
  easing: 'ease-in-out'
});

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
      breakpoints: {
        992: { perPage: 2 },
        576: { perPage: 1 }
      }
    }).mount();
  }
  
  // Fix Floor Plans Tabs
  const floorPlanTabs = document.querySelectorAll('#floorPlanTab button');
  const floorPlanContents = document.querySelectorAll('#floorPlanTabContent .tab-pane');
  
  floorPlanTabs.forEach((tab, index) => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs and contents
      floorPlanTabs.forEach(t => t.classList.remove('active'));
      floorPlanContents.forEach(c => {
        c.classList.remove('show', 'active');
      });
      
      // Add active class to current tab and content
      this.classList.add('active');
      floorPlanContents[index].classList.add('show', 'active');
    });
  });
  
  // Initialize Floor Plan Hotspots
  const hotspots = document.querySelectorAll('.hotspot');
  hotspots.forEach(hotspot => {
    hotspot.addEventListener('mouseenter', function() {
      this.querySelector('.hotspot-tooltip').style.opacity = '1';
    });
    hotspot.addEventListener('mouseleave', function() {
      this.querySelector('.hotspot-tooltip').style.opacity = '0';
    });
  });
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Section Animations
gsap.timeline()
  .from('.title-line', { 
    y: 100,
    opacity: 0,
    stagger: 0.1,
    duration: 1,
    ease: 'power4.out'
  })
  .from('.hero-subtitle', {
    x: -30,
    opacity: 0,
    duration: 0.8
  }, '-=0.5')
  .from('.hero-cta', {
    opacity: 0,
    y: 20,
    duration: 0.8
  }, '-=0.3')
  .from('.hero-scroll', {
    opacity: 0,
    duration: 1
  }, '-=0.5')
  .from('.hero-social a', {
    opacity: 0,
    y: 20,
    stagger: 0.1,
    duration: 0.8
  }, '-=0.3');

// Gallery Popup Functionality
const galleryItems = document.querySelectorAll('.gallery-item');
const popup = document.querySelector('.gallery-popup');
const popupImg = popup.querySelector('.popup-image');
const popupCaption = popup.querySelector('.popup-caption');
let currentIndex = 0;

galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentIndex = index;
    updatePopup();
    popup.classList.add('active');
  });
});

function updatePopup() {
  const imgSrc = galleryItems[currentIndex].querySelector('img').src;
  const caption = galleryItems[currentIndex].querySelector('.gallery-caption').textContent;
  popupImg.src = imgSrc;
  popupCaption.textContent = caption;
}

// Popup Navigation
document.querySelector('.popup-next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  updatePopup();
});

document.querySelector('.popup-prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  updatePopup();
});

// Close Popup
popup.querySelector('.popup-close').addEventListener('click', () => {
  popup.classList.remove('active');
});
popup.querySelector('.popup-bg').addEventListener('click', () => {
  popup.classList.remove('active');
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    
    // Add your form submission logic here
    console.log('Form submitted:', Object.fromEntries(formData));
    
    // Show success message
    Swal.fire({
      icon: 'success',
      title: 'Message Sent!',
      text: 'We will contact you shortly',
      confirmButtonColor: '#3c5f9f'
    });
    
    this.reset();
  });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Back to Top Button
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

backToTop.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const sideNav = document.querySelector('.side-navigation');

if (hamburger && sideNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    sideNav.classList.toggle('active');
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