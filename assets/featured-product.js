document.addEventListener('DOMContentLoaded', () => {
    const featuredSection = document.querySelector('.featured-product');
    if (!featuredSection) return;
  
    // Scroll observer for heading animations
    const observerOptions = {
      root: null,
      rootMargin: '-50px',
      threshold: 0.1
    };
  
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          scrollObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    const scrollElements = document.querySelectorAll('[data-scroll]');
    scrollElements.forEach(el => scrollObserver.observe(el));
  
    const productImage = featuredSection.querySelector('.featured-image');
    const productInfo = featuredSection.querySelector('.featured-info');
    const buyButton = featuredSection.querySelector('.featured-buy-button');
    const colorSwatches = featuredSection.querySelectorAll('.color-swatch');
  
    // Parallax effect on scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const rate = scrolled * 0.5;
          
          if (productImage) {
            productImage.style.transform = `translate3d(0, ${rate}px, 0) scale(${1 + scrolled * 0.0005})`;
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  
    // Magnetic button effect
    if (buyButton) {
      buyButton.addEventListener('mousemove', (e) => {
        const bounds = buyButton.getBoundingClientRect();
        const x = e.clientX - bounds.left - bounds.width / 2;
        const y = e.clientY - bounds.top - bounds.height / 2;
        
        buyButton.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });
  
      buyButton.addEventListener('mouseleave', () => {
        buyButton.style.transform = 'translate(0, 0)';
      });
    }
  
    // Color swatch interaction
    colorSwatches.forEach(swatch => {
      swatch.addEventListener('click', () => {
        const color = swatch.dataset.color;
        const imageUrl = swatch.dataset.image;
        
        // Update active state
        colorSwatches.forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
  
        // Animate image change
        if (productImage && imageUrl) {
          productImage.style.opacity = '0';
          setTimeout(() => {
            productImage.src = imageUrl;
            productImage.style.opacity = '1';
          }, 300);
        }
  
        // Update background gradient
        if (color) {
          featuredSection.style.background = `linear-gradient(45deg, ${color}15, ${color}05)`;
        }
      });
    });
  
    // Floating elements animation
    const elements = featuredSection.querySelectorAll('.float-animation');
    elements.forEach((el, index) => {
      el.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
    });
  
    // Product details reveal animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1 });
  
    const revealElements = featuredSection.querySelectorAll('.reveal-animation');
    revealElements.forEach(el => observer.observe(el));
  });
  