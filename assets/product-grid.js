document.addEventListener('DOMContentLoaded', () => {
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach(card => {
    const slides = card.querySelector('.product-slides');
    const prevBtn = card.querySelector('.prev-slide');
    const nextBtn = card.querySelector('.next-slide');
    const dots = card.querySelectorAll('.dot');
    let currentSlide = 0;
    const totalSlides = dots.length;

    // Initialize first dot as active
    dots[0].classList.add('active');

    function updateSlidePosition() {
      slides.style.transform = `translateX(-${currentSlide * 100}%)`;
      
      // Update dots
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
      });
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlidePosition();
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlidePosition();
    }

    // Event listeners for navigation buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        prevSlide();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextSlide();
      });
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        currentSlide = index;
        updateSlidePosition();
      });
    });

    // Touch events for swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;

    slides.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, false);

    slides.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, false);

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }

    // Auto-advance slides (optional)
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause auto-advance on hover
    card.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });

    card.addEventListener('mouseleave', () => {
      slideInterval = setInterval(nextSlide, 5000);
    });
  });
}); 