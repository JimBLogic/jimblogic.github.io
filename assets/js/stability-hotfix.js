const CONSENT_STORAGE_KEY = 'consent-analytics';

function readConsentPreference() {
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
}

function saveConsentPreference(value) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // Storage can be unavailable in strict privacy modes. Consent dismissal
    // must still work for the current page even when the choice cannot persist.
  }
}

function initializeStableConsent() {
  const banner = document.getElementById('consent');
  if (!banner || banner.dataset.stableConsent === 'ready') return;

  banner.dataset.stableConsent = 'ready';
  let dismissed = false;

  const resetConsentOffset = () => {
    document.documentElement.style.setProperty('--scroll-top-consent-offset', '0px');
  };

  const dismiss = value => {
    if (dismissed) return;
    dismissed = true;

    // Hide first so the UI responds immediately, independently of storage or
    // analytics availability.
    banner.hidden = true;
    banner.setAttribute('aria-hidden', 'true');
    resetConsentOffset();
    saveConsentPreference(value);

    if (value === 'yes' && typeof window.plausible === 'function') {
      try {
        window.plausible('pageview');
      } catch {
        // Analytics must never block the consent interaction.
      }
    }

    banner.remove();
  };

  const handleConsent = event => {
    const target = event.target instanceof Element
      ? event.target.closest('#consent-accept, #consent-decline')
      : null;
    if (!target) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    dismiss(target.id === 'consent-accept' ? 'yes' : 'no');
  };

  const prior = readConsentPreference();
  if (prior === 'yes' || prior === 'no') {
    dismiss(prior);
    return;
  }

  banner.hidden = false;
  banner.removeAttribute('aria-hidden');

  // Capture-phase handlers take precedence over legacy delegated listeners and
  // guarantee a single deterministic action for pointer, mouse and keyboard use.
  document.addEventListener('pointerup', handleConsent, { capture: true, passive: false });
  document.addEventListener('click', handleConsent, { capture: true, passive: false });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeStableConsent, { once: true });
} else {
  initializeStableConsent();
}
