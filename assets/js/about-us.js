document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
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
  const statNumbers = document.querySelectorAll('.stat-number');
  
  statNumbers.forEach(function(stat) {
    const targetValue = parseInt(stat.getAttribute('data-value'));
    
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
  
  // Enhanced hover effects for mission boxes
  const missionBoxes = document.querySelectorAll('.mission-box');
  missionBoxes.forEach(box => {
    box.addEventListener('mouseenter', function() {
      const figure = this.querySelector('figure');
      if (figure) {
        figure.style.transform = 'translateY(-10px)';
      }
    });
    
    box.addEventListener('mouseleave', function() {
      const figure = this.querySelector('figure');
      if (figure) {
        figure.style.transform = 'translateY(0)';
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