// Attempt to load locales from JSON files first; fallback to built-in translations
const translations = {
  "en": {
    "main_name": "Jaime Ramsden de Frutos",
    "title": "Junior SOC Analyst / Blue Team Candidate",
    "about": "About Me",
    "skills": "Skills",
    "education": "Education",
    "passion": "Passion & Interests",
    "software": "Software",
    "journey": "Learning Journey",
    "projects": "Projects",
    "tools": "Tools",
    "contact": "Contact",
    "view_certificate": "View Certificate",
    "learn_more": "Learn More",
    "view_repo": "View Repo",
    "profile_highlights": "Profile Highlights",
    "view_github_profile": "View GitHub Profile",
    "github_error": "Could not load repositories right now.",
    "content_error": "This content could not be loaded.",
    "certificates": "certificates",
    "filter_all": "All",
    "open": "Open",
    "projects_expand": "Expand",
    "projects_collapse": "Collapse",
    "show_more": "Show more",
    "show_less": "Show less",
    "hero_eyebrow": "Junior SOC Analyst / Blue Team candidate",
    "hero_statement": "I am building the skills to turn logs, network signals and documented procedures into clear defensive findings. My flagship proof of work is a Raspberry Pi 4 homelab focused on monitoring, tested backups, Docker services and Linux hardening.",
    "hero_projects": "View proof of work",
    "hero_certifications": "Review certificates",
    "focus": "Current Focus",
    "focus_lab_title": "Raspberry Pi 4 defensive homelab",
    "focus_lab_desc": "Currently building a small blue-team lab for Linux hardening, Dockerized services, monitoring, log review, tested backups and network visibility.",
    "focus_soc_title": "SOC foundations",
    "focus_soc_desc": "Practicing alert triage, incident notes, digital forensics basics, OSINT workflows and threat-intelligence reading without overstating production experience.",
    "focus_cloud_title": "AWS cloud foundations",
    "focus_cloud_desc": "Preparing as an AWS Cloud Practitioner candidate while reinforcing IAM, shared responsibility, billing awareness and secure cloud basics.",
    "about_btn_2": "AWS Foundations",
    "about_btn_3": "Blue Team",
    "about_p1": "I'm a junior SOC Analyst / Blue Team candidate building practical defensive skills through a Raspberry Pi 4 homelab, Linux administration, Docker services, network monitoring, log review, tested backups and hardening. I completed a full-time cybersecurity bootcamp at <a href='./assets/pdfs/UpgradeHub/UpgradeHub Cert.pdf' target='_blank' rel='noopener noreferrer'>UpgradeHub</a> and continue studying digital forensics, incident response, OSINT, threat intelligence and AWS cloud foundations.",
    "about_p2": "An entry-level SOC, Blue Team or security operations role where I can triage alerts, document findings, learn from senior analysts and contribute reliable defensive work.",
    "skills_intro": "My skills are junior-level, practical and lab-driven: enough to contribute carefully, ask good questions and keep improving through documented hands-on work.",
    "projects_intro": "Real repositories are loaded from GitHub. The featured item is selected to show practical proof of work; active lab work is marked honestly as currently building.",
    "email": "Email",
    "location": "Location",
    "location_value": "Balearic Islands, Spain",
    "resume": "Resume",
    "openpdf": "Open PDF",
    "certifications": "Certifications",
    "contact_1": "Ready to collaborate? Reach out via email:",
    "contact_2": "Or connect via <a href='https://www.linkedin.com/in/jimblogic/' target='_blank' rel='noopener noreferrer'>LinkedIn</a>",
    "passion_intro": "Beyond technical skills, I'm driven by curiosity, privacy, open-source tools and Bitcoin self-sovereignty.",
    "passion_bitcoin_title": "Bitcoin & Financial Sovereignty",
    "passion_bitcoin_desc": "Running my own Bitcoin Lightning node to support the decentralized network and learn more about resilient, peer-to-peer infrastructure.",
    "passion_bitcoin_link": "View my Lightning Node →",
    "passion_privacy_title": "Privacy & Open Source",
    "passion_privacy_desc": "Advocate for digital privacy and open-source software. I use privacy-focused tools like Proton Mail and prefer transparent, user-controlled technology.",
    "passion_learning_title": "Continuous Learning",
    "passion_learning_desc": "Cybersecurity changes quickly, so I keep learning through labs, documentation, CTF-style practice and security research reading.",
    "passion_learning_link": "Explore my learning journey →",
    "passion_community_title": "Community & Documentation",
    "passion_community_desc": "I document learning paths and projects on GitHub so reviewers can inspect real progress and practical work.",
    "passion_community_link": "View my GitHub →",
    "about_btn_1": "Cybersecurity",
    "about_btn_4": "Digital Forensics",
    "about_btn_5": "OSINT",
    "about_btn_6": "Bitcoin",
    "about_p2_label": "Looking for:",
    "about_p3": "Learning journeys and certificates hosted on GitHub:",
    "skills_1_title": "Blue Team Foundations:",
    "skills_1_desc": "SOC concepts, alert triage, incident notes, NIST CSF awareness and careful documentation",
    "skills_2_title": "Networking & Monitoring:",
    "skills_2_desc": "TCP/IP fundamentals, Wireshark, basic IDS concepts, log review and Raspberry Pi 4 network visibility",
    "skills_3_title": "Digital Forensics:",
    "skills_3_desc": "Evidence handling basics, timeline thinking, incident response notes and preserving digital evidence in lab scenarios",
    "skills_4_title": "Cloud Security:",
    "skills_4_desc": "AWS Cloud Practitioner candidate study, IAM basics, shared responsibility and secure cloud foundation concepts",
    "skills_5_title": "Linux, Docker & Hardening:",
    "skills_5_desc": "Linux administration, Docker services, update routines, backups, least privilege and defensive configuration practice",
    "skills_6_title": "Programming:",
    "skills_6_desc": "Python basics, Bash scripting and SQL queries for lab automation, data handling and repeatable security practice",
    "skills_7_title": "Threat Analysis:",
    "skills_7_desc": "Threat intelligence reading, OSINT basics, risk thinking and beginner threat-hunting methodology",
    "edu_bootcamp_title": "Cybersecurity Bootcamp",
    "edu_bootcamp_org": "UpgradeHub",
    "edu_bootcamp_date": "2024",
    "edu_bootcamp_desc": "Intensive full-time program covering ethical hacking, cloud security, digital forensics and incident response foundations with hands-on labs.",
    "edu_continuous_title": "Continuous Learning",
    "edu_continuous_org": "Cybrary, Security Blue Team, IBM",
    "edu_continuous_date": "Ongoing",
    "edu_continuous_desc": "Active engagement in cybersecurity learning platforms to stay current with defensive concepts, tools and security technologies."
  },
  "es": {
    "main_name": "Jaime Ramsden de Frutos",
    "title": "Candidato a Analista SOC Junior / Blue Team",
    "about": "Acerca de Mí",
    "skills": "Competencias",
    "education": "Formación",
    "passion": "Pasión e Intereses",
    "software": "Software",
    "journey": "Trayectoria de Aprendizaje",
    "projects": "Proyectos",
    "tools": "Herramientas",
    "contact": "Contacto",
    "view_certificate": "Ver Certificado",
    "learn_more": "Más Información",
    "view_repo": "Ver Repositorio",
    "profile_highlights": "Destacados del Perfil",
    "view_github_profile": "Ver Perfil de GitHub",
    "github_error": "No se pudieron cargar los repositorios en este momento.",
    "content_error": "No se ha podido cargar este contenido.",
    "certificates": "certificados",
    "filter_all": "Todos",
    "open": "Abrir",
    "projects_expand": "Ver todos",
    "projects_collapse": "Ver menos",
    "show_more": "Ver más",
    "show_less": "Ver menos",
    "hero_eyebrow": "Candidato a Analista SOC Junior / Blue Team",
    "hero_statement": "Estoy desarrollando la capacidad de convertir logs, señales de red y procedimientos documentados en hallazgos defensivos claros. Mi principal proyecto práctico es un homelab con Raspberry Pi 4 centrado en monitorización, copias de seguridad verificadas, servicios Docker y hardening de Linux.",
    "hero_projects": "Ver proyectos prácticos",
    "hero_certifications": "Ver certificados",
    "focus": "Enfoque actual",
    "focus_lab_title": "Homelab defensivo con Raspberry Pi 4",
    "focus_lab_desc": "Actualmente construyo un pequeño laboratorio de Blue Team para hardening de Linux, servicios Docker, monitorización, revisión de logs, copias de seguridad verificadas y visibilidad de red.",
    "focus_soc_title": "Fundamentos SOC",
    "focus_soc_desc": "Practico triaje de alertas, notas de incidente, fundamentos de forense digital, flujos OSINT y lectura de inteligencia de amenazas sin exagerar experiencia profesional.",
    "focus_cloud_title": "Fundamentos cloud AWS",
    "focus_cloud_desc": "Me preparo como candidato a AWS Cloud Practitioner reforzando IAM, responsabilidad compartida, control de costes y fundamentos de seguridad en AWS.",
    "about_btn_2": "Fundamentos AWS",
    "about_btn_3": "Blue Team",
    "about_p2": "Un puesto inicial SOC, Blue Team u operaciones de seguridad donde pueda analizar y priorizar alertas, documentar hallazgos, aprender de analistas senior y aportar trabajo defensivo fiable.",
    "skills_intro": "Mis habilidades son junior, prácticas y basadas en laboratorio: suficientes para contribuir con cuidado, hacer buenas preguntas y seguir mejorando con trabajo documentado.",
    "projects_intro": "Los repositorios reales se cargan desde GitHub. El elemento destacado muestra prueba práctica de trabajo; el laboratorio activo se marca honestamente como en construcción.",
    "email": "Correo",
    "location": "Ubicación",
    "location_value": "Islas Baleares, España",
    "resume": "Currículum",
    "openpdf": "Abrir PDF",
    "certifications": "Certificaciones",
    "contact_1": "¿Listo para colaborar? Escríbeme:",
    "contact_2": "O conecta conmigo en <a href='https://www.linkedin.com/in/jimblogic/' target='_blank' rel='noopener noreferrer'>LinkedIn</a>",
    "passion_intro": "Además de la formación técnica, me interesan la privacidad, las herramientas de código abierto y la soberanía financiera con Bitcoin.",
    "passion_bitcoin_title": "Bitcoin y soberanía financiera",
    "passion_bitcoin_desc": "Mantengo mi propio nodo Lightning de Bitcoin para apoyar la red descentralizada y aprender sobre infraestructura resiliente peer-to-peer.",
    "passion_bitcoin_link": "Ver mi nodo Lightning →",
    "passion_privacy_title": "Privacidad y código abierto",
    "passion_privacy_desc": "Defiendo la privacidad digital y el software de código abierto. Uso herramientas centradas en la privacidad como Proton Mail y prefiero tecnología transparente y controlada por el usuario.",
    "passion_learning_title": "Aprendizaje continuo",
    "passion_learning_desc": "La ciberseguridad cambia rápidamente, así que sigo aprendiendo mediante laboratorios, documentación, práctica tipo CTF y lectura de investigación de seguridad.",
    "passion_learning_link": "Explorar mi trayectoria de aprendizaje →",
    "passion_community_title": "Comunidad y documentación",
    "passion_community_desc": "Documento rutas de aprendizaje y proyectos en GitHub para que se pueda revisar mi progreso real y mi trabajo práctico.",
    "passion_community_link": "Ver mi GitHub →",
    "about_btn_1": "Ciberseguridad",
    "about_btn_4": "Forense digital",
    "about_btn_5": "OSINT",
    "about_btn_6": "Bitcoin",
    "about_p1": "Soy candidato a Analista SOC Junior / Blue Team y estoy desarrollando habilidades defensivas prácticas con un homelab con Raspberry Pi 4, administración Linux, servicios Docker, monitorización de red, revisión de logs, copias de seguridad verificadas y hardening. Completé un bootcamp intensivo de ciberseguridad en <a href='./assets/pdfs/UpgradeHub/UpgradeHub Cert.pdf' target='_blank' rel='noopener noreferrer'>UpgradeHub</a> y sigo estudiando forense digital, respuesta a incidentes, OSINT, inteligencia de amenazas y fundamentos de AWS.",
    "about_p2_label": "Busco:",
    "about_p3": "Rutas de aprendizaje y certificados alojados en GitHub:",
    "skills_1_title": "Fundamentos de Blue Team:",
    "skills_1_desc": "Conceptos SOC, triaje de alertas, notas de incidente, nociones de NIST CSF y documentación cuidadosa",
    "skills_2_title": "Redes y monitorización:",
    "skills_2_desc": "Fundamentos TCP/IP, Wireshark, conceptos básicos de IDS, revisión de logs y visibilidad de red con Raspberry Pi 4",
    "skills_3_title": "Forense digital:",
    "skills_3_desc": "Bases de tratamiento de evidencias, análisis temporal, notas de respuesta a incidentes y preservación de evidencias digitales en laboratorios",
    "skills_4_title": "Seguridad cloud:",
    "skills_4_desc": "Estudio como candidato a AWS Cloud Practitioner, fundamentos de IAM, responsabilidad compartida y bases de seguridad en AWS",
    "skills_5_title": "Linux, Docker y hardening:",
    "skills_5_desc": "Administración Linux, servicios Docker, rutinas de actualización, copias de seguridad, mínimo privilegio y práctica de configuración defensiva",
    "skills_6_title": "Programación:",
    "skills_6_desc": "Bases de Python, scripting Bash y consultas SQL para automatización en laboratorio, tratamiento de datos y práctica de seguridad repetible",
    "skills_7_title": "Análisis de amenazas:",
    "skills_7_desc": "Lectura de inteligencia de amenazas, fundamentos OSINT, análisis de riesgo y metodología inicial de threat hunting",
    "edu_bootcamp_title": "Bootcamp de ciberseguridad",
    "edu_bootcamp_org": "UpgradeHub",
    "edu_bootcamp_date": "2024",
    "edu_bootcamp_desc": "Programa intensivo a tiempo completo sobre fundamentos de ethical hacking, seguridad cloud, forense digital y respuesta a incidentes con laboratorios prácticos.",
    "edu_continuous_title": "Aprendizaje continuo",
    "edu_continuous_org": "Cybrary, Security Blue Team, IBM",
    "edu_continuous_date": "En curso",
    "edu_continuous_desc": "Participación activa en plataformas de aprendizaje de ciberseguridad para mantenerme al día en conceptos defensivos, herramientas y tecnologías de seguridad."
  },
  "ca": {
    "main_name": "Jaime Ramsden de Frutos",
    "title": "Candidat a Analista SOC Junior / Blue Team",
    "about": "Sobre mi",
    "skills": "Competències",
    "education": "Formació",
    "passion": "Passió i Interessos",
    "software": "Programari",
    "journey": "Trajectòria d'Aprenentatge",
    "projects": "Projectes",
    "tools": "Eines",
    "contact": "Contacte",
    "view_certificate": "Veure Certificat",
    "learn_more": "Més Informació",
    "view_repo": "Veure Repositori",
    "profile_highlights": "Destacats del Perfil",
    "view_github_profile": "Veure Perfil de GitHub",
    "github_error": "No s'han pogut carregar els repositoris ara mateix.",
    "content_error": "No s’ha pogut carregar aquest contingut.",
    "certificates": "certificats",
    "filter_all": "Tots",
    "open": "Obrir",
    "projects_expand": "Veure tots",
    "projects_collapse": "Veure menys",
    "show_more": "Veure més",
    "show_less": "Veure menys",
    "hero_eyebrow": "Candidat a Analista SOC Junior / Blue Team",
    "hero_statement": "Estic desenvolupant la capacitat de convertir logs, senyals de xarxa i procediments documentats en conclusions defensives clares. El meu principal projecte pràctic és un homelab amb Raspberry Pi 4 centrat en monitoratge, còpies de seguretat verificades, serveis Docker i hardening de Linux.",
    "hero_projects": "Veure projectes pràctics",
    "hero_certifications": "Veure certificats",
    "focus": "Enfocament actual",
    "focus_lab_title": "Homelab defensiu amb Raspberry Pi 4",
    "focus_lab_desc": "Actualment construeixo un petit laboratori de Blue Team per a hardening de Linux, serveis Docker, monitoratge, revisió de logs, còpies de seguretat verificades i visibilitat de xarxa.",
    "focus_soc_title": "Fonaments SOC",
    "focus_soc_desc": "Practico triatge d’alertes, notes d’incident, fonaments d’informàtica forense, fluxos OSINT i lectura d’intel·ligència d’amenaces sense exagerar experiència professional.",
    "focus_cloud_title": "Fonaments cloud AWS",
    "focus_cloud_desc": "Em preparo com a candidat a AWS Cloud Practitioner reforçant IAM, responsabilitat compartida, control de costos i fonaments de seguretat a AWS.",
    "about_btn_2": "Fonaments AWS",
    "about_btn_3": "Blue Team",
    "about_p2": "Un lloc inicial SOC, Blue Team o operacions de seguretat on pugui fer el triatge d’alertes, documentar conclusions, aprendre d’analistes sènior i aportar una feina defensiva fiable.",
    "skills_intro": "Les meves habilitats són junior, pràctiques i basades en laboratori: suficients per contribuir amb cura, fer bones preguntes i continuar millorant amb feina documentada.",
    "projects_intro": "Els repositoris reals es carreguen des de GitHub. L’element destacat mostra treball pràctic; el laboratori actiu es marca honestament com en construcció.",
    "email": "Correu",
    "location": "Ubicació",
    "location_value": "Illes Balears, Espanya",
    "resume": "Currículum",
    "openpdf": "Obrir PDF",
    "certifications": "Certificacions",
    "contact_1": "Preparat per col·laborar? Escriu-me:",
    "contact_2": "També pots contactar amb mi a <a href='https://www.linkedin.com/in/jimblogic/' target='_blank' rel='noopener noreferrer'>LinkedIn</a>",
    "passion_intro": "A més de la formació tècnica, m’interessen la privacitat, les eines de codi obert i la sobirania financera amb Bitcoin.",
    "passion_bitcoin_title": "Bitcoin i sobirania financera",
    "passion_bitcoin_desc": "Mantinc el meu propi node Lightning de Bitcoin per donar suport a la xarxa descentralitzada i aprendre sobre infraestructura resilient peer-to-peer.",
    "passion_bitcoin_link": "Veure el meu node Lightning →",
    "passion_privacy_title": "Privacitat i codi obert",
    "passion_privacy_desc": "Defenso la privacitat digital i el programari de codi obert. Uso eines centrades en la privacitat com Proton Mail i prefereixo tecnologia transparent i controlada per l’usuari.",
    "passion_learning_title": "Aprenentatge continu",
    "passion_learning_desc": "La ciberseguretat canvia ràpidament, així que continuo aprenent amb laboratoris, documentació, pràctica tipus CTF i lectura de recerca en seguretat.",
    "passion_learning_link": "Explora la meva trajectòria d’aprenentatge →",
    "passion_community_title": "Comunitat i documentació",
    "passion_community_desc": "Documento rutes d’aprenentatge i projectes a GitHub perquè es pugui revisar el meu progrés real i la meva feina pràctica.",
    "passion_community_link": "Veure el meu GitHub →",
    "about_btn_1": "Ciberseguretat",
    "about_btn_4": "Informàtica forense",
    "about_btn_5": "OSINT",
    "about_btn_6": "Bitcoin",
    "about_p1": "Soc candidat a Analista SOC Junior / Blue Team i estic desenvolupant habilitats defensives pràctiques amb un homelab amb Raspberry Pi 4, administració Linux, serveis Docker, monitoratge de xarxa, revisió de logs, còpies de seguretat verificades i hardening. Vaig completar un bootcamp intensiu de ciberseguretat a <a href='./assets/pdfs/UpgradeHub/UpgradeHub Cert.pdf' target='_blank' rel='noopener noreferrer'>UpgradeHub</a> i continuo estudiant informàtica forense, resposta a incidents, OSINT, intel·ligència d’amenaces i fonaments d’AWS.",
    "about_p2_label": "Cerco:",
    "about_p3": "Rutes d’aprenentatge i certificats allotjats a GitHub:",
    "skills_1_title": "Fonaments de Blue Team:",
    "skills_1_desc": "Conceptes SOC, triatge d’alertes, notes d’incident, nocions de NIST CSF i documentació acurada",
    "skills_2_title": "Xarxes i monitoratge:",
    "skills_2_desc": "Fonaments TCP/IP, Wireshark, conceptes bàsics d’IDS, revisió de logs i visibilitat de xarxa amb Raspberry Pi 4",
    "skills_3_title": "Informàtica forense:",
    "skills_3_desc": "Bases de tractament d’evidències, anàlisi temporal, notes de resposta a incidents i preservació d’evidències digitals en laboratoris",
    "skills_4_title": "Seguretat cloud:",
    "skills_4_desc": "Estudi com a candidat a AWS Cloud Practitioner, fonaments d’IAM, responsabilitat compartida i bases de seguretat a AWS",
    "skills_5_title": "Linux, Docker i hardening:",
    "skills_5_desc": "Administració Linux, serveis Docker, rutines d’actualització, còpies de seguretat, mínim privilegi i pràctica de configuració defensiva",
    "skills_6_title": "Programació:",
    "skills_6_desc": "Bases de Python, scripting Bash i consultes SQL per a automatització en laboratori, tractament de dades i pràctica de seguretat repetible",
    "skills_7_title": "Anàlisi d’amenaces:",
    "skills_7_desc": "Lectura d’intel·ligència d’amenaces, fonaments OSINT, anàlisi de risc i metodologia inicial de threat hunting",
    "edu_bootcamp_title": "Bootcamp de ciberseguretat",
    "edu_bootcamp_org": "UpgradeHub",
    "edu_bootcamp_date": "2024",
    "edu_bootcamp_desc": "Programa intensiu a temps complet sobre fonaments d’ethical hacking, seguretat cloud, informàtica forense i resposta a incidents amb laboratoris pràctics.",
    "edu_continuous_title": "Aprenentatge continu",
    "edu_continuous_org": "Cybrary, Security Blue Team, IBM",
    "edu_continuous_date": "En curs",
    "edu_continuous_desc": "Participació activa en plataformes d’aprenentatge de ciberseguretat per mantenir-me al dia en conceptes defensius, eines i tecnologies de seguretat."
  }
};

if (typeof window !== 'undefined') {
  window.translations = translations;
}

async function loadLocale(lang) {
  try {
    const res = await fetch(`./assets/locales/${lang}.json`);
    if (!res.ok) return null;
    return await res.json();
  } catch (_e) {
    return null;
  }
}

function t(key) {
  const lang = (document.documentElement.getAttribute('lang') || 'en').toLowerCase();
  return (window.translations && window.translations[lang] && window.translations[lang][key]) ||
         (window.translations && window.translations.en && window.translations.en[key]) || key;
}

async function setLang(lang) {
  lang = (lang || 'en').toLowerCase();
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

document.querySelectorAll('.lang-switch button[data-lang]').forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    setLang(lang);
    document.querySelectorAll('.lang-switch button[data-lang]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

setLang(document.documentElement.getAttribute('lang') || 'en');