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

// Helper to access translations (defined in translate.js)
function t(key) {
  if (typeof window !== 'undefined' && window.translations) {
    const lang = (document.documentElement.getAttribute('lang') || 'en').toLowerCase();
    return (window.translations[lang] && window.translations[lang][key]) || 
           (window.translations.en && window.translations.en[key]) || key;
  }
  return key;
}

let CERT_DATA = [];
let CURRENT_FILTER = 'ALL'; // Store current filter selection

function renderCertList(jsonFile, listId) {
  fetch(jsonFile)
    .then(r => r.json())
    .then(data => {
      if (!Array.isArray(data)) return;
      CERT_DATA = data;
      buildCertFilters();
      renderCertListFiltered(listId, CURRENT_FILTER);
      renderLearningJourney('journeyGrid');
    });
}

function renderCertListFiltered(listId, issuer) {
  const el = document.getElementById(listId);
  if (!el) return;
  CURRENT_FILTER = issuer; // Remember current filter
  const items = CERT_DATA.filter(c => issuer === 'ALL' ? true : (c.issuer || '').toLowerCase() === issuer.toLowerCase());
  el.innerHTML = items.map(cert => {
    const listContent = `
      ${imgLocalThenOnline(cert.badgeLocal, cert.badgeWeb, cert.name, "./assets/Images/certs/")}
      <div>
        <strong>${cert.name}</strong><br>
        <span>${cert.issuer || ''}</span>
        ${cert.link ? ` - <a href="${cert.link}" target="_blank" rel="noopener">${t('view_certificate')}</a>` : ''}
      </div>
    `;
    return cert.link
      ? `<li style="cursor: pointer;" onclick="window.open('${cert.link}', '_blank')">${listContent}</li>`
      : `<li>${listContent}</li>`;
  }).join('');
  // Re-run collapsible initialization in case this injected content created long sections
  try {
    if (window.reinitCollapsibles) setTimeout(window.reinitCollapsibles, 50);
  } catch (e) { /* ignore */ }
}

function buildCertFilters() {
  const filterEl = document.getElementById('certFilters');
  if (!filterEl || !Array.isArray(CERT_DATA)) return;
  const issuers = Array.from(new Set(CERT_DATA.map(c => c.issuer).filter(Boolean)));
  const shortNames = { 'Mossé Cyber Security Institute': 'MCSI' };
  const order = ['ALL', 'Security Blue Team', 'Cybrary', 'AWS', 'IBM', 'Mossé Cyber Security Institute', 'UpgradeHub'];
  const btns = order.filter(x => x === 'ALL' || issuers.includes(x)).map(key => {
    const label = key === 'ALL' ? t('filter_all') : (shortNames[key] || key);
    return `<button class="filter-btn" data-filter="${key}">${label}</button>`;
  }).join('');
  filterEl.innerHTML = btns;
  // Avoid stacking multiple listeners on rebuilds
  filterEl.onclick = (e) => {
    const btn = e.target.closest('button[data-filter]');
    if (!btn) return;
    filterEl.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderCertListFiltered('certificateList', btn.dataset.filter);
  };
  // Restore current filter selection
  const activeBtn = filterEl.querySelector(`button[data-filter="${CURRENT_FILTER}"]`) || filterEl.querySelector('button');
  if (activeBtn) activeBtn.classList.add('active');
}

function renderLearningJourney(gridId) {
  const el = document.getElementById(gridId);
  if (!el) return;
  // Count by issuer
  const countBy = CERT_DATA.reduce((acc, c) => {
    const k = (c.issuer || 'Other');
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});

  const providers = [
    {
      key: 'Security Blue Team',
      name: 'Security Blue Team',
      imgLocal: './assets/Images/Profilepicandother/blueteam.png',
      link: 'https://github.com/JimBLogic/Security-Blue-Team-Learning-Journey-Certificates'
    },
    {
      key: 'Cybrary',
      name: 'Cybrary',
      imgLocal: './assets/Images/Profilepicandother/cybrary.jpg',
      link: 'https://github.com/JimBLogic/Cybrary-IT-Cybersecurity-Certificates-and-Labs'
    },
    {
      key: 'AWS',
      name: 'AWS',
      imgWeb: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazonaws.svg',
      link: 'https://github.com/JimBLogic/AWS-IBM-Skills-Build-KCCS-Moss-Cibersecurity-Institute'
    },
    {
      key: 'IBM',
      name: 'IBM',
      imgLocal: './assets/Images/Profilepicandother/ibm.jpg',
      link: 'https://github.com/JimBLogic/AWS-IBM-Skills-Build-KCCS-Moss-Cibersecurity-Institute'
    },
    {
      key: 'Mossé Cyber Security Institute',
      name: 'MCSI',
      imgWeb: 'https://img.icons8.com/fluency/48/security-checked.png',
      link: 'https://www.mosse-institute.com/knowledge-tests/kccs-knowledge-of-cybersecurity-skills.html'
    },
    {
      key: 'UpgradeHub',
      name: 'UpgradeHub',
      imgLocal: './UpgradeHub/upgradehubcert.png',
      link: './assets/pdfs/UpgradeHub/UpgradeHub Cert.pdf'
    },
    {
      key: 'TryHackMe · HackTheBox',
      name: 'TryHackMe · HackTheBox',
      imgLocal: './assets/Images/Profilepicandother/tryhackmehackthebox.jpg',
      link: 'https://github.com/JimBLogic/TryHackme-HackTheBox',
      manualCount: true
    }
  ];

  el.innerHTML = providers.map(p => {
    const count = p.manualCount ? '' : (countBy[p.key] || 0);
    const img = imgLocalThenOnline(p.imgLocal || '', p.imgWeb || '', p.name);
    return `
      <div class="journey-card" onclick="window.open('${p.link}', '_blank')">
        <div class="journey-thumb">${img}</div>
        <div class="journey-meta">
          <div class="journey-title">${p.name}</div>
          <div class="journey-count">${count !== '' ? `${count} ${t('certificates')}` : ''}</div>
          <div><a href="${p.link}" target="_blank" rel="noopener">${t('open')}</a></div>
        </div>
      </div>
    `;
  }).join('');
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
            ${item.link ? ` - <a href="${item.link}" target="_blank">${t('learn_more')}</a>` : ''}
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
  renderGitHubProjects('JimBLogic', 'projectsList');
  renderProfileHighlights('profileHighlights', 'JimBLogic');
  
  // Projects expand/collapse toggle
  const projectsToggle = document.getElementById('projectsToggle');
  if (projectsToggle) {
    projectsToggle.addEventListener('click', () => {
      PROJECTS_EXPANDED = !PROJECTS_EXPANDED;
      renderProjectsView('projectsList');
    });
  }
  
  // Active navigation based on scroll position
  const sections = document.querySelectorAll('.main-section');
  const navLinks = document.querySelectorAll('.navbar-link');
  const navbarList = document.querySelector('.navbar-list');
  let lastActiveId = '';
  // Disable automatic nav scrolling on small screens to avoid fighting touch scroll
  const isMobileView = () => window.matchMedia('(max-width: 700px)').matches;
  
  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    if (!current) return;

    // Only react when active section changed
    if (current !== lastActiveId) {
      lastActiveId = current;

      navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${current}`;
        link.classList.toggle('active', isActive);
      });

      // Smart-scroll the nav list so active stays visible — but NOT on mobile
      if (!isMobileView()) {
        const activeLink = Array.from(navLinks).find(l => l.classList.contains('active'));
        if (navbarList && activeLink) {
          const ids = Array.from(sections, s => s.id);
          const idx = ids.indexOf(current);

          // When near top sections, show the top of the list so avatar is visible
          if (idx <= 1) {
            navbarList.scrollTo({ top: 0, behavior: 'smooth' });
          // When near last sections, bias to bottom
          } else if (idx >= ids.length - 2) {
            navbarList.scrollTo({ top: navbarList.scrollHeight, behavior: 'smooth' });
          } else {
            // Otherwise keep it near the active item without big jumps
            activeLink.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
          }
        }
      }
    }
  }
  
  // Use passive event listener for better scroll performance
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav(); // Set initial active state

  // Scroll to top button - show/hide based on scroll position
  const scrollTopBtn = document.getElementById('scrollTop');
  
  if (scrollTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }, { passive: true });
    
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

// Fetch concise highlights from GitHub profile README
function renderProfileHighlights(containerId, username) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const url = `https://raw.githubusercontent.com/${encodeURIComponent(username)}/${encodeURIComponent(username)}/main/README.md`;
  fetch(url)
    .then(r => r.ok ? r.text() : '')
    .then(md => {
      if (!md) return;
      const lines = md.split(/\r?\n/).filter(l => l.trim().length);
      const top = lines.slice(0, 5).join(' ');
      el.innerHTML = `<div class="highlights-box"><strong>${t('profile_highlights')}</strong><p>${escapeHtml(top).slice(0, 500)}...</p><a href="https://github.com/${username}" target="_blank" rel="noopener">${t('view_github_profile')}</a></div>`;
    })
    .catch(() => {});
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

// Render one repository list item
function repoToListItem(repo) {
  const htmlUrl = repo.html_url;
  const name = repo.name || 'Repository';
  const desc = repo.description || '';
  const lang = repo.language || '';
  const stars = repo.stargazers_count || 0;
  const topics = Array.isArray(repo.topics) ? repo.topics.slice(0, 6) : [];
  const avatar = (repo.owner && repo.owner.avatar_url) ? repo.owner.avatar_url : '';

  const infoBadges = [
    lang ? `<span class="badge badge-lang">${lang}</span>` : '',
    `<span class="badge badge-star">⭐ ${stars}</span>`
  ].filter(Boolean).join(' ');

  const topicsHtml = topics.length
    ? `<div class="topics">${topics.map(t => `<span class="topic">${t}</span>`).join('')}</div>`
    : '';

  const listContent = `
    ${imgLocalThenOnline('', avatar, name)}
    <div>
      <strong>${name}</strong><br>
      <span>${desc}</span>
      <div class="badges">${infoBadges}</div>
      ${topicsHtml}
      ${htmlUrl ? ` - <a href="${htmlUrl}" target="_blank" rel="noopener">${t('view_repo')}</a>` : ''}
    </div>
  `;

  return htmlUrl
    ? `<li style="cursor:pointer" onclick="window.open('${htmlUrl}', '_blank')">${listContent}</li>`
    : `<li>${listContent}</li>`;
}

// Fetch and render GitHub repositories (non-forks) for a user
function renderGitHubProjects(username, listId) {
  const el = document.getElementById(listId);
  if (!el) return;

  // Simple session cache for 1 hour
  const cacheKey = `gh_repos_${username}`;
  const cacheTSKey = `${cacheKey}_ts`;
  const now = Date.now();
  try {
    const cached = sessionStorage.getItem(cacheKey);
    const ts = Number(sessionStorage.getItem(cacheTSKey) || 0);
    if (cached && (now - ts) < 60 * 60 * 1000) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed)) {
        PROJECTS_CACHE.repos = parsed;
        PROJECTS_CACHE.latest = parsed.slice().sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))[0] || null;
      } else if (parsed && typeof parsed === 'object') {
        PROJECTS_CACHE.repos = Array.isArray(parsed.repos) ? parsed.repos : [];
        PROJECTS_CACHE.latest = parsed.latest || null;
      }
      renderProjectsView(listId);
      // Do not return; still fetch fresh to ensure latest repo reflects full list
    }
  } catch (e) { /* ignore cache errors */ }

  const url = `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`;
  fetch(url, { headers: { 'Accept': 'application/vnd.github+json' } })
    .then(r => r.json())
    .then(list => {
      if (!Array.isArray(list)) return;
      // Filter only original repos (non-forks)
      const nonFork = list.filter(r => r && r.fork === false);
      // Compute latest updated repo from the full non-fork list
      const latestUpdated = nonFork.slice().sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))[0] || null;
      // Build display list (top by stars, then updated), limit to 12
      const repos = nonFork
        // Optional exclusion of meta repos:
        // .filter(r => !['JimBLogic', 'jimblogic.github.io'].includes((r.name || '').toLowerCase()))
        .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0) || new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 12);

      PROJECTS_CACHE.repos = repos;
      PROJECTS_CACHE.latest = latestUpdated;
      renderProjectsView(listId);
      try {
        sessionStorage.setItem(cacheKey, JSON.stringify({ repos, latest: latestUpdated }));
        sessionStorage.setItem(cacheTSKey, String(now));
      } catch (e) { /* ignore storage errors */ }
    })
    .catch(() => {
      el.innerHTML = `<li><div><strong>GitHub</strong><br><span>${t('github_error')}</span></div></li>`;
    });
}

// State and renderer for projects expand/collapse
let PROJECTS_EXPANDED = false;
const PROJECTS_CACHE = { repos: [], latest: null };

function renderProjectsView(listId) {
  const el = document.getElementById(listId);
  if (!el) return;
  const toggleBtn = document.getElementById('projectsToggle');

  // Decide which items to render
  if (!PROJECTS_EXPANDED) {
    const item = PROJECTS_CACHE.latest || PROJECTS_CACHE.repos[0] || null;
    el.innerHTML = item ? repoToListItem(item) : '';
  } else {
    el.innerHTML = (PROJECTS_CACHE.repos || []).map(repoToListItem).join('');
  }

  // Update toggle button label and visibility
  if (toggleBtn) {
    const key = PROJECTS_EXPANDED ? 'projects_collapse' : 'projects_expand';
    toggleBtn.setAttribute('data-txt', key);
    toggleBtn.textContent = t(key);
    toggleBtn.style.display = (PROJECTS_CACHE.latest || (PROJECTS_CACHE.repos && PROJECTS_CACHE.repos.length)) ? 'inline-block' : 'none';
  }
}

// Language change hook (called from translate.js) to re-render dynamic, language-dependent UI
window.onLanguageChanged = function(lang) {
  try {
    if (Array.isArray(CERT_DATA) && CERT_DATA.length) {
      buildCertFilters();
      renderCertListFiltered('certificateList', CURRENT_FILTER); // Restore current filter
      renderLearningJourney('journeyGrid');
    }
    // Re-render other dynamic sections to update labels
    renderList('./software.json', 'softwareList', "software");
    renderList('./tools.json', 'toolsList', "tools");
    // Preserve projects expanded/collapsed state and just refresh view text
    renderProjectsView('projectsList');
    renderProfileHighlights('profileHighlights', 'JimBLogic');
  } catch (e) { /* no-op */ }
};

// Collapsible sections initializer
(function() {
  const COLLAPSE_THRESHOLD = 520; // px

  function wrapSectionBody(sec) {
    let body = sec.querySelector('.section-body');
    const title = sec.querySelector('.section-title');
    if (!body) {
      body = document.createElement('div');
      body.className = 'section-body';

      // Move nodes that are not the title into the body
      const nodes = [];
      Array.from(sec.children).forEach(child => {
        if (child === title) return;
        if (child.classList && child.classList.contains('section-toggle')) return;
        nodes.push(child);
      });
      nodes.forEach(n => body.appendChild(n));

      if (title && title.nextSibling) {
        title.parentNode.insertBefore(body, title.nextSibling);
      } else {
        sec.appendChild(body);
      }
    }
    return body;
  }

  function createToggle(sec, body, fullHeight) {
    // Don't create if already present
    if (sec.querySelector('.section-toggle')) return;

    const btn = document.createElement('button');
    btn.className = 'section-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = 'Show more';

    const fade = document.createElement('div');
    fade.className = 'section-fade';

    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        // collapse
        btn.setAttribute('aria-expanded', 'false');
        btn.textContent = 'Show more';
        body.style.maxHeight = `${Math.min(COLLAPSE_THRESHOLD, fullHeight)}px`;
        sec.classList.remove('expanded');
        fade.style.display = '';
      } else {
        // expand
        btn.setAttribute('aria-expanded', 'true');
        btn.textContent = 'Show less';
        body.style.maxHeight = `${fullHeight}px`;
        sec.classList.add('expanded');
        fade.style.display = 'none';
      }
      // smooth scroll to keep the section header visible when expanding
      setTimeout(() => {
        sec.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 200);
    });

    sec.appendChild(fade);
    sec.appendChild(btn);
  }

  window.reinitCollapsibles = function() {
    const sections = document.querySelectorAll('.main-section');
    sections.forEach(sec => {
      const body = wrapSectionBody(sec);
      if (!body) return;
      // Allow layout to settle
      const fullHeight = body.scrollHeight;
      if (fullHeight > COLLAPSE_THRESHOLD) {
        sec.classList.add('collapsible');
        // Set initial collapsed max-height if not expanded
        if (!sec.classList.contains('expanded')) {
          body.style.maxHeight = `${Math.min(COLLAPSE_THRESHOLD, fullHeight)}px`;
        }
        body.style.overflow = 'hidden';
        body.style.transition = 'max-height 350ms ease';
        createToggle(sec, body, fullHeight);
      }
    });
  };

  // Auto-run on initial load if DOM is ready
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => { try { window.reinitCollapsibles(); } catch (e) {} }, 50);
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => { try { window.reinitCollapsibles(); } catch (e) {} }, 50);
    });
  }

})();
