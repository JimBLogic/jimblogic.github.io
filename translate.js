const translations = {
  es: {
    name: "Jaime R. de Frutos",
    title: "Analista de Ciberseguridad y Blockchain",
    email: "Correo",
    location: "Ubicación",
    location_value: "Islas Baleares, España",
    resume: "Currículum",
    openpdf: "Abrir PDF",
    about: "Sobre mí",
    about_1: "Soy un analista de ciberseguridad y profesional de Bitcoin/blockchain con pasión por la defensa digital, el análisis forense y la privacidad.",
    about_2: "Recientemente completé un bootcamp intensivo en UpgradeHub y poseo certificaciones en operaciones de seguridad, hacking ético y Bitcoin. Apasionado por el código abierto y la descentralización.",
    looking_for_label: "Buscando:",
    looking_for_text: "Un puesto junior o de entrada en ciberseguridad o blockchain para aportar valor y seguir aprendiendo.",
    certifications: "Certificaciones",
    skills: "Habilidades",
    skills_cyber: "<strong>Ciberseguridad:</strong> Hacking Ético, Pentesting, Análisis de Vulnerabilidades, Respuesta a Incidentes, SIEM, Forense Digital, OSINT, Detección de Amenazas, Gestión de Riesgos, Gobernanza.",
    skills_btc: "<strong>Blockchain & Bitcoin:</strong> Operador de nodo Lightning, Seguridad Bitcoin, Análisis on-chain, Protocolos abiertos, Privacidad.",
    skills_cloud: "<strong>Cloud & Infra:</strong> AWS Cloud Practitioner, CloudFormation, Infraestructura como código.",
    skills_prog: "<strong>Programación & Scripting:</strong> Python, Bash, Django, Git, Bases de datos (SQL), Desarrollo Web.",
    skills_languages: "<strong>Idiomas:</strong> Inglés (Fluido), Español (Fluido).",
    skills_other: "<strong>Otros:</strong> Comunidad, Creación de Contenido, Atención al Cliente.",
    education: "Educación",
    edu_title: "Bootcamp Intensivo, Ciberseguridad, Hacking Ético y Cloud",
    edu_desc: "Bootcamp práctico en ciberseguridad, hacking ético y cloud. Uso de Kali, Metasploit, AWS, y escenarios reales.",
    software: "Software",
    tools: "Herramientas",
    contact: "Contacto",
    contact_1: "¿Listo para colaborar? Escríbeme:",
    contact_2: "También puedes contactar por <a href='https://www.linkedin.com/in/jimblogic/' target='_blank'>LinkedIn</a> o ver mi nodo público en <a href='https://amboss.space/es/node/02ec23c7c0c1adb58a46f6ca5a5acbcebfb2972ede2ed6ba73de605fda5288509f' target='_blank'>Amboss</a>."
  },
  ca: {
    name: "Jaime R. de Frutos",
    title: "Analista de Ciberseguretat i Blockchain",
    email: "Correu",
    location: "Ubicació",
    location_value: "Illes Balears, Espanya",
    resume: "Currículum",
    openpdf: "Obrir PDF",
    about: "Sobre mi",
    about_1: "Sóc un analista de ciberseguretat i professional de Bitcoin/blockchain apassionat per la defensa digital, anàlisi forense i privadesa.",
    about_2: "Recentment he completat un bootcamp intensiu a UpgradeHub i tinc certificacions en seguretat, hacking ètic i Bitcoin. Apassionat pel codi obert i la descentralització.",
    looking_for_label: "Busco:",
    looking_for_text: "Un lloc júnior o d'entrada en ciberseguretat o blockchain on aportar valor i seguir aprenent.",
    certifications: "Certificacions",
    skills: "Habilitats",
    skills_cyber: "<strong>Ciberseguretat:</strong> Hacking Ètic, Pentesting, Anàlisi de Vulnerabilitats, Resposta a Incidents, SIEM, Forense Digital, OSINT, Detecció d'Amenaces, Gestió de Riscos, Governança.",
    skills_btc: "<strong>Blockchain & Bitcoin:</strong> Operador de node Lightning, Seguretat Bitcoin, Anàlisi on-chain, Protocols oberts, Privadesa.",
    skills_cloud: "<strong>Cloud & Infra:</strong> AWS Cloud Practitioner, CloudFormation, Infraestructura com a codi.",
    skills_prog: "<strong>Programació & Scripting:</strong> Python, Bash, Django, Git, Bases de dades (SQL), Desenvolupament Web.",
    skills_languages: "<strong>Idiomes:</strong> Anglès (Fluid), Espanyol (Fluid).",
    skills_other: "<strong>Altres:</strong> Comunitat, Creació de Contingut, Atenció al Client.",
    education: "Educació",
    edu_title: "Bootcamp Intensiu, Ciberseguretat, Hacking Ètic i Cloud",
    edu_desc: "Bootcamp pràctic en ciberseguretat, hacking ètic i cloud. Ús de Kali, Metasploit, AWS, i escenaris reals.",
    software: "Programari",
    tools: "Eines",
    contact: "Contacte",
    contact_1: "Preparat per col·laborar? Escriu-me:",
    contact_2: "També pots contactar per <a href='https://www.linkedin.com/in/jimblogic/' target='_blank'>LinkedIn</a> o veure el meu node públic a <a href='https://amboss.space/es/node/02ec23c7c0c1adb58a46f6ca5a5acbcebfb2972ede2ed6ba73de605fda5288509f' target='_blank'>Amboss</a>."
  }
};

function setLang(lang) {
  document.querySelectorAll("[data-txt]").forEach(el => {
    const key = el.getAttribute("data-txt");
    if (translations[lang] && translations[lang][key]) {
      if (el.tagName === "INPUT") {
        el.placeholder = translations[lang][key];
      } else {
        el.innerHTML = translations[lang][key];
      }
    }
  });
  document.documentElement.lang = lang;
}

document.querySelectorAll('.lang-switch button').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.getAttribute('data-lang')));
});
