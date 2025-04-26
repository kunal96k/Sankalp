document.addEventListener('DOMContentLoaded', function() {
    // Initialize WOW.js for scroll animations
    new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 100,
        mobile: true,
        live: true
    }).init();
    
    // Initialize Swiper for testimonials slider
    if (document.querySelector('.testimonials-slider')) {
        const testimonialSlider = new Swiper('.testimonials-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            speed: 800,
            effect: 'slide',
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                576: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                }
            }
        });
    }
    // Enhanced Stats Counter Animation
    const countStats = () => {
        const statElements = document.querySelectorAll('.stat-box h3:not(.counted)');
        
        statElements.forEach(el => {
            const target = parseInt(el.getAttribute('data-count') || el.innerText.replace(/[^0-9]/g, ''));
            const isIntersecting = isElementInViewport(el);
            
            if (isIntersecting) {
                // Mark as counted to prevent re-counting
                el.classList.add('counted');
                
                // Animate counter
                const duration = 2000;
                const startTimestamp = performance.now();
                const startValue = 0;
                
                const step = (timestamp) => {
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    const current = Math.floor(progress * (target - startValue) + startValue);
                    el.textContent = current;
                    
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    } else {
                        // Add % sign if needed
                        if (el.parentElement.querySelector('p').textContent.includes('%')) {
                            el.textContent = `${target}`;
                        }
                        
                        // Add animation effect when counter reaches the end
                        el.style.animation = 'pulse 1s ease';
                        setTimeout(() => {
                            el.style.animation = '';
                        }, 1000);
                    }
                };
                
                window.requestAnimationFrame(step);
            }
        });
    };
    
    // Check if an element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Initialize and run counters when elements come into view
    const handleScroll = () => {
        countStats();
    };
    
    // Run on load and scroll
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    
    // Handle odometer animations separately
    const odometerElements = document.querySelectorAll('.odometer');
    odometerElements.forEach(odometer => {
        const targetValue = parseInt(odometer.getAttribute('data-count'));
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        odometer.innerHTML = targetValue;
                    }, 500);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(odometer);
    });
    
    // Enhanced initiative box animations
    const initiativeBoxes = document.querySelectorAll('.initiative-box');
    initiativeBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            const icon = this.querySelector('figure');
            if (icon) {
                icon.style.transform = 'rotateY(180deg)';
                icon.style.backgroundColor = 'rgba(76, 175, 80, 0.2)';
            }
        });
        
        box.addEventListener('mouseleave', function() {
            const icon = this.querySelector('figure');
            if (icon) {
                icon.style.transform = 'rotateY(0)';
                icon.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
            }
        });
    });
    
    // Project box hover effects
    const projectBoxes = document.querySelectorAll('.project-box');
    projectBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            const heading = this.querySelector('.content h4');
            if (heading) {
                heading.style.transform = 'translateX(10px)';
            }
        });
        
        box.addEventListener('mouseleave', function() {
            const heading = this.querySelector('.content h4');
            if (heading) {
                heading.style.transform = 'translateX(0)';
            }
        });
    });
    
    // Certification box hover effects
    const certificationBoxes = document.querySelectorAll('.certification-box');
    certificationBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            const figure = this.querySelector('figure');
            if (figure) {
                figure.style.transform = 'scale(1.1)';
            }
        });
        
        box.addEventListener('mouseleave', function() {
            const figure = this.querySelector('figure');
            if (figure) {
                figure.style.transform = 'scale(1)';
            }
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Download button animation
    const downloadBtn = document.querySelector('.btn-download');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            // Prevent immediate navigation if we want to show animation first
            e.preventDefault();
            
            // Add a temporary class for animation
            this.classList.add('btn-downloading');
            
            // Icon animation
            const icon = this.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-spinner fa-spin';
            }
            
            // After animation completes, we can navigate or trigger download
            setTimeout(() => {
                // Reset the button
                this.classList.remove('btn-downloading');
                if (icon) {
                    icon.className = 'fas fa-download';
                }
                
                // Navigate to the actual download URL
                // window.location.href = this.getAttribute('href');
                
                // Or trigger a download notification
                alert('Sustainability Report downloaded successfully!');
            }, 1500);
        });
    }
    
    // Add parallax effect to the page header
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            pageHeader.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }
    
    // Add fade effects to sections when scrolling
    const sections = document.querySelectorAll('section');
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    sections.forEach(section => {
        if (!section.classList.contains('wow')) {
            section.classList.add('fade-in-section');
            fadeInObserver.observe(section);
        }
    });
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navbar .menu a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
});