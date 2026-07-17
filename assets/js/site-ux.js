(function () {
  'use strict';

  var CONSENT_KEY = 'consent-analytics';
  var MOBILE_QUERY = '(max-width: 1024px)';

  function safeStorageGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function safeStorageSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      // Safari private browsing and strict privacy modes may block storage.
      // The interaction must still complete for the current page.
    }
  }

  function installCompatibilityStyles() {
    if (document.getElementById('ios-ui-stability-styles')) return;

    var style = document.createElement('style');
    style.id = 'ios-ui-stability-styles';
    style.textContent = [
      '.hamburger{touch-action:manipulation;-webkit-tap-highlight-color:transparent;}',
      '.hamburger .menu-icon{display:block;width:22px;height:16px;position:relative;}',
      '.hamburger .menu-icon span{position:absolute;left:0;width:100%;height:2px;border-radius:2px;background:currentColor;transition:transform .2s ease,opacity .2s ease,top .2s ease;}',
      '.hamburger .menu-icon span:nth-child(1){top:0;}',
      '.hamburger .menu-icon span:nth-child(2){top:7px;}',
      '.hamburger .menu-icon span:nth-child(3){top:14px;}',
      '.hamburger[aria-expanded="true"] .menu-icon span:nth-child(1){top:7px;transform:rotate(45deg);}',
      '.hamburger[aria-expanded="true"] .menu-icon span:nth-child(2){opacity:0;}',
      '.hamburger[aria-expanded="true"] .menu-icon span:nth-child(3){top:7px;transform:rotate(-45deg);}',
      '@media(max-width:1024px){',
      '.site-header{position:fixed;top:0;right:0;z-index:10020;pointer-events:none;padding:calc(10px + env(safe-area-inset-top,0px)) calc(10px + env(safe-area-inset-right,0px)) 0 0;}',
      '.hamburger{pointer-events:auto;display:flex!important;align-items:center;justify-content:center;width:46px;height:46px;min-width:46px;min-height:46px;padding:0!important;border-radius:12px;font-size:0!important;line-height:1;background:rgba(18,18,18,.96);}',
      '.navbar{display:none!important;}',
      '.navbar.open{display:block!important;position:fixed;inset:calc(66px + env(safe-area-inset-top,0px)) 10px auto 10px;z-index:10010;max-height:calc(100dvh - 86px - env(safe-area-inset-top,0px));max-height:calc(100vh - 86px - env(safe-area-inset-top,0px));overflow-y:auto;-webkit-overflow-scrolling:touch;border-radius:14px;background:rgba(18,18,18,.98);box-shadow:0 18px 50px rgba(0,0,0,.45);}',
      '.navbar.open .navbar-list{display:flex!important;flex-direction:column!important;max-height:none!important;overflow:visible!important;padding:10px!important;}',
      '.navbar.open .navbar-link{min-height:44px;}',
      'body.mobile-nav-open{overflow:hidden;}',
      '}',
      '@media(min-width:1025px){',
      '.contacts-list{flex:0 0 auto;max-height:none!important;overflow:visible!important;}',
      '.contact-item{width:100%;min-width:0;align-items:flex-start;}',
      '.contact-info{flex:1 1 auto;min-width:0;}',
      '.contact-info .contact-link,.contact-info address{display:block;width:100%;max-width:100%;white-space:normal;overflow-wrap:anywhere;word-break:break-word;}',
      '}',
      '@media(min-width:1025px) and (max-height:620px){.avatar-bg{display:none!important;}}'
    ].join('');
    document.head.appendChild(style);
  }

  function initializeConsent() {
    var banner = document.getElementById('consent');
    if (!banner || banner.getAttribute('data-stable-consent') === 'ready') return;

    banner.setAttribute('data-stable-consent', 'ready');
    var prior = safeStorageGet(CONSENT_KEY);

    function dismiss(value) {
      banner.hidden = true;
      banner.setAttribute('aria-hidden', 'true');
      banner.style.display = 'none';
      document.documentElement.style.setProperty('--scroll-top-consent-offset', '0px');
      safeStorageSet(CONSENT_KEY, value);

      if (value === 'yes' && typeof window.plausible === 'function') {
        try { window.plausible('pageview'); } catch (error) {}
      }

      if (banner.parentNode) banner.parentNode.removeChild(banner);
    }

    if (prior === 'yes' || prior === 'no') {
      dismiss(prior);
      return;
    }

    banner.hidden = false;
    banner.removeAttribute('aria-hidden');
    banner.style.display = '';

    var accept = document.getElementById('consent-accept');
    var decline = document.getElementById('consent-decline');

    function bind(button, value) {
      if (!button) return;
      var cleanButton = button.cloneNode(true);
      button.parentNode.replaceChild(cleanButton, button);

      var handled = false;
      function activate(event) {
        if (handled) return;
        handled = true;
        if (event) {
          event.preventDefault();
          event.stopPropagation();
        }
        dismiss(value);
      }

      cleanButton.addEventListener('click', activate, false);
      cleanButton.addEventListener('touchend', activate, false);
    }

    bind(accept, 'yes');
    bind(decline, 'no');
  }

  function initializeMobileNavigation() {
    var oldToggle = document.getElementById('navToggle');
    var navbar = document.querySelector('.navbar');
    if (!oldToggle || !navbar) return;

    var toggle = oldToggle.cloneNode(false);
    toggle.id = 'navToggle';
    toggle.className = oldToggle.className;
    toggle.type = 'button';
    toggle.setAttribute('aria-controls', 'navList');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    toggle.innerHTML = '<span class="menu-icon" aria-hidden="true"><span></span><span></span><span></span></span>';
    oldToggle.parentNode.replaceChild(toggle, oldToggle);

    function setOpen(open) {
      navbar.classList.toggle('open', open);
      document.body.classList.toggle('mobile-nav-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    function toggleMenu(event) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    }

    toggle.addEventListener('click', toggleMenu, false);
    toggle.addEventListener('touchend', function (event) {
      event.preventDefault();
      toggleMenu(event);
    }, false);

    navbar.addEventListener('click', function (event) {
      var target = event.target;
      while (target && target !== navbar && target.tagName !== 'A') target = target.parentNode;
      if (target && target.tagName === 'A') setOpen(false);
    }, false);

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setOpen(false);
    }, false);

    window.addEventListener('resize', function () {
      if (!window.matchMedia(MOBILE_QUERY).matches) setOpen(false);
    }, false);
  }

  function initializeScrollButton() {
    var button = document.getElementById('scrollTop');
    if (!button) return;

    function update() {
      var top = window.pageYOffset || document.documentElement.scrollTop || 0;
      button.classList.toggle('visible', top >= 500);
    }

    button.addEventListener('click', function () {
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        window.scrollTo(0, 0);
      }
    }, false);

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  function initialize() {
    if (document.documentElement.getAttribute('data-site-ux') === 'ready') return;
    document.documentElement.setAttribute('data-site-ux', 'ready');
    installCompatibilityStyles();
    initializeConsent();
    initializeMobileNavigation();
    initializeScrollButton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, false);
  } else {
    initialize();
  }
}());
