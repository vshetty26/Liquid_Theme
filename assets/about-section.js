// About section animations and interactions
document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.querySelector('.about-section');
    
    if (!aboutSection) return;
    
    // Read More/Less functionality
    const readMoreBtn = document.getElementById('read-more-btn');
    const readLessBtn = document.getElementById('read-less-btn');
    const hiddenContent = document.getElementById('hidden-content');
    const aboutHeader = document.querySelector('.about-header');
    
    if (readMoreBtn && readLessBtn && hiddenContent && aboutHeader) {
      // Smooth reveal animation
      readMoreBtn.addEventListener('click', () => {
        aboutHeader.classList.add('expanded');
        
        // Add entrance animation for paragraphs
        const paragraphs = hiddenContent.querySelectorAll('.description-text');
        paragraphs.forEach((p, index) => {
          p.style.opacity = '0';
          p.style.transform = 'translateY(20px)';
          p.style.transition = `opacity 0.5s ease ${0.1 + index * 0.1}s, transform 0.5s ease ${0.1 + index * 0.1}s`;
          
          setTimeout(() => {
            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';
          }, 50);
        });
        
        // Smooth scroll to see the expanded content
        setTimeout(() => {
          window.scrollBy({
            top: 100,
            behavior: 'smooth'
          });
        }, 100);
      });
      
      readLessBtn.addEventListener('click', () => {
        // Fade out paragraphs first
        const paragraphs = hiddenContent.querySelectorAll('.description-text');
        paragraphs.forEach((p) => {
          p.style.opacity = '0';
          p.style.transform = 'translateY(10px)';
        });
        
        // Then collapse the container
        setTimeout(() => {
          aboutHeader.classList.remove('expanded');
        }, 300);
      });
    }
    
    // Enhanced custom cursor for about section
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
      // Make cursor larger when entering the about section
      aboutSection.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        
        // Apply about section cursor styles
        setTimeout(() => {
          cursor.style.width = '20px';
          cursor.style.height = '20px';
          cursor.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.6)';
        }, 50);
      });
      
      // Reset cursor when leaving the about section
      aboutSection.addEventListener('mouseleave', () => {
        cursor.style.width = '';
        cursor.style.height = '';
        cursor.style.boxShadow = '';
      });
      
      // Handle hover states for read more button with enhanced cursor
      const readMoreBtns = aboutSection.querySelectorAll('.read-more-btn');
      
      readMoreBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
          // Apply special button hover class for larger cursor
          cursor.classList.add('button-hover');
          
          // Add subtle button animation
          btn.style.transform = 'translateY(-3px)';
        });
        
        btn.addEventListener('mouseleave', () => {
          // Remove special button hover class
          cursor.classList.remove('button-hover');
          
          // Reset button position
          btn.style.transform = 'translateY(0)';
        });
        
        // Add pulse effect on button hover
        btn.addEventListener('mousemove', () => {
          // Subtle pulse animation for cursor
          cursor.animate([
            { transform: 'translate(-50%, -50%) scale(1)' },
            { transform: 'translate(-50%, -50%) scale(1.05)' },
            { transform: 'translate(-50%, -50%) scale(1)' }
          ], {
            duration: 1000,
            iterations: Infinity
          });
        });
      });
      
      // Add subtle parallax effect to the dot indicator
      const dotIndicator = aboutSection.querySelector('.dot-indicator');
      if (dotIndicator) {
        window.addEventListener('mousemove', (e) => {
          const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
          const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
          
          dotIndicator.style.transform = `translate(${moveX}px, ${moveY}px)`;
          dotIndicator.style.transition = 'transform 0.3s ease-out';
        });
      }
    }
    
    // Reveal animation on scroll
    const revealOnScroll = () => {
      const headerText = aboutSection.querySelector('.header-text');
      const dotIndicator = aboutSection.querySelector('.dot-indicator');
      
      if (headerText && dotIndicator) {
        const sectionTop = aboutSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
          // Animate in elements
          dotIndicator.style.transform = 'scale(1)';
          dotIndicator.style.opacity = '1';
          
          headerText.style.transform = 'translateY(0)';
          headerText.style.opacity = '1';
        }
      }
    };
    
    // Set initial state for scroll reveal
    const headerText = aboutSection.querySelector('.header-text');
    const dotIndicator = aboutSection.querySelector('.dot-indicator');
    
    if (headerText && dotIndicator) {
      headerText.style.transform = 'translateY(20px)';
      headerText.style.opacity = '0';
      headerText.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
      
      dotIndicator.style.transform = 'scale(0.5)';
      dotIndicator.style.opacity = '0';
      dotIndicator.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
    }
    
    // Check on load and scroll
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);
  }); 