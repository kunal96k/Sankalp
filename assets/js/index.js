 // JavaScript for navigation functionality
 document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.linksUl li a');
    const activeLine = document.querySelector('.activeLine');
    const projectsMenu = document.getElementById('projectsMenu');
    const burgerMenu = document.querySelector('.burgerMenu');
    const linksDiv = document.querySelector('.linksDiv');
    const overlay = document.getElementById('menuOverlay');
    const closeButtons = document.querySelectorAll('.closeMenu');
    const innerMenus = document.querySelectorAll('.innerMenu');
    
    // Position the active line under the current menu item
    function positionActiveLine(menuItem) {
        const rect = menuItem.getBoundingClientRect();
        const parentRect = menuItem.parentElement.parentElement.getBoundingClientRect();
        activeLine.style.width = rect.width + 'px';
        activeLine.style.left = (rect.left - parentRect.left) + 'px';
    }
    
    // Initialize active line position
    if (menuItems.length > 0) {
        positionActiveLine(menuItems[0]);
    }
    
    // Handle hover on menu items
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            positionActiveLine(this);
        });
    });
    
    // Return active line to default position when leaving the menu
    document.querySelector('.linksUl').addEventListener('mouseleave', function() {
        if (menuItems.length > 0) {
            positionActiveLine(menuItems[0]);
        }
    });
    
    // Close all dropdowns
    function closeAllDropdowns() {
        innerMenus.forEach(menu => {
            menu.classList.remove('active');
        });
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Toggle dropdown menus with smooth animation
    innerMenus.forEach(menu => {
        const menuLink = menu.querySelector('a');
        
        menuLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = menu.classList.contains('active');
            
            // Close all dropdowns first
            closeAllDropdowns();
            
            // If this menu wasn't active, open it
            if (!isActive) {
                menu.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
            }
        });
    });
    
    // Close dropdowns when clicking on overlay
    overlay.addEventListener('click', closeAllDropdowns);
    
    // Close buttons in dropdowns
    closeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            closeAllDropdowns();
        });
    });
    
    // Toggle mobile menu
    if (burgerMenu) {
        burgerMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            linksDiv.classList.toggle('active');
            
            if (linksDiv.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
                closeAllDropdowns();
            }
        });
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.innerMenu') && !event.target.closest('.innerMenuDiv')) {
            closeAllDropdowns();
        }
    });

    // Handle search functionality
    const searchInputs = document.querySelectorAll('.searchDiv input');
    searchInputs.forEach(input => {
        input.addEventListener('focus', function() {
            const searchBtn = this.parentElement.querySelector('.searchBtn');
            const closedBtn = this.parentElement.querySelector('.closedBtn');
            if (searchBtn && closedBtn) {
                searchBtn.style.display = 'none';
                closedBtn.style.display = 'block';
            }
        });
        
        input.addEventListener('blur', function() {
            setTimeout(() => {
                const searchBtn = this.parentElement.querySelector('.searchBtn');
                const closedBtn = this.parentElement.querySelector('.closedBtn');
                if (searchBtn && closedBtn && this.value === '') {
                    searchBtn.style.display = 'block';
                    closedBtn.style.display = 'none';
                }
            }, 200);
        });
        
        // Clear input and return to search icon when close button is clicked
        const closedBtn = input.parentElement.querySelector('.closedBtn');
        if (closedBtn) {
            closedBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                input.value = '';
                input.focus();
                this.style.display = 'none';
                const searchBtn = input.parentElement.querySelector('.searchBtn');
                if (searchBtn) {
                    searchBtn.style.display = 'block';
                }
            });
        }
    });
    
    // Ensure the active class is removed when window is resized above mobile breakpoint
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            burgerMenu?.classList.remove('active');
            linksDiv?.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});