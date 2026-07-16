const SCROLL_TOP_LABELS = {
  en: 'Scroll to top',
  es: 'Volver arriba',
  ca: 'Tornar a dalt'
};

const COMPACT_AT = 360;
const EXPAND_BELOW = 180;
const SHOW_SCROLL_TOP_AT = 500;
const DESKTOP_QUERY = '(min-width: 1025px)';

function currentLanguage() {
  const language = (document.documentElement.lang || 'en').toLowerCase();
  return Object.hasOwn(SCROLL_TOP_LABELS, language) ? language : 'en';
}

function setInteractiveState(container, hidden) {
  if (!container) return;

  container.setAttribute('aria-hidden', hidden ? 'true' : 'false');
  if ('inert' in container) container.inert = hidden;

  container.querySelectorAll('a, button, input, select, textarea, [tabindex]').forEach(element => {
    if (hidden) {
      if (!element.hasAttribute('data-ux-original-tabindex')) {
        element.setAttribute(
          'data-ux-original-tabindex',
          element.hasAttribute('tabindex') ? element.getAttribute('tabindex') : '__none__'
        );
      }
      element.setAttribute('tabindex', '-1');
      return;
    }

    const original = element.getAttribute('data-ux-original-tabindex');
    if (original === '__none__') element.removeAttribute('tabindex');
    else if (original !== null) element.setAttribute('tabindex', original);
    element.removeAttribute('data-ux-original-tabindex');
  });
}

function initializeSiteUx() {
  if (document.documentElement.dataset.siteUx === 'ready') return;
  document.documentElement.dataset.siteUx = 'ready';

  const body = document.body;
  const desktopMedia = window.matchMedia(DESKTOP_QUERY);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const scrollingElement = () => document.scrollingElement || document.documentElement;

  const originalNavList = document.querySelector('.navbar-list');
  const navList = originalNavList ? originalNavList.cloneNode(true) : null;
  if (originalNavList && navList) originalNavList.replaceWith(navList);

  const navLinks = navList ? Array.from(navList.querySelectorAll('.navbar-link[href^="#"]')) : [];
  const sections = navLinks
    .map(link => document.getElementById(link.getAttribute('href')?.slice(1) || ''))
    .filter(Boolean);

  const originalScrollButton = document.getElementById('scrollTop');
  const scrollButton = originalScrollButton ? originalScrollButton.cloneNode(false) : null;

  if (originalScrollButton && scrollButton) {
    originalScrollButton.replaceWith(scrollButton);
    scrollButton.type = 'button';
    scrollButton.innerHTML = `
      <svg class="scroll-btn-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24">
        <path d="M6 14.5 12 8l6 6.5"></path>
        <path d="M12 8v10"></path>
      </svg>
    `;
  }

  const avatar = document.querySelector('.avatar-bg');
  const contacts = document.querySelector('.contacts-list');
  const separators = Array.from(document.querySelectorAll('.sidebar-info > .separator'));
  const consent = document.getElementById('consent');
  let condensed = false;
  let animationFrame = 0;
  let activeSectionId = '';

  function updateScrollButtonLabel() {
    if (!scrollButton) return;
    const label = SCROLL_TOP_LABELS[currentLanguage()];
    scrollButton.setAttribute('aria-label', label);
    scrollButton.setAttribute('title', label);
  }

  function updateConsentOffset() {
    let offset = 0;
    if (consent && consent.isConnected && !consent.hidden) {
      const style = window.getComputedStyle(consent);
      const rect = consent.getBoundingClientRect();
      if (style.display !== 'none' && style.visibility !== 'hidden' && rect.height > 0) {
        offset = Math.max(0, window.innerHeight - rect.top + 12);
      }
    }
    document.documentElement.style.setProperty('--scroll-top-consent-offset', `${Math.ceil(offset)}px`);
  }

  function setCondensed(nextCondensed) {
    const next = desktopMedia.matches && nextCondensed;
    if (next === condensed && contacts?.getAttribute('aria-hidden') !== null) return;

    condensed = next;
    body.classList.toggle('sidebar-condensed', condensed);
    setInteractiveState(contacts, condensed);
    if (avatar) avatar.setAttribute('aria-hidden', condensed ? 'true' : 'false');
    separators.forEach(separator => separator.setAttribute('aria-hidden', condensed ? 'true' : 'false'));
  }

  function setScrollButtonVisible(visible) {
    if (!scrollButton) return;
    scrollButton.classList.toggle('visible', visible);
    scrollButton.setAttribute('aria-hidden', visible ? 'false' : 'true');
    scrollButton.setAttribute('tabindex', visible ? '0' : '-1');
  }

  function keepActiveLinkVisible(link) {
    if (!navList || !link || !desktopMedia.matches) return;
    const navRect = navList.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    if (linkRect.top < navRect.top || linkRect.bottom > navRect.bottom) {
      link.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'auto' });
    }
  }

  function setActiveSection(sectionId) {
    if (!sectionId || sectionId === activeSectionId) return;
    activeSectionId = sectionId;

    navLinks.forEach(link => {
      const active = link.getAttribute('href') === `#${sectionId}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });

    keepActiveLinkVisible(navLinks.find(link => link.getAttribute('href') === `#${sectionId}`));
  }

  function updateActiveSection() {
    if (!sections.length) return;

    const scroller = scrollingElement();
    const atDocumentEnd = scroller.scrollTop + window.innerHeight >= scroller.scrollHeight - 4;
    if (atDocumentEnd) {
      setActiveSection(sections.at(-1).id);
      return;
    }

    const readingLine = Math.min(window.innerHeight * 0.38, 320);
    const crossed = sections.filter(section => section.getBoundingClientRect().top <= readingLine);
    const candidate = crossed.at(-1) || sections[0];
    setActiveSection(candidate.id);
  }

  function updateScrollState() {
    animationFrame = 0;
    const scrollTop = scrollingElement().scrollTop;

    if (!desktopMedia.matches) setCondensed(false);
    else if (!condensed && scrollTop >= COMPACT_AT) setCondensed(true);
    else if (condensed && scrollTop <= EXPAND_BELOW) setCondensed(false);

    setScrollButtonVisible(scrollTop >= SHOW_SCROLL_TOP_AT);
    updateConsentOffset();
    updateActiveSection();
  }

  function requestScrollStateUpdate() {
    if (!animationFrame) animationFrame = window.requestAnimationFrame(updateScrollState);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const sectionId = link.getAttribute('href')?.slice(1);
      if (sectionId) setActiveSection(sectionId);
    });
  });

  if (scrollButton) {
    scrollButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    });
  }

  new MutationObserver(updateScrollButtonLabel).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang']
  });

  if (consent) {
    new MutationObserver(updateConsentOffset).observe(consent, {
      attributes: true,
      attributeFilter: ['hidden', 'style', 'class']
    });
    if ('ResizeObserver' in window) new ResizeObserver(updateConsentOffset).observe(consent);
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(requestScrollStateUpdate, {
      root: null,
      rootMargin: '0px',
      threshold: [0, 0.01, 0.1, 0.25, 0.5]
    });
    sections.forEach(section => observer.observe(section));
  }

  window.addEventListener('scroll', requestScrollStateUpdate, { passive: true });
  window.addEventListener('resize', requestScrollStateUpdate, { passive: true });
  desktopMedia.addEventListener('change', requestScrollStateUpdate);
  reduceMotion.addEventListener('change', requestScrollStateUpdate);

  updateScrollButtonLabel();
  setInteractiveState(contacts, false);
  setScrollButtonVisible(false);
  updateScrollState();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSiteUx, { once: true });
} else {
  initializeSiteUx();
}
