document.addEventListener('DOMContentLoaded', function() {
    // Get all menu items with submenus
    const menuItems = document.querySelectorAll('.menu li');
    
    // Add hover functionality for desktop
    menuItems.forEach(item => {
        const submenu = item.querySelector('ul');
        if (submenu) {
            // Show submenu on hover for desktop
            item.addEventListener('mouseenter', () => {
                if (window.innerWidth > 768) {
                    submenu.style.display = 'block';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                if (window.innerWidth > 768) {
                    submenu.style.display = 'none';
                }
            });
            
            // Toggle submenu on click for mobile
            item.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
                }
            });
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const submenus = document.querySelectorAll('.menu ul ul');
        if (window.innerWidth > 768) {
            submenus.forEach(submenu => {
                submenu.style.display = 'none';
            });
        }
    });
    
    // Handle mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    
    if (hamburger && menu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            menu.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.menu') && !e.target.closest('.hamburger')) {
            if (menu && menu.classList.contains('active')) {
                menu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
}); 