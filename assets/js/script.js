function imgLocalThenOnline(local, fallback, alt, prefix = "") {
  // Enhanced fallback system with multiple backup options
  const createIconSvg = (name) => {
    const firstLetter = name.charAt(0).toUpperCase();
    return `data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
        <rect width="40" height="40" rx="8" fill="#f7931a"/>
        <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial" font-size="18" font-weight="bold">${firstLetter}</text>
      </svg>
    `)}`;
  };
  
  const backupIcon = `https://img.icons8.com/fluency/48/${alt.toLowerCase().replace(/\s+/g, '-')}.png`;
  const letterIcon = createIconSvg(alt);
  
  if (local) {
    return `<img src="${prefix + local}" alt="${alt}" loading="lazy" 
            onerror="this.onerror=null; this.src='${fallback || backupIcon}'; 
            this.onerror = function() { this.src='${letterIcon}'; }">`;
  } else if (fallback) {
    return `<img src="${fallback}" alt="${alt}" loading="lazy" 
            onerror="this.onerror=null; this.src='${backupIcon}'; 
            this.onerror = function() { this.src='${letterIcon}'; }">`;
  } else {
    return `<img src="${letterIcon}" alt="${alt}" loading="lazy">`;
  }
}

function renderCertList(jsonFile, listId) {
  fetch(jsonFile)
    .then(r => r.json())
    .then(data => {
      const el = document.getElementById(listId);
      if (!el || !Array.isArray(data)) return;
      el.innerHTML = data.map(cert => {
        const listContent = `
          ${imgLocalThenOnline(cert.badgeLocal, cert.badgeWeb, cert.name, "./assets/Images/certs/")}
          <div>
            <strong>${cert.name}</strong><br>
            <span>${cert.issuer}</span>
            ${cert.link ? ` - <a href="${cert.link}" target="_blank">View Certificate</a>` : ''}
          </div>
        `;
        
        if (cert.link) {
          return `<li style="cursor: pointer;" onclick="window.open('${cert.link}', '_blank')">${listContent}</li>`;
        } else {
          return `<li>${listContent}</li>`;
        }
      }).join('');
    });
}

function renderList(jsonFile, listId, folder) {
  fetch(jsonFile)
    .then(r => r.json())
    .then(data => {
      const el = document.getElementById(listId);
      if (!el || !Array.isArray(data)) return;
      el.innerHTML = data.map(item => {
        const listContent = `
          ${imgLocalThenOnline(item.icon, item.iconWeb, item.name, `./assets/Images/${folder}/`)}
          <div>
            <strong>${item.name}</strong><br>
            <span>${item.description || ""}</span>
            ${item.link ? ` - <a href="${item.link}" target="_blank">Learn More</a>` : ''}
          </div>
        `;
        
        if (item.link) {
          return `<li style="cursor: pointer;" onclick="window.open('${item.link}', '_blank')">${listContent}</li>`;
        } else {
          return `<li>${listContent}</li>`;
        }
      }).join('');
    });
}

document.addEventListener('DOMContentLoaded', () => {
  renderCertList('./certificates.json', 'certificateList');
  renderList('./software.json', 'softwareList', "software");
  renderList('./tools.json', 'toolsList', "tools");
  
  // Active navigation based on scroll position
  const sections = document.querySelectorAll('.main-section');
  const navLinks = document.querySelectorAll('.navbar-link');
  
  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav(); // Set initial active state

  // Scroll buttons functionality
  const scrollTopBtn = document.getElementById('scrollTop');
  const scrollBottomBtn = document.getElementById('scrollBottom');
  
  if (scrollTopBtn && scrollBottomBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    scrollBottomBtn.addEventListener('click', () => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });
  }

  // Enhanced mobile swipe functionality - only for deliberate section navigation
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  let currentSectionIndex = 0;
  let isSwipeEnabled = window.innerWidth <= 1024;
  let touchStartTime = 0;
  let isScrolling = false;

  // Update swipe availability on resize
  window.addEventListener('resize', () => {
    isSwipeEnabled = window.innerWidth <= 1024;
  });

  function updateCurrentSection() {
    // Find which section is currently in view with better detection
    const scrollPos = window.scrollY + window.innerHeight * 0.3; // Use 30% of viewport for better detection
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const sectionBottom = sectionTop + rect.height;
      
      if (scrollPos >= sectionTop && scrollPos <= sectionBottom) {
        currentSectionIndex = index;
      }
    });
  }

  function handleSwipe() {
    if (!isSwipeEnabled || isScrolling) return;
    
    const swipeThreshold = 80; // Increased threshold to avoid accidental triggers
    const timeThreshold = 300; // Maximum time for a swipe gesture
    const deltaX = touchStartX - touchEndX;
    const deltaY = touchStartY - touchEndY;
    const swipeTime = Date.now() - touchStartTime;
    
    // Only trigger on quick, deliberate swipes
    if (swipeTime > timeThreshold) return;
    
    // Horizontal swipes for section navigation
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > swipeThreshold) {
      if (deltaX > 0) {
        // Swipe left - next section
        if (currentSectionIndex < sections.length - 1) {
          currentSectionIndex++;
          navigateToSection();
        }
      } else {
        // Swipe right - previous section
        if (currentSectionIndex > 0) {
          currentSectionIndex--;
          navigateToSection();
        }
      }
    }
    // For vertical swipes, allow natural scrolling unless it's a very deliberate gesture
    else if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > swipeThreshold * 1.5) {
      if (deltaY > 0) {
        // Strong swipe up - next section
        if (currentSectionIndex < sections.length - 1) {
          currentSectionIndex++;
          navigateToSection();
        }
      } else {
        // Strong swipe down - previous section
        if (currentSectionIndex > 0) {
          currentSectionIndex--;
          navigateToSection();
        }
      }
    }
  }
  
  function navigateToSection() {
    if (sections[currentSectionIndex]) {
      // Smoother navigation with better positioning
      const targetSection = sections[currentSectionIndex];
      const targetOffset = targetSection.offsetTop - 20; // Small offset for better visibility
      
      window.scrollTo({ 
        top: targetOffset,
        behavior: 'smooth'
      });
      
      // Enhanced visual feedback
      targetSection.style.transform = 'scale(1.02)';
      targetSection.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
      targetSection.style.boxShadow = '0 10px 30px rgba(247, 147, 26, 0.2)';
      
      setTimeout(() => {
        targetSection.style.transform = '';
        targetSection.style.boxShadow = '';
      }, 400);
    }
  }
  // Add touch events for mobile with improved detection
  if ('ontouchstart' in window) {
    document.addEventListener('touchstart', (e) => {
      if (!isSwipeEnabled) return;
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
      touchStartTime = Date.now();
      isScrolling = false;
      updateCurrentSection();
    });
    
    document.addEventListener('touchmove', (e) => {
      if (!isSwipeEnabled) return;
      // Detect if user is scrolling naturally
      const currentX = e.changedTouches[0].screenX;
      const currentY = e.changedTouches[0].screenY;
      const deltaX = Math.abs(currentX - touchStartX);
      const deltaY = Math.abs(currentY - touchStartY);
      
      // If user is scrolling more than swiping, mark as scrolling
      if (deltaY > deltaX && deltaY > 10) {
        isScrolling = true;
      }
    });
    
    document.addEventListener('touchend', (e) => {
      if (!isSwipeEnabled) return;
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    });
  }

  // Update current section on scroll with smooth transitions
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    updateCurrentSection();
    
    // Clear any existing timeout
    clearTimeout(scrollTimeout);
    
    // Add a subtle visual indicator when scrolling stops
    scrollTimeout = setTimeout(() => {
      const currentSection = sections[currentSectionIndex];
      if (currentSection) {
        currentSection.style.transition = 'transform 0.2s ease';
        currentSection.style.transform = 'scale(1.005)';
        setTimeout(() => {
          currentSection.style.transform = '';
        }, 200);
      }
    }, 150);
  });

  // Disable aggressive wheel scroll hijacking - allow natural scrolling
  // Only use scroll buttons for navigation
});
