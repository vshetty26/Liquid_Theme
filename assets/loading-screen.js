class LoadingScreen {
  constructor() {
    this.loadingScreen = document.querySelector('.loading-screen');
    this.init();
  }

  init() {
    // Create loading screen if it doesn't exist
    if (!this.loadingScreen) {
      this.createLoadingScreen();
    }
    
    // Hide loading screen when page is fully loaded
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.hideLoadingScreen();
      }, 1500); // Show for at least 1.5 seconds
    });

    // Show loading screen when navigating away
    window.addEventListener('beforeunload', () => {
      this.showLoadingScreen();
    });
  }

  createLoadingScreen() {
    // Create loading screen element
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    
    // Create dumbbell container
    const dumbbellContainer = document.createElement('div');
    dumbbellContainer.className = 'dumbbell-container';
    
    // Create dumbbell bar
    const dumbbellBar = document.createElement('div');
    dumbbellBar.className = 'dumbbell-bar';
    
    // Create dumbbell weights
    const leftWeight = document.createElement('div');
    leftWeight.className = 'dumbbell-weight left';
    
    const rightWeight = document.createElement('div');
    rightWeight.className = 'dumbbell-weight right';
    
    // Create loading text
    const loadingText = document.createElement('div');
    loadingText.className = 'loading-text';
    loadingText.textContent = 'LOADING';
    
    // Assemble dumbbell
    dumbbellContainer.appendChild(leftWeight);
    dumbbellContainer.appendChild(dumbbellBar);
    dumbbellContainer.appendChild(rightWeight);
    
    // Assemble loading screen
    loadingScreen.appendChild(dumbbellContainer);
    loadingScreen.appendChild(loadingText);
    
    // Add to document
    document.body.appendChild(loadingScreen);
    
    // Store reference
    this.loadingScreen = loadingScreen;
  }

  hideLoadingScreen() {
    if (this.loadingScreen) {
      this.loadingScreen.classList.add('hidden');
      
      // Remove from DOM after transition
      setTimeout(() => {
        if (this.loadingScreen && this.loadingScreen.parentNode) {
          this.loadingScreen.parentNode.removeChild(this.loadingScreen);
        }
      }, 500);
    }
  }

  showLoadingScreen() {
    if (this.loadingScreen) {
      this.loadingScreen.classList.remove('hidden');
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new LoadingScreen();
}); 