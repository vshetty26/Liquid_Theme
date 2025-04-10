// Parallax scrolling effect for Digital Meets Fashion section
document.addEventListener('DOMContentLoaded', function() {
    const section = document.querySelector('.parallax-digital-section');
    const container = document.querySelector('.parallax-container');
    const imageContainer = document.querySelector('.center-image-container');
    const whereText = document.querySelector('.where-text');
    const fashionText = document.querySelector('.fashion-text');
    const meetsText = document.querySelector('.meets-text');
    const fitnessText = document.querySelector('.digital-text');

    let lastScrollTop = 0;
    const textElements = [whereText, fashionText, meetsText, fitnessText];
    const totalHeight = section.offsetHeight;
    const viewportHeight = window.innerHeight;

    function updateParallax() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const sectionRect = section.getBoundingClientRect();
        const progress = -sectionRect.top / (totalHeight - viewportHeight);

        // Only process if section is in view
        if (sectionRect.top <= 0 && sectionRect.bottom >= 0) {
            // Show image when scrolling starts
            if (progress > 0) {
                imageContainer.style.opacity = '1';
            }

            // Calculate positions for text elements
            textElements.forEach((element, index) => {
                const startPoint = index * 0.2; // Reduced from 0.25 to 0.2 for tighter spacing
                const endPoint = startPoint + 0.15; // Reduced duration from 0.25 to 0.15
                
                if (progress >= startPoint && progress <= endPoint) {
                    // Move text up during its active period
                    const elementProgress = (progress - startPoint) / (endPoint - startPoint);
                    const translateY = (1 - elementProgress) * 100;
                    const scale = 1 + (1 - elementProgress) * 0.1; // Subtle scale effect
                    element.style.transform = `translateY(${translateY}vh) scale(${scale})`;
                    element.style.opacity = 1;
                } else if (progress < startPoint) {
                    // Text waiting to enter
                    element.style.transform = 'translateY(100vh) scale(1.1)';
                    element.style.opacity = 0;
                } else if (progress > endPoint) {
                    // Text has exited
                    const exitProgress = Math.min(1, (progress - endPoint) / 0.1);
                    const translateY = -100 * exitProgress;
                    const scale = 1 - exitProgress * 0.1;
                    element.style.transform = `translateY(${translateY}vh) scale(${scale})`;
                    element.style.opacity = Math.max(0, 1 - exitProgress * 2);
                }
            });

            // Fade image in/out with smooth transition
            if (progress < 0.1) {
                // Fade in at start
                imageContainer.style.opacity = (progress / 0.1).toString();
            } else if (progress > 0.8) {
                // Fade out at end
                imageContainer.style.opacity = (1 - (progress - 0.8) / 0.2).toString();
            } else {
                // Full opacity in middle
                imageContainer.style.opacity = '1';
            }
        }

        lastScrollTop = scrollTop;
    }

    // Initial update
    updateParallax();

    // Update on scroll with debounce for smoother performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Update on resize with debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateParallax();
        }, 100);
    });
  });
  
  // Re-initialize when Shopify section is reloaded in the theme editor
  if (typeof Shopify !== 'undefined' && Shopify.designMode) {
    document.addEventListener('shopify:section:load', (event) => {
      const section = event.target.querySelector('.parallax-digital-section');
      if (section) {
        const textRows = section.querySelectorAll('.text-row');
        const imageContainer = section.querySelector('.center-image-container');
        
        // Reset any inline styles
        textRows.forEach(row => {
          row.style.transform = '';
          row.style.opacity = '';
        });
        
        if (imageContainer) {
          imageContainer.style.transform = 'translate(-50%, -50%)';
          imageContainer.style.opacity = '1';
          imageContainer.style.visibility = 'visible';
        }
        
        // Force recalculation
        window.dispatchEvent(new Event('scroll'));
      }
    });
  } 