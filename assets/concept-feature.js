document.addEventListener('DOMContentLoaded', function() {
    // Get the concept section element
    const conceptSection = document.querySelector('.concept-feature-section');
    if (!conceptSection) return;
  
    // Get the concept link from data attribute
    const conceptLink = conceptSection.dataset.conceptLink;
    
    // Select elements for parallax effect
    const bigTextConc = document.querySelector('.concept-big-text');
    const bigTextEpt = document.querySelector('.concept-big-text-second');
    const headingContainer = document.querySelector('.concept-heading-container');
    const textContainer = document.querySelector('.concept-text-container');
    const exploreCircle = document.querySelector('.concept-explore-circle');
    const imageContainer = document.querySelector('.concept-image-container');
    const cursor = document.querySelector('.concept-cursor');
    
    // Variables for cursor animation
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let circleX = 0;
    let circleY = 0;
    
    // Handle custom cursor
    if (cursor && imageContainer) {
      // Show/hide cursor based on mouse position
      imageContainer.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        exploreCircle.style.opacity = '1';
      });
      
      imageContainer.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        exploreCircle.style.opacity = '0';
      });
      
      // Smooth cursor animation
      function updateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.3;
        cursorY += dy * 0.3;
        
        const dxCircle = mouseX - circleX;
        const dyCircle = mouseY - circleY;
        
        circleX += dxCircle * 0.15;
        circleY += dyCircle * 0.15;
        
        if (cursor.classList.contains('active')) {
          cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%) scale(1)`;
          exploreCircle.style.transform = `translate3d(${circleX}px, ${circleY}px, 0) translate(-50%, -50%)`;
        }
        
        requestAnimationFrame(updateCursor);
      }
      
      // Update mouse position
      imageContainer.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });
      
      // Handle click animation
      imageContainer.addEventListener('mousedown', () => {
        cursor.classList.add('clicking');
        if (conceptLink) {
          setTimeout(() => {
            window.location.href = conceptLink;
          }, 300);
        }
      });
      
      document.addEventListener('mouseup', () => {
        cursor.classList.remove('clicking');
      });
      
      // Start cursor animation
      updateCursor();
    }
    
    // Handle scroll effect
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset || document.documentElement.scrollTop;
          const sectionRect = conceptSection.getBoundingClientRect();
          const progress = Math.max(0, Math.min(1, -sectionRect.top / (sectionRect.height - window.innerHeight)));
          
          if (sectionRect.top < window.innerHeight && sectionRect.bottom > 0) {
            // Parallax effect for big text
            if (bigTextConc) {
              bigTextConc.style.transform = `translateY(${progress * -200}px)`;
              bigTextConc.style.opacity = Math.max(0.03, 0.1 - progress * 0.07);
            }
            
            if (bigTextEpt) {
              bigTextEpt.style.transform = `translateY(${progress * -150}px)`;
              bigTextEpt.style.opacity = Math.max(0.03, 0.1 - progress * 0.07);
            }
            
            // Parallax effect for content
            if (headingContainer) {
              headingContainer.style.transform = `translateY(${progress * -100}px)`;
              headingContainer.style.opacity = 1 - progress * 0.5;
            }
            
            if (textContainer) {
              textContainer.style.transform = `translateY(${progress * -80}px)`;
              textContainer.style.opacity = 1 - progress * 0.5;
            }
          }
          
          ticking = false;
        });
        
        ticking = true;
      }
    });
    
    // Apply initial scroll effect
    window.dispatchEvent(new Event('scroll'));
  }); 