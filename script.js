// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if Swiper is available
    if (typeof Swiper !== 'undefined') {
        // Initialize Swiper with comprehensive options
        var swiper = new Swiper('.news-slider', {
            // Core Swiper Configuration
            effect: 'coverflow',
            grabCursor: true,
            loop: true,
            centeredSlides: true,
            keyboard: true,
            
            // Responsive Settings
            spaceBetween: 0,
            slidesPerView: 'auto',
            speed: 300,
            
            // Coverflow Effect
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 0,
                modifier: 3,
                slideShadows: false
            },
            
            // Breakpoints
            breakpoints: {
                480: {
                    spaceBetween: 0,
                    centeredSlides: true
                }
            },
            
            // Navigation
            navigation: {
                nextEl: '.news-slider-next',
                prevEl: '.news-slider-prev'
            },
            
            // Pagination
            pagination: {
                el: '.news-slider__pagination',
                clickable: true
            },
            
            // Lifecycle Hooks
            on: {
                init: function () {
                    // Add active class to initial slide
                    var activeItem = document.querySelector('.swiper-slide-active .news__item');
                    if (activeItem) {
                        activeItem.classList.add('active');
                    }
                },
                
                // Handle slide changes
                slideChange: function () {
                    // Remove active class from all items
                    document.querySelectorAll('.news__item').forEach(function(item) {
                        item.classList.remove('active');
                    });
                    
                    // Add active class to current slide
                    var currentActiveItem = document.querySelector('.swiper-slide-active .news__item');
                    if (currentActiveItem) {
                        currentActiveItem.classList.add('active');
                    }
                }
            }
        });
    } else {
        console.error('Swiper library not loaded');
    }

    // Desktop Hover Effect (for screens > 800px)
    if (window.innerWidth > 800) {
        var bg = document.querySelector('.item-bg');
        
        document.querySelectorAll('.news__item').forEach(function(item) {
            item.addEventListener('mouseover', function() {
                // Get bounding rectangle
                var rect = this.getBoundingClientRect();
                
                // Update background
                bg.classList.add('active');
                bg.style.width = rect.width + 'px';
                bg.style.height = rect.height + 'px';
                bg.style.transform = `translateX(${rect.left}px) translateY(${rect.top}px)`;
                
                // Remove active from other items
                document.querySelectorAll('.news__item').forEach(function(otherItem) {
                    otherItem.classList.remove('active');
                });
                
                // Add active to current item
                this.classList.add('active');
            });
            
            item.addEventListener('mouseleave', function() {
                bg.classList.remove('active');
                this.classList.remove('active');
            });
        });
    }

    // Responsive Handling
    window.addEventListener('resize', function() {
        // Reinitialize or adjust slider if needed
        if (swiper) {
            swiper.update();
        }
    });
});

// Utility Function for Logging
function cLog(content) {
    console.log(content);
}

