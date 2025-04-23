(function($) {
    $(document).ready(function() {
        "use strict";
        
        // Check if Isotope is available
        console.log("Isotope available:", typeof $.fn.isotope !== 'undefined');
        console.log("imagesLoaded available:", typeof imagesLoaded !== 'undefined');
        
        // HOVER TOGGLE - Fixed selector for side navigation menu
        $('.side-navigation .menu ul li a').on('click', function () {
            $(this).next('ul').slideToggle(300);
            return true;
        });
        
        // CONTACT FORM INPUT LABEL
        function checkForInput(element) {
            const $label = $(element).siblings('span');
            if ($(element).val().length > 0) {
                $label.addClass('label-up');
            } else {
                $label.removeClass('label-up');
            }
        }

        $('input, textarea').each(function() {
            checkForInput(this);
        });

        $('input, textarea').on('change keyup', function() {
            checkForInput(this);  
        });
        
        // TOOLTIP
        if ($.fn.tooltip) {
            $('[data-toggle="tooltip"]').tooltip();
        }
        
        // PARALLAX - Added check if $.stellar exists
        if (typeof $.stellar !== 'undefined') {
            $.stellar({
                horizontalScrolling: false,
                verticalOffset: 0,
                responsive: true
            });
        }
        
        // DROPDOWN
        if ($.fn.dropdown) {
            $('.dropdown-toggle').dropdown();
        }
    
        $('.hamburger').on('click', function(e) {
            e.preventDefault(); // Prevent any default action
            console.log('Hamburger clicked'); // Debug to verify click is registered
            
            // Toggle classes
            $(this).toggleClass('open');
            $('body').toggleClass('overflow');
            $('.side-navigation').toggleClass('active');
            
            // Debug to verify classes are applied
            console.log('Hamburger has open class:', $(this).hasClass('open'));
            console.log('Side navigation has active class:', $('.side-navigation').hasClass('active'));
        });
    
        // DATA BACKGROUND IMAGE
        var pageSection = $("*");
        pageSection.each(function(indx){
            if ($(this).attr("data-background")){
                $(this).css("background-image", "url(" + $(this).data("background") + ")");
            }
        });
        
        // PAGE TRANSITION
        $('body a').on('click', function(e) {
            if (typeof $(this).data('fancybox') === 'undefined' && !$(this).hasClass('no-transition')) {
                e.preventDefault(); 	
                var url = this.getAttribute("href"); 
                if (url && url.indexOf('#') != -1) {
                    var hash = url.substring(url.indexOf('#'));
                    
                    if ($('body ' + hash).length != 0) {
                        $('.transition-overlay').removeClass("active");
                        $(".hamburger").removeClass("open");
                        $(".navigation-menu").removeClass("active");

                        $('html, body').animate({
                            scrollTop: $(hash).offset().top
                        }, 1300);
                    }
                }
                else if (url && url !== '#' && url !== 'javascript:void(0);') {
                    $('.transition-overlay').addClass("active");
                    setTimeout(function(){
                        window.location = url;
                    }, 1300); 
                }
            }
        });
        
        // COUNTER
        $(document).scroll(function(){
            $('.odometer').each(function () {
                var parent_section_postion = $(this).closest('section').position();
                var parent_section_top = parent_section_postion.top;
                if ($(document).scrollTop() > parent_section_top - 300) {
                    if ($(this).data('status') == 'yes') {
                        $(this).html($(this).data('count'));
                        $(this).data('status', 'no');
                    }
                }
            });
        });
        
        // Initialize Swiper sliders - Added proper initialization with delay
        function initSliders() {
            if (typeof Swiper !== 'undefined') {
                // GALLERY SLIDER
                var gallerySwiper = new Swiper('.gallery-container', {
                    slidesPerView: 'auto',
                    spaceBetween: 0,
                    loop: true,
                    autoplay: {
                        delay: 4500,
                        disableOnInteraction: false,
                    },
                    pagination: {
                        el: '.gallery-pagination',
                        clickable: true,
                    },
                });
                
                // MAIN SLIDER - Fixed initialization
                var mainSwiper = new Swiper('.slider-container', {
                    touchRatio: 0,
                    loop: true,
                    speed: 600,
                    autoplay: {
                        delay: 4500,
                        disableOnInteraction: false,
                    },
                    pagination: {
                        el: '.pagination',
                        type: 'fraction',
                    },
                    navigation: {
                        nextEl: '.button-next',
                        prevEl: '.button-prev',
                    },
                });
            }
        }
        
        // Delay slider initialization to ensure elements are fully loaded
        setTimeout(initSliders, 500);
        
        // Initialize WOW animation if available
        if (typeof WOW !== 'undefined') {
            var wow = new WOW({
                boxClass:     'wow',      // default
                animateClass: 'animated', // default
                offset:       100,        // default
                mobile:       true,       // default
                live:         true        // default
            });
            wow.init();
        }
        
        // ISOTOPE INITIALIZATION - USING FALLBACK METHOD IF IMAGESLOADED IS NOT AVAILABLE
        if (typeof $.fn.isotope !== 'undefined') {
            console.log('Initializing Isotope');
            
            // Function to initialize Isotope
            function initIsotope() {
                var $container = $('.gallery');
                
                try {
                    $container.isotope({
                        itemSelector: '.gallery li',
                        percentPosition: true,
                        layoutMode: 'masonry'
                    });
                    
                    // Isotope filter functionality
                    $('.gallery-filter li a').on('click', function() {
                        console.log('Filter clicked:', $(this).attr('data-filter'));
                        
                        $('.gallery-filter li a.current').removeClass('current');
                        $(this).addClass('current');
                        
                        var selector = $(this).attr('data-filter');
                        $container.isotope({
                            filter: selector,
                            animationOptions: {
                                duration: 750,
                                easing: 'linear',
                                queue: false
                            }
                        });
                        return false;
                    });
                    
                    console.log('Isotope initialized successfully');
                } catch (e) {
                    console.error('Error initializing Isotope:', e);
                }
            }
            
            // Use imagesLoaded if available, otherwise use a timeout
            if (typeof imagesLoaded !== 'undefined') {
                $('.gallery').imagesLoaded(function() {
                    console.log('Images loaded, initializing Isotope');
                    initIsotope();
                    
                    // Force layout recalculation
                    setTimeout(function() {
                        $('.gallery').isotope('layout');
                    }, 1000);
                });
            } else {
                console.log('imagesLoaded not available, using timeout');
                // Wait for images to load using a timeout instead
                setTimeout(function() {
                    initIsotope();
                    
                    // Additional layout refresh
                    setTimeout(function() {
                        $('.gallery').isotope('layout');
                    }, 1000);
                }, 1000);
            }
        } else {
            console.error('Isotope plugin is not loaded');
        }
        
        // Backup preloader removal (if window.load event fails)
        setTimeout(function() {
            if ($('.preloader').is(':visible')) {
                $("body").addClass("page-loaded");
                $('.preloader').fadeOut(500);
                $('.layer').fadeOut(500);
                $('.transition-overlay').removeClass("active");
            }
        }, 3500);
    });
    
    // WINDOW LOAD EVENT
    $(window).on('load', function() {
        console.log('Window loaded');
        
        // PRELOADER - PRIMARY METHOD TO REMOVE PRELOADER
        $("body").addClass("page-loaded");
        $('.preloader').fadeOut(500);
        $('.layer').fadeOut(500);
        
        // Re-initialize sliders after window load to ensure they work
        if (typeof Swiper !== 'undefined') {
            // MAIN SLIDER - Additional initialization on window load
            var mainSwiper = new Swiper('.slider-container', {
                touchRatio: 0,
                loop: true,
                speed: 600,
                autoplay: {
                    delay: 4500,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.pagination',
                    type: 'fraction',
                },
                navigation: {
                    nextEl: '.button-next',
                    prevEl: '.button-prev',
                },
            });
        }
        
        // Final Isotope layout refresh after window load
        if (typeof $.fn.isotope !== 'undefined') {
            setTimeout(function() {
                try {
                    $('.gallery').isotope('layout');
                    console.log('Isotope layout refreshed after window load');
                } catch(e) {
                    console.log('Could not refresh Isotope layout:', e);
                }
            }, 500);
        }
    });

    document.addEventListener('DOMContentLoaded', function() {
        const testimonials = [
          {
            quote: "Moving to Nashik was one of the most important decisions I've had to make in my life. Thankfully, Sankalp Landmark became a trusted ally and their home became a comfort haven. I'll recommend them to all my friends.",
            name: "Karan Shetty",
            designation: "Homeowner",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJktgxGN_T3zisMxJb0GazGPI5Wsme2LAIGw&s",
          },
          {
            quote: "In first glance, I was impressed by their property. It was close to nature, it had the most modern equipments and it was built to last a lifetime – all the check boxes were ticked. I didn't think twice before booking.",
            name: "Jatin Kumar",
            designation: "Property Investor",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJktgxGN_T3zisMxJb0GazGPI5Wsme2LAIGw&s",
          },
          {
            quote: "Sankalp Landmark not only helped us find our dream vacation home in Igatpuri but also assisted us in navigating the complexities of property ownership in India as non-residents. Their team went above and beyond to ensure a seamless experience.",
            name: "Manoj Patil",
            designation: "Satisfied Customer",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJktgxGN_T3zisMxJb0GazGPI5Wsme2LAIGw&s",
          },
          {
            quote: "As a first-time homebuyer, I was nervous about navigating the real estate market in Igatpuri. However, Sankalp Landmark' team of experts provided invaluable guidance and support every step of the way.",
            name: "Jitesh Deshpande",
            designation: "First-time Buyer",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJktgxGN_T3zisMxJb0GazGPI5Wsme2LAIGw&s",
          },
          {
            quote: "We were blown away by the level of personalized attention we received from Sankalp Landmark. Their team took the time to understand our unique preferences and requirements, ensuring that they presented us with options that perfectly matched our vision.",
            name: "Manisha Tayade",
            designation: "Family Homeowner",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL7VZrCB-KmQ8lpburT-mcYkQ2Tk3blBeM3w&s",
          },
          {
            quote: "Sankalp Landmark has a reputation for delivering on their promises, and our experience with them only solidified that reputation. Their proactive communication, swift responses to inquiries, and efficient handling of paperwork made the entire buying process a breeze.",
            name: "Lokesh Mhatre",
            designation: "Property Investor",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJktgxGN_T3zisMxJb0GazGPI5Wsme2LAIGw&s",
          },
        ];
      
        let activeIndex = 0;
        const imageContainer = document.getElementById('image-container');
        const nameElement = document.getElementById('name');
        const designationElement = document.getElementById('designation');
        const quoteElement = document.getElementById('quote');
        const prevButton = document.getElementById('prev-button');
        const nextButton = document.getElementById('next-button');
      
        function updateTestimonial(direction) {
          const oldIndex = activeIndex;
          activeIndex = (activeIndex + direction + testimonials.length) % testimonials.length;
      
          testimonials.forEach((testimonial, index) => {
            let img = imageContainer.querySelector(`[data-index="${index}"]`);
            if (!img) {
              img = document.createElement('img');
              img.src = testimonial.src;
              img.alt = testimonial.name;
              img.classList.add('testimonial-image');
              img.dataset.index = index;
              imageContainer.appendChild(img);
            }
      
            const offset = index - activeIndex;
            const absOffset = Math.abs(offset);
            const zIndex = testimonials.length - absOffset;
            const opacity = index === activeIndex ? 1 : 0.7;
            const scale = 1 - (absOffset * 0.15);
            const translateY = offset === -1 ? '-20%' : offset === 1 ? '20%' : '0%';
            const rotateY = offset === -1 ? '15deg' : offset === 1 ? '-15deg' : '0deg';
      
            img.style.zIndex = zIndex;
            img.style.opacity = opacity;
            img.style.transform = `translateY(${translateY}) scale(${scale}) rotateY(${rotateY})`;
          });
      
          nameElement.textContent = testimonials[activeIndex].name;
          designationElement.textContent = testimonials[activeIndex].designation;
          quoteElement.innerHTML = testimonials[activeIndex].quote.split(' ').map(word => `<span class="word">${word}</span>`).join(' ');
      
          animateWords();
        }
      
        function animateWords() {
          const words = quoteElement.querySelectorAll('.word');
          words.forEach((word, index) => {
            word.style.opacity = '0';
            word.style.transform = 'translateY(10px)';
            word.style.filter = 'blur(10px)';
            setTimeout(() => {
              word.style.transition = 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out, filter 0.2s ease-in-out';
              word.style.opacity = '1';
              word.style.transform = 'translateY(0)';
              word.style.filter = 'blur(0)';
            }, index * 20);
          });
        }
      
        function handleNext() {
          updateTestimonial(1);
        }
      
        function handlePrev() {
          updateTestimonial(-1);
        }
      
        if (prevButton && nextButton) {
          prevButton.addEventListener('click', handlePrev);
          nextButton.addEventListener('click', handleNext);
      
          // Initial setup
          updateTestimonial(0);
      
          // Autoplay functionality
          const autoplayInterval = setInterval(handleNext, 7000);
      
          // Stop autoplay on user interaction
          [prevButton, nextButton].forEach(button => {
            button.addEventListener('click', () => {
              clearInterval(autoplayInterval);
            });
          });
        }
      });
    
})(jQuery);