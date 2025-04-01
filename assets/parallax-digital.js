// Parallax scrolling effect for Digital Meets Fashion section
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.parallax-digital-section');
    const aboutSection = document.querySelector('.about-section');
    
    if (sections.length === 0) return;
    
    // Create custom cursor
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    // Variables for smooth cursor movement
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    // Track mouse movement for custom cursor with smoothing
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Check if hovering over text elements
      const isOverText = e.target.closest('.large-text') || e.target.closest('.small-text');
      if (isOverText) {
        cursor.classList.add('hover');
      } else {
        cursor.classList.remove('hover');
      }
    });
    
    // Smooth cursor animation
    function animateCursor() {
      // Calculate smooth movement with easing
      const easeFactor = 0.15;
      cursorX += (mouseX - cursorX) * easeFactor;
      cursorY += (mouseY - cursorY) * easeFactor;
      
      // Apply position with sub-pixel accuracy
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      
      requestAnimationFrame(animateCursor);
    }
    
    // Start cursor animation
    animateCursor();
    
    // Hide cursor when mouse leaves the window
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
    });
    
    // Show cursor when mouse enters the window
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
    });
    
    // Add cursor pulse effect on click
    document.addEventListener('mousedown', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    sections.forEach(section => {
      const whereText = section.querySelector('.where-text');
      const digitalText = section.querySelector('.digital-text');
      const meetsText = section.querySelector('.meets-text');
      const fashionText = section.querySelector('.fashion-text');
      const imageContainer = section.querySelector('.center-image-container');
      
      // Find the next section to determine boundaries
      const nextSection = section.nextElementSibling;
      
      // Set initial positions
      updateParallax();
      
      // Update on scroll
      window.addEventListener('scroll', updateParallax, { passive: true });
      
      // Update on resize
      window.addEventListener('resize', updateParallax, { passive: true });
      
      function updateParallax() {
        const scrollPosition = window.pageYOffset;
        const sectionTop = section.getBoundingClientRect().top + scrollPosition;
        const sectionHeight = section.offsetHeight;
        const viewportHeight = window.innerHeight;
        
        // Calculate scroll progress (0 to 1) within the section
        const scrollStart = sectionTop;
        const scrollEnd = sectionTop + sectionHeight - viewportHeight;
        const scrollRange = scrollEnd - scrollStart;
        const scrollProgress = Math.max(0, Math.min(1, (scrollPosition - scrollStart) / scrollRange));
        
        // Check if we're at the end of the section
        const isAtEndOfSection = scrollPosition >= scrollEnd;
        
        // Check if we've scrolled past this section
        const isPastSection = nextSection && nextSection.getBoundingClientRect().top <= 0;
        
        // Check if about section is visible
        const isAboutSectionVisible = aboutSection && aboutSection.getBoundingClientRect().top <= viewportHeight;
        
        // Move text based on scroll position with enhanced effects
        if (whereText) {
          // WHERE text moves up and out as you scroll - faster for compact layout
          const translateY = -scrollProgress * viewportHeight * 1.0; // Reduced movement
          whereText.style.transform = `translateY(${translateY}px)`;
          whereText.style.opacity = 1 - scrollProgress * 1.8; // Fade out faster
        }
        
        if (digitalText) {
          // DIGITAL text - enhanced effect to match reference image
          // It should be prominently visible in the middle of the scroll
          
          // Calculate a different progress value for DIGITAL that peaks in the middle
          const digitalProgress = Math.sin(scrollProgress * Math.PI); // Creates a 0->1->0 curve
          
          // Calculate position based on scroll - less movement for more stability
          const translateY = (scrollProgress - 0.5) * viewportHeight * 0.3; // Reduced movement
          
          // Apply transforms
          digitalText.style.transform = `translateY(${translateY}px)`;
          
          // Adjust opacity to be highest in the middle of the scroll
          digitalText.style.opacity = Math.min(1, digitalProgress * 1.5);
        }
        
        if (meetsText) {
          // MEETS text starts below and moves up - adjusted for compact layout
          const startPosition = viewportHeight * 0.4; // Reduced starting position
          const translateY = startPosition - scrollProgress * viewportHeight * 0.9; // Reduced movement
          meetsText.style.transform = `translateY(${translateY}px)`;
          meetsText.style.opacity = Math.min(1, scrollProgress * 2 - 0.1); // Appear earlier
        }
        
        if (fashionText) {
          // FASHION text starts further below and moves up - adjusted for compact layout
          const startPosition = viewportHeight * 0.6; // Reduced starting position
          const translateY = startPosition - scrollProgress * viewportHeight * 1.0; // Reduced movement
          fashionText.style.transform = `translateY(${translateY}px)`;
          fashionText.style.opacity = Math.min(1, scrollProgress * 2 - 0.3); // Appear earlier
        }
        
        // Adjust image position to ensure it's visible with FASHION text at the end
        if (imageContainer) {
          // If about section is visible, hide the image completely
          if (isAboutSectionVisible) {
            imageContainer.style.opacity = '0';
            imageContainer.style.visibility = 'hidden';
          }
          // If we're past this section or at the end, fix the image in its final position
          else if (isPastSection || isAtEndOfSection) {
            // Set final position for the image when section ends
            const finalTranslateY = viewportHeight * 0.25; // Final position
            imageContainer.style.transform = `translate(-50%, calc(-50% + ${finalTranslateY}px))`;
            imageContainer.style.opacity = 0.85;
            imageContainer.style.visibility = 'visible';
            
            // If we're past the section, hide the image
            if (isPastSection) {
              imageContainer.style.opacity = '0';
              imageContainer.style.visibility = 'hidden';
            }
          } else {
            // Normal parallax behavior within the section
            imageContainer.style.visibility = 'visible';
            
            // Calculate a modified progress that slows down at the end
            const imageProgress = Math.pow(scrollProgress, 0.7); // Adjusted easing for compact layout
            
            // Limit the maximum movement to keep image visible at the end
            const maxMovement = viewportHeight * 0.25; // Further reduced for compact layout
            const translateY = imageProgress * maxMovement;
            
            // Apply the transform - move up slightly at beginning, then slow down
            imageContainer.style.transform = `translate(-50%, calc(-50% + ${translateY}px))`;
            
            // Adjust opacity to ensure image is visible at the end
            const targetOpacity = scrollProgress > 0.8 ? 0.85 : 1; // Keep more visible at the end
            imageContainer.style.opacity = targetOpacity;
          }
        }
      }
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