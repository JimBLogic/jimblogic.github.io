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
        return `<li>
          ${imgLocalThenOnline(cert.badgeLocal, cert.badgeWeb, cert.name, "./assets/Images/certs/")}
          <div>
            <strong>${cert.name}</strong><br>
            <span>${cert.issuer}</span>
            ${cert.link ? ` - <a href="${cert.link}" target="_blank">View</a>` : ''}
          </div>
        </li>`;
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
        return `<li>
          ${imgLocalThenOnline(item.icon, item.iconWeb, item.name, `./assets/Images/${folder}/`)}
          <div>
            <strong>${item.name}</strong><br>
            <span>${item.description || ""}</span>
          </div>
        </li>`;
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

  // Enhanced mobile swipe functionality
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  let currentSectionIndex = 0;
  let isSwipeEnabled = window.innerWidth <= 1024; // Increased threshold for tablets

  // Update swipe availability on resize
  window.addEventListener('resize', () => {
    isSwipeEnabled = window.innerWidth <= 1024;
  });

  function updateCurrentSection() {
    // Find which section is currently in view
    const scrollPos = window.scrollY + window.innerHeight / 2;
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
    if (!isSwipeEnabled) return;
    
    const swipeThreshold = 50; // Reduced threshold for more responsive swipes
    const deltaX = touchStartX - touchEndX;
    const deltaY = touchStartY - touchEndY;
    
    // Determine swipe direction
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) > swipeThreshold) {
        if (deltaX > 0) {
          // Swipe left - next section
          if (currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
          }
        } else {
          // Swipe right - previous section
          if (currentSectionIndex > 0) {
            currentSectionIndex--;
          }
        }
        navigateToSection();
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) > swipeThreshold) {
        if (deltaY > 0) {
          // Swipe up - next section
          if (currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
          }
        } else {
          // Swipe down - previous section
          if (currentSectionIndex > 0) {
            currentSectionIndex--;
          }
        }
        navigateToSection();
      }
    }
  }
  
  function navigateToSection() {
    if (sections[currentSectionIndex]) {
      sections[currentSectionIndex].scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      
      // Add visual feedback
      const targetSection = sections[currentSectionIndex];
      targetSection.style.transform = 'scale(1.02)';
      targetSection.style.transition = 'transform 0.3s ease';
      setTimeout(() => {
        targetSection.style.transform = '';
      }, 300);
    }
  }
  // Add touch events for mobile
  if ('ontouchstart' in window) {
    document.addEventListener('touchstart', (e) => {
      if (!isSwipeEnabled) return;
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
      updateCurrentSection();
    });
    
    document.addEventListener('touchend', (e) => {
      if (!isSwipeEnabled) return;
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    });
  }

  // Update current section on scroll
  window.addEventListener('scroll', () => {
    updateCurrentSection();
  });
});
