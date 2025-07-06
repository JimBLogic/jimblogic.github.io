function imgLocalThenOnline(local, fallback, alt, prefix = "") {
  const defaultImg = "https://via.placeholder.com/40x40?text=Icon";
  if (local) {
    return `<img src="${prefix + local}" alt="${alt}" loading="lazy" onerror="this.onerror=null; this.src='${fallback || defaultImg}';">`;
  } else if (fallback) {
    return `<img src="${fallback}" alt="${alt}" loading="lazy" onerror="this.onerror=null; this.src='${defaultImg}';">`;
  } else {
    return `<img src="${defaultImg}" alt="${alt}" loading="lazy">`;
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

  // Mobile swipe functionality
  let touchStartY = 0;
  let touchEndY = 0;
  let currentSectionIndex = 0;
  let isSwipeEnabled = window.innerWidth <= 768;

  // Update swipe availability on resize
  window.addEventListener('resize', () => {
    isSwipeEnabled = window.innerWidth <= 768;
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
    
    const swipeThreshold = 80;
    const swipeDistance = touchStartY - touchEndY;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0 && currentSectionIndex < sections.length - 1) {
        // Swipe up - next section
        currentSectionIndex++;
      } else if (swipeDistance < 0 && currentSectionIndex > 0) {
        // Swipe down - previous section
        currentSectionIndex--;
      }
      
      if (sections[currentSectionIndex]) {
        sections[currentSectionIndex].scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
        
        // Add visual feedback
        const targetSection = sections[currentSectionIndex];
        targetSection.style.transform = 'scale(1.02)';
        setTimeout(() => {
          targetSection.style.transform = '';
        }, 300);
      }
    }
  }

  // Add touch events for mobile
  if ('ontouchstart' in window) {
    document.addEventListener('touchstart', (e) => {
      if (!isSwipeEnabled) return;
      touchStartY = e.changedTouches[0].screenY;
      updateCurrentSection();
    });
    
    document.addEventListener('touchend', (e) => {
      if (!isSwipeEnabled) return;
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    });
  }

  // Update current section on scroll
  window.addEventListener('scroll', () => {
    updateCurrentSection();
  });
});
