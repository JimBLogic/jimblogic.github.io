// Attempt to load locales from JSON files first; fallback to built-in translations
const translations = {
  en: {
    main_name: "Jaime Ramsden de Frutos",
    title: "Junior Cybersecurity Analyst | Ethical Hacker | AWS Cloud Practitioner",
    email: "Email",
    location: "Location",
    location_value: "Balearic Islands, Spain",
    resume: "Resume",
    openpdf: "Open PDF",
    about: "About Me",
    certifications: "Certifications",
    journey: "Learning Journey",
    skills: "Skills",
    education: "Education",
    passion: "Passion & Interests",
    projects: "Projects",
    software: "Software",
    tools: "Tools",
    contact: "Contact",
    contact_1: "Ready to collaborate? Reach out via email:",
    contact_2: "Or connect via <a href=' https://www.linkedin.com/in/jimblogic/ ' target='_blank'>LinkedIn</a>",
    passion_intro: "Beyond technical skills, I'm driven by curiosity and a commitment to financial sovereignty and privacy.",
    passion_bitcoin_title: "Bitcoin & Financial Sovereignty",
    passion_bitcoin_desc: "Running my own Bitcoin Lightning node to support the decentralized network and promote financial freedom. I believe in self-custody, peer-to-peer transactions, and the importance of sound money principles.",
    passion_bitcoin_link: "View my Lightning Node →",
    passion_privacy_title: "Privacy & Open Source",
    passion_privacy_desc: "Advocate for digital privacy and open-source software. I use privacy-focused tools like Proton Mail, contribute to open-source projects, and believe everyone deserves control over their personal data.",
    passion_learning_title: "Continuous Learning",
    passion_learning_desc: "Cybersecurity is ever-evolving, and I'm passionate about staying ahead. From capture-the-flag competitions to reading security research papers, I'm always expanding my knowledge and testing new techniques.",
    passion_learning_link: "Explore my learning journey →",
    passion_community_title: "Community & Collaboration",
    passion_community_desc: "I believe in sharing knowledge and helping others grow. Whether it's documenting my learning journey on GitHub or mentoring newcomers, I'm committed to building a stronger security community.",
    passion_community_link: "View my GitHub →",
    // About section
    about_btn_1: "Cybersecurity",
    about_btn_2: "Cloud Security",
    about_btn_3: "Penetration Testing",
    about_btn_4: "Digital Forensics",
    about_btn_5: "OSINT",
    about_btn_6: "Bitcoin",
    about_p1: "I'm an aspiring junior cybersecurity analyst with hands-on training in ethical hacking, cloud security, and digital forensics. I recently completed a full-time bootcamp at <a href='./assets/pdfs/UpgradeHub/UpgradeHub Cert.pdf' target='_blank'>UpgradeHub</a>, where I gained real-world experience using Kali Linux, Metasploit, AWS, Splunk, Wireshark, and more.",
    about_p2_label: "Looking for:",
    about_p2: "An entry-level or junior cybersecurity position where I can keep learning and contribute to meaningful projects.",
    about_p3: "Learning journeys and certificates hosted on GitHub:",
    // Skills section
    skills_intro: "Throughout my cybersecurity journey, I've developed expertise across multiple domains. Each skill represents countless hours of hands-on practice, lab work, and real-world application.",
    skills_1_title: "Security Frameworks:",
    skills_1_desc: "NIST Cybersecurity Framework, ISO 27001 - Understanding organizational security postures and compliance requirements",
    skills_2_title: "Network Security:",
    skills_2_desc: "Network analysis, IDS/IPS configuration, Firewall management - Protecting perimeter defenses and monitoring traffic patterns",
    skills_3_title: "Digital Forensics:",
    skills_3_desc: "Evidence collection, Data recovery, Incident response - Investigating security breaches and preserving digital evidence",
    skills_4_title: "Cloud Security:",
    skills_4_desc: "AWS Security best practices, CloudFormation IaC, IAM policies - Securing cloud infrastructure and implementing least privilege access",
    skills_5_title: "Penetration Testing:",
    skills_5_desc: "Vulnerability assessment, Ethical hacking methodologies, OSINT reconnaissance - Thinking like an attacker to strengthen defenses",
    skills_6_title: "Programming:",
    skills_6_desc: "Python automation, Bash scripting, SQL database queries - Building tools and automating security workflows",
    skills_7_title: "Threat Analysis:",
    skills_7_desc: "Malware analysis techniques, Threat hunting procedures, Risk assessment - Proactively identifying and mitigating threats",
    // Education section
    edu_bootcamp_title: "Cybersecurity Bootcamp",
    edu_bootcamp_org: "UpgradeHub",
    edu_bootcamp_date: "2024",
    edu_bootcamp_desc: "Intensive full-time program covering ethical hacking, cloud security, digital forensics, and incident response. Hands-on experience with industry-standard tools and real-world scenarios.",
    edu_continuous_title: "Continuous Learning",
    edu_continuous_org: "Cybrary, Security Blue Team, IBM",
    edu_continuous_date: "Ongoing",
    edu_continuous_desc: "Active engagement in cybersecurity learning platforms to stay current with emerging threats and security technologies.",
    // Dynamic UI strings
    view_certificate: "View Certificate",
    learn_more: "Learn More",
    view_repo: "View Repo",
    profile_highlights: "Profile Highlights",
    view_github_profile: "View GitHub Profile",
    github_error: "Could not load repositories right now.",
    certificates: "certificates",
    filter_all: "All",
    open: "Open",
    // Projects toggle
    projects_expand: "Expand",
    projects_collapse: "Collapse"
  },
  es: {
    main_name: "Jaime R. de Frutos",
    title: "Analista de Ciberseguridad | Hacker Ético | AWS Cloud Practitioner",
    email: "Correo",
    location: "Ubicación",
    location_value: "Islas Baleares, España",
    resume: "Currículum",
    openpdf: "Abrir PDF",
    about: "Sobre Mí",
    certifications: "Certificaciones",
    journey: "Ruta de Aprendizaje",
    skills: "Habilidades",
    education: "Educación",
    passion: "Pasión e Intereses",
    projects: "Proyectos",
    software: "Software",
    tools: "Herramientas",
    contact: "Contacto",
    contact_1: "¿Listo para colaborar? Escríbeme:",
    contact_2: "O encuentra mi nodo público en <a href='https://amboss.space/es/node/02ec23c7c0c1adb58a46f6ca5a5acbcebfb2972ede2ed6ba73de605fda5288509f ' target='_blank'>Amboss</a>",
    passion_intro: "Más allá de las habilidades técnicas, me impulsa la curiosidad y el compromiso con la soberanía financiera y la privacidad.",
    passion_bitcoin_title: "Bitcoin y Soberanía Financiera",
    passion_bitcoin_desc: "Opero mi propio nodo Lightning de Bitcoin para apoyar la red descentralizada y promover la libertad financiera. Creo en la autocustodia, las transacciones peer-to-peer y la importancia de principios monetarios sólidos.",
    passion_bitcoin_link: "Ver mi Nodo Lightning →",
    passion_privacy_title: "Privacidad y Código Abierto",
    passion_privacy_desc: "Defensor de la privacidad digital y el software de código abierto. Uso herramientas centradas en la privacidad como Proton Mail, contribuyo a proyectos de código abierto y creo que todos merecen control sobre sus datos personales.",
    passion_learning_title: "Aprendizaje Continuo",
    passion_learning_desc: "La ciberseguridad está en constante evolución, y me apasiona mantenerme a la vanguardia. Desde competiciones capture-the-flag hasta lectura de papers de investigación en seguridad, siempre estoy ampliando mis conocimientos y probando nuevas técnicas.",
    passion_learning_link: "Explora mi ruta de aprendizaje →",
    passion_community_title: "Comunidad y Colaboración",
    passion_community_desc: "Creo en compartir conocimiento y ayudar a otros a crecer. Ya sea documentando mi viaje de aprendizaje en GitHub o mentoreando a principiantes, estoy comprometido con construir una comunidad de seguridad más fuerte.",
    passion_community_link: "Ver mi GitHub →",
    // About section
    about_btn_1: "Ciberseguridad",
    about_btn_2: "Seguridad en la Nube",
    about_btn_3: "Pruebas de Penetración",
    about_btn_4: "Forense Digital",
    about_btn_5: "OSINT",
    about_btn_6: "Bitcoin",
    about_p1: "Soy un aspirante a analista junior de ciberseguridad con formación práctica en hacking ético, seguridad en la nube y forense digital. Recientemente completé un bootcamp intensivo en <a href='./assets/pdfs/UpgradeHub/UpgradeHub Cert.pdf' target='_blank'>UpgradeHub</a>, donde adquirí experiencia real usando Kali Linux, Metasploit, AWS, Splunk, Wireshark y más.",
    about_p2_label: "Busco:",
    about_p2: "Un puesto de nivel inicial o junior en ciberseguridad donde pueda seguir aprendiendo y contribuir a proyectos significativos.",
    about_p3: "Rutas de aprendizaje y certificados alojados en GitHub:",
    // Skills section
    skills_intro: "A lo largo de mi trayectoria en ciberseguridad, he desarrollado experiencia en múltiples dominios. Cada habilidad representa innumerables horas de práctica, trabajo de laboratorio y aplicación en el mundo real.",
    skills_1_title: "Marcos de Seguridad:",
    skills_1_desc: "NIST Cybersecurity Framework, ISO 27001 - Comprender las posturas de seguridad organizacional y requisitos de cumplimiento",
    skills_2_title: "Seguridad de Redes:",
    skills_2_desc: "Análisis de redes, configuración IDS/IPS, gestión de Firewall - Proteger defensas perimetrales y monitorear patrones de tráfico",
    skills_3_title: "Forense Digital:",
    skills_3_desc: "Recopilación de evidencia, recuperación de datos, respuesta a incidentes - Investigar brechas de seguridad y preservar evidencia digital",
    skills_4_title: "Seguridad en la Nube:",
    skills_4_desc: "Mejores prácticas de seguridad AWS, CloudFormation IaC, políticas IAM - Asegurar infraestructura en la nube e implementar acceso de privilegio mínimo",
    skills_5_title: "Pruebas de Penetración:",
    skills_5_desc: "Evaluación de vulnerabilidades, metodologías de hacking ético, reconocimiento OSINT - Pensar como un atacante para fortalecer las defensas",
    skills_6_title: "Programación:",
    skills_6_desc: "Automatización con Python, scripting en Bash, consultas SQL - Construir herramientas y automatizar flujos de trabajo de seguridad",
    skills_7_title: "Análisis de Amenazas:",
    skills_7_desc: "Técnicas de análisis de malware, procedimientos de caza de amenazas, evaluación de riesgos - Identificar y mitigar amenazas proactivamente",
    // Education section
    edu_bootcamp_title: "Bootcamp de Ciberseguridad",
    edu_bootcamp_org: "UpgradeHub",
    edu_bootcamp_date: "2024",
    edu_bootcamp_desc: "Programa intensivo a tiempo completo que cubre hacking ético, seguridad en la nube, forense digital y respuesta a incidentes. Experiencia práctica con herramientas estándar de la industria y escenarios del mundo real.",
    edu_continuous_title: "Aprendizaje Continuo",
    edu_continuous_org: "Cybrary, Security Blue Team, IBM",
    edu_continuous_date: "En curso",
    edu_continuous_desc: "Participación activa en plataformas de aprendizaje de ciberseguridad para mantenerse al día con las amenazas emergentes y tecnologías de seguridad.",
    // Dynamic UI strings
    view_certificate: "Ver Certificado",
    learn_more: "Más Información",
    view_repo: "Ver Repositorio",
    profile_highlights: "Destacados del Perfil",
    view_github_profile: "Ver Perfil de GitHub",
    github_error: "No se pudieron cargar los repositorios en este momento.",
    certificates: "certificados",
    filter_all: "Todos",
    open: "Abrir",
    // Projects toggle
    projects_expand: "Expandir",
    projects_collapse: "Contraer"
  },
  ca: {
    main_name: "Jaime R. de Frutos",
    title: "Analista de Ciberseguretat · Hacker Ètic · AWS Cloud Practitioner",
    email: "Correu",
    location: "Ubicació",
    location_value: "Illes Balears, Espanya",
    resume: "Currículum",
    openpdf: "Obrir PDF",
    about: "Sobre Mi",
    certifications: "Certificacions",
    journey: "Ruta d'Aprenentatge",
    skills: "Habilitats",
    education: "Educació",
    passion: "Passió i Interessos",
    projects: "Projectes",
    software: "Programari",
    tools: "Eines",
    contact: "Contacte",
    contact_1: "Preparat per col·laborar? Escriu-me:",
    contact_2: "També pots contactar per <a href='https://www.linkedin.com/in/jimblogic/ ' target='_blank'>LinkedIn</a>",
    passion_intro: "Més enllà de les habilitats tècniques, m'impulsa la curiositat i el compromís amb la sobirania financera i la privacitat.",
    passion_bitcoin_title: "Bitcoin i Sobirania Financera",
    passion_bitcoin_desc: "Opero el meu propi node Lightning de Bitcoin per donar suport a la xarxa descentralitzada i promoure la llibertat financera. Crec en l'autocustòdia, les transaccions peer-to-peer i la importància de principis monetaris sòlids.",
    passion_bitcoin_link: "Veure el meu Node Lightning →",
    passion_privacy_title: "Privacitat i Codi Obert",
    passion_privacy_desc: "Defensor de la privacitat digital i el programari de codi obert. Utilitzo eines centrades en la privacitat com Proton Mail, contribueixo a projectes de codi obert i crec que tothom mereix control sobre les seves dades personals.",
    passion_learning_title: "Aprenentatge Continu",
    passion_learning_desc: "La ciberseguretat està en constant evolució, i m'apassiona mantenir-me al capdavant. Des de competicions capture-the-flag fins a lectura de papers d'investigació en seguretat, sempre estic ampliant els meus coneixements i provant noves tècniques.",
    passion_learning_link: "Explora la meva ruta d'aprenentatge →",
    passion_community_title: "Comunitat i Col·laboració",
    passion_community_desc: "Crec en compartir coneixement i ajudar els altres a créixer. Sigui documentant el meu viatge d'aprenentatge a GitHub o mentorant principiants, estic compromès amb construir una comunitat de seguretat més forta.",
    passion_community_link: "Veure el meu GitHub →",
    // About section
    about_btn_1: "Ciberseguretat",
    about_btn_2: "Seguretat al Núvol",
    about_btn_3: "Proves de Penetració",
    about_btn_4: "Forense Digital",
    about_btn_5: "OSINT",
    about_btn_6: "Bitcoin",
    about_p1: "Sóc un aspirant a analista junior de ciberseguretat amb formació pràctica en hacking ètic, seguretat al núvol i forense digital. Recentment vaig completar un bootcamp intensiu a <a href='./assets/pdfs/UpgradeHub/UpgradeHub Cert.pdf' target='_blank'>UpgradeHub</a>, on vaig adquirir experiència real utilitzant Kali Linux, Metasploit, AWS, Splunk, Wireshark i més.",
    about_p2_label: "Cerco:",
    about_p2: "Un lloc de nivell inicial o junior en ciberseguretat on pugui continuar aprenent i contribuir a projectes significatius.",
    about_p3: "Rutes d'aprenentatge i certificats allotjats a GitHub:",
    // Skills section
    skills_intro: "Al llarg del meu trajecte en ciberseguretat, he desenvolupat experiència en múltiples dominis. Cada habilitat representa innombrables hores de pràctica, treball de laboratori i aplicació al món real.",
    skills_1_title: "Marcs de Seguretat:",
    skills_1_desc: "NIST Cybersecurity Framework, ISO 27001 - Comprendre les postures de seguretat organitzacional i requisits de compliment",
    skills_2_title: "Seguretat de Xarxes:",
    skills_2_desc: "Anàlisi de xarxes, configuració IDS/IPS, gestió de Firewall - Protegir defenses perimetrals i monitoritzar patrons de trànsit",
    skills_3_title: "Forense Digital:",
    skills_3_desc: "Recol·lecció d'evidència, recuperació de dades, resposta a incidents - Investigar bretxes de seguretat i preservar evidència digital",
    skills_4_title: "Seguretat al Núvol:",
    skills_4_desc: "Millors pràctiques de seguretat AWS, CloudFormation IaC, polítiques IAM - Assegurar infraestructura al núvol i implementar accés de privilegi mínim",
    skills_5_title: "Proves de Penetració:",
    skills_5_desc: "Avaluació de vulnerabilitats, metodologies de hacking ètic, reconeixement OSINT - Pensar com un atacant per enfortir les defenses",
    skills_6_title: "Programació:",
    skills_6_desc: "Automatització amb Python, scripting en Bash, consultes SQL - Construir eines i automatitzar fluxos de treball de seguretat",
    skills_7_title: "Anàlisi d'Amenaces:",
    skills_7_desc: "Tècniques d'anàlisi de malware, procediments de caça d'amenaces, avaluació de riscos - Identificar i mitigar amenaces proactivament",
    // Education section
    edu_bootcamp_title: "Bootcamp de Ciberseguretat",
    edu_bootcamp_org: "UpgradeHub",
    edu_bootcamp_date: "2024",
    edu_bootcamp_desc: "Programa intensiu a temps complet que cobreix hacking ètic, seguretat al núvol, forense digital i resposta a incidents. Experiència pràctica amb eines estàndard de la indústria i escenaris del món real.",
    edu_continuous_title: "Aprenentatge Continu",
    edu_continuous_org: "Cybrary, Security Blue Team, IBM",
    edu_continuous_date: "En curs",
    edu_continuous_desc: "Participació activa en plataformes d'aprenentatge de ciberseguretat per mantenir-se al dia amb les amenaces emergents i tecnologies de seguretat.",
    // Dynamic UI strings
    view_certificate: "Veure Certificat",
    learn_more: "Més Informació",
    view_repo: "Veure Repositori",
    profile_highlights: "Destacats del Perfil",
    view_github_profile: "Veure Perfil de GitHub",
    github_error: "No s'han pogut carregar els repositoris ara mateix.",
    certificates: "certificats",
    filter_all: "Tots",
    open: "Obrir",
    // Projects toggle
    projects_expand: "Expandir",
    projects_collapse: "Contraure"
  }
};

// Expose translations globally for use in script.js
if (typeof window !== 'undefined') {
  window.translations = translations;
}

async function loadLocale(lang) {
  try {
    const res = await fetch(`./assets/locales/${lang}.json`);
    if (!res.ok) return null;
    return await res.json();
  } catch (_e) { return null; }
}

// Helper to get translation for current language
function t(key) {
  const lang = (document.documentElement.getAttribute('lang') || 'en').toLowerCase();
  return (window.translations && window.translations[lang] && window.translations[lang][key]) ||
         (window.translations && window.translations.en && window.translations.en[key]) || key;
}

async function setLang(lang) {
  lang = (lang || 'en').toLowerCase();
  // Try external locale file first
  const dict = await loadLocale(lang);
  if (dict && typeof window !== 'undefined') {
    window.translations = window.translations || {};
    window.translations[lang] = { ...(window.translations[lang] || {}), ...dict };
  }

  document.querySelectorAll('[data-txt]').forEach(el => {
    const key = el.getAttribute('data-txt');
    const translation = t(key);
    if (!translation) return;
    const hasIcon = el.querySelector('ion-icon');
    const hasSpan = el.querySelector('span');
    if (hasIcon && hasSpan) {
      el.querySelector('span').textContent = translation;
    } else if (hasIcon) {
      const icon = el.querySelector('ion-icon').cloneNode(true);
      el.innerHTML = '';
      el.appendChild(icon);
      el.appendChild(document.createTextNode(translation));
    } else if (key === 'contact_2' || String(translation).includes('<a')) {
      el.innerHTML = translation;
    } else {
      el.textContent = translation;
    }
  });
  document.documentElement.setAttribute('lang', lang);
  if (typeof window !== 'undefined' && typeof window.onLanguageChanged === 'function') {
    try { window.onLanguageChanged(lang); } catch (e) {}
  }
}

document.querySelectorAll('.lang-switch button').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

// Initialize to current or default language
setLang(document.documentElement.getAttribute('lang') || 'en');
