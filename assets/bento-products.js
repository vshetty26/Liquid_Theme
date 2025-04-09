class BentoProducts {
  constructor() {
    this.carousels = document.querySelectorAll('.bento-image-carousel');
    this.init();
  }

  init() {
    this.carousels.forEach(carousel => {
      this.setupCarousel(carousel);
    });
  }

  setupCarousel(carousel) {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.dot');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    
    if (slides.length <= 1) return;
    
    let currentSlide = 0;
    let interval;
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Show a specific slide with animation
    const showSlide = (index) => {
      // Add transition class for animation
      slides.forEach(slide => {
        slide.classList.add('transitioning');
        slide.classList.remove('active');
      });
      
      dots.forEach(dot => dot.classList.remove('active'));
      
      // Set active slide
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      
      // Remove transition class after animation completes
      setTimeout(() => {
        slides.forEach(slide => slide.classList.remove('transitioning'));
      }, 500);
    };
    
    // Go to next slide
    const nextSlide = () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    };
    
    // Go to previous slide
    const prevSlide = () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    };
    
    // Set up click events for dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
        this.resetInterval(interval, nextSlide);
      });
    });
    
    // Set up navigation buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        prevSlide();
        this.resetInterval(interval, nextSlide);
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        nextSlide();
        this.resetInterval(interval, nextSlide);
      });
    }
    
    // Touch events for swipe
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
    
    const handleSwipe = () => {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - next slide
          nextSlide();
        } else {
          // Swipe right - previous slide
          prevSlide();
        }
        this.resetInterval(interval, nextSlide);
      }
    };
    
    // Keyboard navigation
    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        this.resetInterval(interval, nextSlide);
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        this.resetInterval(interval, nextSlide);
      }
    });
    
    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
      clearInterval(interval);
    });
    
    carousel.addEventListener('mouseleave', () => {
      interval = setInterval(nextSlide, 5000);
    });
    
    // Start auto-rotation
    interval = setInterval(nextSlide, 5000);
  }
  
  resetInterval(interval, callback) {
    clearInterval(interval);
    interval = setInterval(callback, 5000);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new BentoProducts();
}); 