const SCROLL_TOP_LABELS = {
  en: 'Scroll to top',
  es: 'Volver arriba',
  ca: 'Tornar a dalt'
};

const RECRUITER_FALLBACKS = {
  en: {
    hero_eyebrow: 'Junior SOC Analyst / Blue Team candidate · Balearic Islands, Spain',
    hero_statement:
      'I turn daily learning into auditable defensive proof of work. I build small, inspectable security systems that show how I think: source-backed triage, Linux and container operations, network visibility, documentation, recovery and careful automation.',
    projects_intro:
      'Start here for interview evidence. These case studies explain what was built, why it matters defensively and where public source or lab notes are available.',
    hero_github: 'GitHub evidence',
    hero_cv: 'Open CV',
    hero_tryhackme: 'TryHackMe / HTB lab notes',
    hero_contact: 'Email Jaime',
    hero_actions_label: 'Primary portfolio shortcuts',
    hero_proof_links_label: 'External proof links',
    proof_strip_label: 'Recruiter snapshot',
    proof_role_label: 'Target role',
    proof_role_value: 'Junior SOC / Blue Team',
    proof_location_label: 'Location',
    proof_location_value: 'Balearic Islands, Spain · open to remote and hybrid roles',
    proof_evidence_label: 'Public evidence',
    proof_evidence_value: 'CyberDailyLog, lab notes and GitHub projects',
    proof_learning_label: 'Current learning',
    proof_learning_value: 'Preparing for AWS Cloud Practitioner',
    project_case_studies: 'Featured proof of work',
    case_cyber_title: 'CyberDailyLog — daily defensive intelligence pipeline',
    case_cyber_purpose:
      'Purpose: practise source-backed security monitoring and prioritisation from public advisories and vulnerability data.',
    case_cyber_built:
      'Built: automated collection, validation and a compact portfolio feed with a bundled fallback snapshot.',
    case_cyber_relevance:
      'Defensive relevance: demonstrates triage thinking, repeatable reporting, safe rendering of untrusted feed text and GitHub-auditable output.',
    case_cyber_status: 'Current status: active portfolio project; not a production SOC feed.',
    case_homelab_title: 'Raspberry Pi defensive homelab',
    case_homelab_purpose:
      'Purpose: learn practical Linux administration, networking, monitoring and recovery on a small always-on lab.',
    case_homelab_built:
      'Built: Docker service practice, hardening routines, log review, backup checks and network-visibility exercises.',
    case_homelab_relevance:
      'Defensive relevance: supports conversations about least privilege, service exposure, resilience and troubleshooting.',
    case_homelab_status:
      'Current status: public repository with a reproducible LITE/FULL Docker foundation; tools remain candidates until installation and validation exercises are recorded.',
    homelab_public_link: 'View Repo'
  },
  es: {
    hero_eyebrow: 'Candidato a Analista SOC Junior / Blue Team · Islas Baleares, España',
    hero_statement:
      'Convierto el aprendizaje diario en evidencia defensiva auditable. Construyo sistemas de seguridad pequeños e inspeccionables que muestran cómo pienso: triaje basado en fuentes, operaciones Linux y contenedores, visibilidad de red, documentación, recuperación y automatización cuidadosa.',
    projects_intro:
      'Empieza aquí para ver evidencia útil en una entrevista. Estos casos explican qué se construyó, por qué es relevante para la defensa y dónde hay código o notas públicas disponibles.',
    hero_github: 'Evidencia en GitHub',
    hero_cv: 'Abrir CV',
    hero_tryhackme: 'Notas de labs TryHackMe / HTB',
    hero_contact: 'Escribir a Jaime',
    hero_actions_label: 'Accesos principales del portfolio',
    hero_proof_links_label: 'Enlaces a evidencias externas',
    proof_strip_label: 'Resumen para recruiters',
    proof_role_label: 'Rol objetivo',
    proof_role_value: 'SOC Junior / Blue Team',
    proof_location_label: 'Ubicación',
    proof_location_value: 'Islas Baleares, España · abierto a puestos remotos e híbridos',
    proof_evidence_label: 'Evidencia pública',
    proof_evidence_value: 'CyberDailyLog, notas de laboratorios y proyectos en GitHub',
    proof_learning_label: 'Aprendizaje actual',
    proof_learning_value: 'Preparación para AWS Cloud Practitioner',
    project_case_studies: 'Evidencia práctica destacada',
    case_cyber_title: 'CyberDailyLog — pipeline diario de inteligencia defensiva',
    case_cyber_purpose:
      'Propósito: practicar monitorización y priorización de seguridad basadas en fuentes públicas, avisos y datos de vulnerabilidades.',
    case_cyber_built:
      'Construido: recopilación automatizada, validación y un resumen compacto para el portfolio con snapshot local de respaldo.',
    case_cyber_relevance:
      'Relevancia defensiva: demuestra criterio de triaje, informes repetibles, renderizado seguro de texto externo y resultados auditables en GitHub.',
    case_cyber_status: 'Estado actual: proyecto activo de portfolio; no es un feed SOC de producción.',
    case_homelab_title: 'Homelab defensivo con Raspberry Pi',
    case_homelab_purpose:
      'Propósito: aprender administración Linux, redes, monitorización y recuperación en un pequeño laboratorio siempre activo.',
    case_homelab_built:
      'Construido: práctica con servicios Docker, rutinas de hardening, revisión de logs, comprobaciones de backup y ejercicios de visibilidad de red.',
    case_homelab_relevance:
      'Relevancia defensiva: permite hablar del principio de mínimo privilegio, exposición de servicios, resiliencia y resolución de problemas.',
    case_homelab_status:
      'Estado actual: repositorio público con una base Docker reproducible LITE/FULL; las herramientas siguen siendo candidatas hasta documentar ejercicios de instalación y validación.',
    homelab_public_link: 'Ver Repositorio'
  },
  ca: {
    hero_eyebrow: 'Candidat a Analista SOC Junior / Blue Team · Illes Balears, Espanya',
    hero_statement:
      'Converteixo l\'aprenentatge diari en evidència defensiva auditable. Construeixo sistemes de seguretat petits i inspeccionables que mostren com penso: triatge basat en fonts, operacions Linux i contenidors, visibilitat de xarxa, documentació, recuperació i automatització acurada.',
    projects_intro:
      'Comença aquí per veure evidència útil en una entrevista. Aquests casos expliquen què s’ha construït, per què és rellevant per a la defensa i on hi ha codi o notes públiques disponibles.',
    hero_github: 'Evidència a GitHub',
    hero_cv: 'Obrir CV',
    hero_tryhackme: 'Notes de labs TryHackMe / HTB',
    hero_contact: 'Escriure a Jaime',
    hero_actions_label: 'Accessos principals del portfolio',
    hero_proof_links_label: 'Enllaços a evidències externes',
    proof_strip_label: 'Resum per a recruiters',
    proof_role_label: 'Rol objectiu',
    proof_role_value: 'SOC Junior / Blue Team',
    proof_location_label: 'Ubicació',
    proof_location_value: 'Illes Balears, Espanya · obert a llocs remots i híbrids',
    proof_evidence_label: 'Evidència pública',
    proof_evidence_value: 'CyberDailyLog, notes de laboratoris i projectes a GitHub',
    proof_learning_label: 'Aprenentatge actual',
    proof_learning_value: 'Preparació per a AWS Cloud Practitioner',
    project_case_studies: 'Evidència pràctica destacada',
    case_cyber_title: 'CyberDailyLog — pipeline diari d’intel·ligència defensiva',
    case_cyber_purpose:
      'Propòsit: practicar el monitoratge i la priorització de seguretat basats en fonts públiques, avisos i dades de vulnerabilitats.',
    case_cyber_built:
      'Construït: recopilació automatitzada, validació i un resum compacte per al portfolio amb snapshot local de suport.',
    case_cyber_relevance:
      'Rellevància defensiva: demostra criteri de triatge, informes repetibles, renderitzat segur de text extern i resultats auditables a GitHub.',
    case_cyber_status: 'Estat actual: projecte actiu de portfolio; no és un feed SOC de producció.',
    case_homelab_title: 'Homelab defensiu amb Raspberry Pi',
    case_homelab_purpose:
      'Propòsit: aprendre administració Linux, xarxes, monitoratge i recuperació en un petit laboratori sempre actiu.',
    case_homelab_built:
      'Construït: pràctica amb serveis Docker, rutines de hardening, revisió de logs, comprovacions de backup i exercicis de visibilitat de xarxa.',
    case_homelab_relevance:
      'Rellevància defensiva: permet parlar del principi de mínim privilegi, exposició de serveis, resiliència i resolució de problemes.',
    case_homelab_status:
      'Estat actual: repositori públic amb una base Docker reproduïble LITE/FULL; les eines continuen sent candidates fins que es documentin exercicis d’instal·lació i validació.',
    homelab_public_link: 'Veure Repositori'
  }
};

const COMPACT_AT = 360;
const EXPAND_BELOW = 180;
const SHOW_SCROLL_TOP_AT = 500;
const DESKTOP_QUERY = '(min-width: 1025px)';

function currentLanguage() {
  const language = (document.documentElement.lang || 'en').toLowerCase();
  return Object.hasOwn(SCROLL_TOP_LABELS, language) ? language : 'en';
}

function installRecruiterFallbacks() {
  window.translations = window.translations || {};
  Object.entries(RECRUITER_FALLBACKS).forEach(([language, copy]) => {
    window.translations[language] = { ...(window.translations[language] || {}), ...copy };
  });
}

installRecruiterFallbacks();

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
  const homelabEvidenceLink = document.querySelector('.case-study-card:nth-child(2) .inline-evidence-link');
  if (homelabEvidenceLink) homelabEvidenceLink.setAttribute('data-txt', 'homelab_public_link');

  let condensed = false;
  let animationFrame = 0;
  let activeSectionId = '';

  function recruiterCopy() {
    const language = currentLanguage();
    return { ...RECRUITER_FALLBACKS[language], ...(window.translations?.[language] || {}) };
  }

  function updateRecruiterTranslations() {
    const copy = recruiterCopy();
    document.querySelectorAll('[data-txt]').forEach(element => {
      const key = element.getAttribute('data-txt');
      if (key && Object.hasOwn(RECRUITER_FALLBACKS[currentLanguage()], key)) {
        element.textContent = copy[key];
      }
    });

    document.querySelector('.hero-actions')?.setAttribute('aria-label', copy.hero_actions_label);
    document.querySelector('.hero-proof-links')?.setAttribute('aria-label', copy.hero_proof_links_label);
    document.querySelector('.proof-strip')?.setAttribute('aria-label', copy.proof_strip_label);
  }

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

  new window.MutationObserver(() => {
    updateScrollButtonLabel();
    updateRecruiterTranslations();
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang']
  });

  if (consent) {
    new window.MutationObserver(updateConsentOffset).observe(consent, {
      attributes: true,
      attributeFilter: ['hidden', 'style', 'class']
    });
    if ('ResizeObserver' in window) new window.ResizeObserver(updateConsentOffset).observe(consent);
  }

  if ('IntersectionObserver' in window) {
    const observer = new window.IntersectionObserver(requestScrollStateUpdate, {
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

  updateRecruiterTranslations();
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
