document.addEventListener('DOMContentLoaded', function() {
    const slideshow = {
      slides: document.querySelectorAll('.slide'),
      currentSlide: 0,
      progressBar: document.querySelector('.progress-bar'),
      interval: 6000, // 6 seconds per slide
      timer: null,
      progress: 0,
      isTransitioning: false,
      
      init() {
        if (this.slides.length === 0) return;
        
        // Show first slide
        this.showSlide(0);
        
        // Start slideshow if there are multiple slides
        if (this.slides.length > 1) {
          this.start();
          this.startProgressBar();
        }
      },
      
      showSlide(index) {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        
        // Remove active class from all slides
        this.slides.forEach(slide => slide.classList.remove('active'));
        
        // Add active class to target slide
        this.slides[index].classList.add('active');
        
        // Reset progress
        this.progress = 0;
        this.progressBar.style.width = '0%';
        
        // Allow next transition after current one completes
        setTimeout(() => {
          this.isTransitioning = false;
        }, 1000);
      },
      
      start() {
        this.timer = setInterval(() => {
          this.next();
        }, this.interval);
      },
      
      next() {
        if (this.isTransitioning) return;
        
        // Calculate next slide index
        const nextSlide = (this.currentSlide + 1) % this.slides.length;
        
        // Show next slide
        this.showSlide(nextSlide);
        
        // Update current slide
        this.currentSlide = nextSlide;
      },
      
      startProgressBar() {
        const updateProgress = () => {
          if (!this.isTransitioning) {
            this.progress += (100 / this.interval) * 16.67; // 60fps update
            if (this.progress >= 100) {
              this.progress = 0;
            }
            this.progressBar.style.width = `${this.progress}%`;
          }
          requestAnimationFrame(updateProgress);
        };
        
        requestAnimationFrame(updateProgress);
      }
    };
    
    // Initialize slideshow
    slideshow.init();
  }); 