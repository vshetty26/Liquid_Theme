// Collection slider with horizontal drag functionality
document.addEventListener('DOMContentLoaded', () => {
    const sliderSection = document.querySelector('.collection-slider-section');
    
    if (!sliderSection) return;
    
    const sliderContainer = sliderSection.querySelector('.collection-slider-container');
    const slides = sliderSection.querySelectorAll('.collection-slide');
    const totalSlides = slides.length;
    const slideWidth = window.innerWidth;
    const progressDots = sliderSection.querySelectorAll('.progress-dot');
    const aboutSection = document.querySelector('.about-section');
    
    // Current slide tracking
    let currentSlide = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let dragThreshold = 100; // Minimum drag distance to change slide
    let containerTransform = 0;
    let isTransitioning = false;
    
    // Create custom drag cursor
    const dragCursor = document.createElement('div');
    dragCursor.classList.add('drag-cursor');
    dragCursor.innerHTML = '<span class="drag-cursor-text">Drag</span>';
    document.body.appendChild(dragCursor);
    
    // Variables for smooth cursor movement
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    // Update slide number display
    const updateSlideNumber = () => {
      const numberElements = document.querySelectorAll('.collection-number-value');
      numberElements.forEach(element => {
        element.textContent = `${currentSlide + 1}`;
      });
      
      // Update progress dots
      progressDots.forEach((dot, index) => {
        if (index === currentSlide) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    };
    
    // Initialize slide numbers
    updateSlideNumber();
    
    // Track mouse movement for custom cursor with smoothing
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Check if mouse is over the slider section
      const rect = sliderSection.getBoundingClientRect();
      const isOverSlider = (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      );
      
      if (isOverSlider) {
        dragCursor.classList.remove('hidden');
      } else {
        dragCursor.classList.add('hidden');
      }
    });
    
    // Smooth cursor animation
    function animateCursor() {
      // Calculate smooth movement with easing
      const easeFactor = 0.15;
      cursorX += (mouseX - cursorX) * easeFactor;
      cursorY += (mouseY - cursorY) * easeFactor;
      
      // Apply position with sub-pixel accuracy
      dragCursor.style.left = `${cursorX}px`;
      dragCursor.style.top = `${cursorY}px`;
      
      requestAnimationFrame(animateCursor);
    }
    
    // Start cursor animation
    animateCursor();
    
    // Hide cursor when mouse leaves the window
    document.addEventListener('mouseleave', () => {
      dragCursor.classList.add('hidden');
    });
    
    // Show cursor when mouse enters the window
    document.addEventListener('mouseenter', () => {
      dragCursor.classList.remove('hidden');
    });
    
    // Drag start event
    sliderSection.addEventListener('mousedown', (e) => {
      if (isTransitioning) return;
      
      isDragging = true;
      startX = e.clientX;
      currentX = e.clientX;
      
      // Disable transition during drag
      sliderContainer.style.transition = 'none';
      
      // Activate drag cursor
      dragCursor.classList.add('active');
      
      // Prevent default behavior
      e.preventDefault();
    });
    
    // Touch start event for mobile
    sliderSection.addEventListener('touchstart', (e) => {
      if (isTransitioning) return;
      
      isDragging = true;
      startX = e.touches[0].clientX;
      currentX = e.touches[0].clientX;
      
      // Disable transition during drag
      sliderContainer.style.transition = 'none';
      
      // Prevent default behavior
      e.preventDefault();
    }, { passive: false });
    
    // Drag move event
    document.addEventListener('mousemove', (e) => {
      if (!isDragging || isTransitioning) return;
      
      currentX = e.clientX;
      const diffX = currentX - startX;
      
      // Calculate new transform position
      const newTransform = containerTransform + diffX;
      
      // Apply transform with boundaries
      sliderContainer.style.transform = `translateX(${newTransform}px)`;
    });
    
    // Touch move event for mobile
    document.addEventListener('touchmove', (e) => {
      if (!isDragging || isTransitioning) return;
      
      currentX = e.touches[0].clientX;
      const diffX = currentX - startX;
      
      // Calculate new transform position
      const newTransform = containerTransform + diffX;
      
      // Apply transform with boundaries
      sliderContainer.style.transform = `translateX(${newTransform}px)`;
    }, { passive: false });
    
    // Check if we're at the last slide and about to transition to the about section
    const checkSectionTransition = () => {
      if (currentSlide === totalSlides - 1 && aboutSection) {
        // We're at the last slide and about section exists
        const sliderRect = sliderSection.getBoundingClientRect();
        const aboutRect = aboutSection.getBoundingClientRect();
        
        // If about section is close to viewport
        if (aboutRect.top < window.innerHeight * 1.5) {
          // Add a class to the slider section for smooth transition
          sliderSection.classList.add('transitioning-out');
          isTransitioning = true;
          
          // Keep the last image visible but fade it out gradually
          const lastSlideImage = slides[totalSlides - 1].querySelector('.collection-image-container');
          if (lastSlideImage) {
            lastSlideImage.style.opacity = '1';
            lastSlideImage.style.transition = 'opacity 0.8s ease-out';
          }
          
          // After transition is complete, reset state
          setTimeout(() => {
            isTransitioning = false;
            sliderSection.classList.remove('transitioning-out');
          }, 1000);
        }
      }
    };
    
    // Drag end event
    document.addEventListener('mouseup', () => {
      if (!isDragging || isTransitioning) return;
      
      // Re-enable transition
      sliderContainer.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
      
      // Calculate drag distance
      const diffX = currentX - startX;
      
      // Determine if we should change slide
      if (Math.abs(diffX) > dragThreshold) {
        if (diffX > 0 && currentSlide > 0) {
          // Dragged right, go to previous slide
          currentSlide--;
        } else if (diffX < 0 && currentSlide < totalSlides - 1) {
          // Dragged left, go to next slide
          currentSlide++;
        }
      }
      
      // Update container position
      containerTransform = -currentSlide * slideWidth;
      sliderContainer.style.transform = `translateX(${containerTransform}px)`;
      
      // Update slide number
      updateSlideNumber();
      
      // Check for section transition
      checkSectionTransition();
      
      // Reset drag state
      isDragging = false;
      
      // Deactivate drag cursor
      dragCursor.classList.remove('active');
    });
    
    // Touch end event for mobile
    document.addEventListener('touchend', () => {
      if (!isDragging || isTransitioning) return;
      
      // Re-enable transition
      sliderContainer.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
      
      // Calculate drag distance
      const diffX = currentX - startX;
      
      // Determine if we should change slide
      if (Math.abs(diffX) > dragThreshold) {
        if (diffX > 0 && currentSlide > 0) {
          // Dragged right, go to previous slide
          currentSlide--;
        } else if (diffX < 0 && currentSlide < totalSlides - 1) {
          // Dragged left, go to next slide
          currentSlide++;
        }
      }
      
      // Update container position
      containerTransform = -currentSlide * slideWidth;
      sliderContainer.style.transform = `translateX(${containerTransform}px)`;
      
      // Update slide number
      updateSlideNumber();
      
      // Check for section transition
      checkSectionTransition();
      
      // Reset drag state
      isDragging = false;
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
      // Update slide width
      const newSlideWidth = window.innerWidth;
      
      // Update container position
      containerTransform = -currentSlide * newSlideWidth;
      sliderContainer.style.transform = `translateX(${containerTransform}px)`;
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (isTransitioning) return;
      
      if (e.key === 'ArrowLeft' && currentSlide > 0) {
        currentSlide--;
        containerTransform = -currentSlide * slideWidth;
        sliderContainer.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        sliderContainer.style.transform = `translateX(${containerTransform}px)`;
        updateSlideNumber();
      } else if (e.key === 'ArrowRight' && currentSlide < totalSlides - 1) {
        currentSlide++;
        containerTransform = -currentSlide * slideWidth;
        sliderContainer.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        sliderContainer.style.transform = `translateX(${containerTransform}px)`;
        updateSlideNumber();
        
        // Check for section transition
        checkSectionTransition();
      }
    });
    
    // Click on progress dots to navigate
    progressDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        if (isTransitioning) return;
        
        currentSlide = index;
        containerTransform = -currentSlide * slideWidth;
        sliderContainer.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        sliderContainer.style.transform = `translateX(${containerTransform}px)`;
        updateSlideNumber();
        
        // Check for section transition
        checkSectionTransition();
      });
    });
    
    // Handle scroll events to check for section transitions
    window.addEventListener('scroll', () => {
      if (currentSlide === totalSlides - 1) {
        checkSectionTransition();
      }
    });

    // Auto-advance slides every 5 seconds if not dragging
    let autoAdvanceInterval = setInterval(() => {
      if (!isDragging) {
        const nextSlide = (currentSlide + 1) % totalSlides;
        currentSlide = nextSlide;
        containerTransform = -currentSlide * slideWidth;
        sliderContainer.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        sliderContainer.style.transform = `translateX(${containerTransform}px)`;
        updateSlideNumber();
        
        // Check for section transition
        checkSectionTransition();
      }
    }, 5000);

    // Clear interval when user interacts with slider
    sliderSection.addEventListener('mouseenter', () => {
      clearInterval(autoAdvanceInterval);
    });

    // Resume auto-advance when user leaves slider
    sliderSection.addEventListener('mouseleave', () => {
      autoAdvanceInterval = setInterval(() => {
        if (!isDragging) {
          const nextSlide = (currentSlide + 1) % totalSlides;
          currentSlide = nextSlide;
          containerTransform = -currentSlide * slideWidth;
          sliderContainer.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
          sliderContainer.style.transform = `translateX(${containerTransform}px)`;
          updateSlideNumber();
          
          // Check for section transition
          checkSectionTransition();
        }
      }, 5000);
    });

    // Initialize first slide
    slides[0].classList.add('active');
    progressDots[0].classList.add('active');
  }); 