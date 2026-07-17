function safeStorageGet(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeStorageSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Consent must still be actionable when storage is blocked.
  }
}

function initializeConsentStability() {
  const consent = document.getElementById('consent');
  const accept = document.getElementById('consent-accept');
  const decline = document.getElementById('consent-decline');
  if (!consent || !accept || !decline) return;

  const key = 'consent-analytics';
  const prior = safeStorageGet(key);

  const closeConsent = value => {
    safeStorageSet(key, value);
    consent.hidden = true;
    consent.setAttribute('aria-hidden', 'true');
    consent.removeAttribute('aria-modal');

    if (value === 'yes' && typeof window.plausible === 'function') {
      window.plausible('pageview');
    }
  };

  if (prior === 'yes' || prior === 'no') {
    consent.hidden = true;
    consent.setAttribute('aria-hidden', 'true');
    consent.removeAttribute('aria-modal');
    return;
  }

  consent.hidden = false;
  consent.setAttribute('aria-hidden', 'false');
  consent.setAttribute('aria-modal', 'true');

  accept.addEventListener('click', () => closeConsent('yes'));
  decline.addEventListener('click', () => closeConsent('no'));
}

function initializeSidebarStability() {
  const sidebarInfo = document.querySelector('.sidebar-info');
  const contacts = document.querySelector('.contacts-list');
  if (!sidebarInfo || !contacts) return;

  const ensureVisible = () => {
    if (!window.matchMedia('(min-width: 1025px) and (max-height: 800px)').matches) return;

    const email = contacts.querySelector('a[href^="mailto:"]');
    const resume = contacts.querySelector('a[href$="CV.pdf"]');
    [email, resume].filter(Boolean).forEach(element => {
      element.style.overflowWrap = 'anywhere';
      element.style.wordBreak = 'break-word';
      element.style.whiteSpace = 'normal';
    });
  };

  ensureVisible();
  window.addEventListener('resize', ensureVisible, { passive: true });
}

function initializeProductionStability() {
  initializeConsentStability();
  initializeSidebarStability();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeProductionStability, { once: true });
} else {
  initializeProductionStability();
}
