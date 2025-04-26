/**
 * Positive Impact Page Animations
 * Handles all animations and interactions for the positive-impact.html page
 */

(function($) {
  'use strict';

  // Initialize when document is ready
  $(document).ready(function() {
    // Initialize WOW.js for scroll animations
    new WOW().init();
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 100
    });
    
    // Initialize odometer for achievement counters
    document.querySelectorAll('.odometer').forEach(function(counter) {
        const targetValue = parseInt(counter.getAttribute('data-count'));
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        counter.innerHTML = targetValue;
                    }, 500);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
    
    // Statistics counter animation
    const statNumbers = document.querySelectorAll('.stat-box h3:not(.odometer)');
    
    statNumbers.forEach(function(stat) {
        const targetValue = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateValue(stat, 0, targetValue, 2000);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });
    
    // Function to animate counting
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            element.textContent = currentValue.toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Add parallax effect to images
    const storyImage = document.querySelector('.story-section figure');
    if (storyImage) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            const parallaxOffset = scrollPosition * 0.1;
            storyImage.style.transform = `translateY(${parallaxOffset}px)`;
        });
    }
    
    // Enhanced hover effects for impact cards
    const impactCards = document.querySelectorAll('.impact-card');
    impactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Fix for testimonial slider if it exists
    if (document.querySelector('.testimonial-slider')) {
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
    }
    
    // Fix for mobile menu toggle
    const menuToggle = document.querySelector('.hamburger');
    const sideNavigation = document.querySelector('.side-navigation');
    
    if (menuToggle && sideNavigation) {
        menuToggle.addEventListener('click', function() {
            sideNavigation.classList.toggle('active');
        });
    }
    
    // Fix for preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.classList.add('hide');
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        });
    }
  });
  
  /**
   * Check if elements are in viewport and add active class
   */
  function checkElementsInView() {
    // Get all elements with animation classes
    const animatedElements = $('.fade-in, .slide-up, .slide-in-left, .slide-in-right');
    
    // Check each element
    animatedElements.each(function() {
      const element = $(this);
      
      // If element is in viewport and not already active
      if (isElementInViewport(element) && !element.hasClass('active')) {
        element.addClass('active');
        
        // If this is an odometer element, start counting
        if (element.hasClass('odometer')) {
          const targetValue = parseInt(element.attr('data-count'));
          element.text(targetValue);
        }
      }
    });
  }
  
  /**
   * Check if an element is in the viewport
   */
  function isElementInViewport(element) {
    const rect = element[0].getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }
  
  /**
   * Activate animation classes based on scroll position
   */
  function activateAnimationClasses() {
    // Get all elements with animation classes
    const animatedElements = $('.fade-in, .slide-up, .slide-in-left, .slide-in-right');
    
    // Add active class to elements that are already in viewport
    animatedElements.each(function() {
      if (isElementInViewport($(this))) {
        $(this).addClass('active');
      }
    });
  }
  
  /**
   * Initialize other components
   */
  function initComponents() {
    // Initialize any tooltips
    $('[data-toggle="tooltip"]').tooltip();
    
    // Initialize any popovers
    $('[data-toggle="popover"]').popover();
    
    // Handle smooth scrolling for anchor links
    $('a[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && 
          location.hostname === this.hostname) {
        let target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top - 100
          }, 1000);
          return false;
        }
      }
    });
    
    // Handle mobile menu toggle
    $('.hamburger').on('click', function() {
      $(this).toggleClass('open');
      $('.side-navigation').toggleClass('active');
    });
    
    // Close mobile menu when clicking outside
    $(document).on('click', function(e) {
      if (!$(e.target).closest('.side-navigation, .hamburger').length) {
        $('.side-navigation').removeClass('active');
        $('.hamburger').removeClass('open');
      }
    });
    
    // Handle dropdown menus
    $('.navbar .menu ul li').hover(
      function() {
        $(this).find('ul').stop(true, true).slideDown(300);
      },
      function() {
        $(this).find('ul').stop(true, true).slideUp(300);
      }
    );
  }
  
  /**
   * Handle preloader
   */
  $(window).on('load', function() {
    $('.preloader').fadeOut(500);
    $('body').addClass('page-loaded');
  });
  
})(jQuery); 