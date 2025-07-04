const translations = {
  es: {
    name: "Jaime R. de Frutos",
    title: "Aspirante a Junior en Ciberseguridad y Bitcoiner",
    email: "Correo",
    location: "Ubicación",
    location_value: "Islas Baleares, España",
    resume: "Currículum",
    openpdf: "Abrir PDF",
    about: "Sobre mí",
    about_1: "Soy un aspirante a junior en ciberseguridad con formación práctica en hacking ético, cloud y forense digital. Bitcoiner curioso, interesado en privacidad y software libre. Opero un nodo público de Bitcoin/Lightning.",
    about_2: "Recientemente completé un bootcamp intensivo en UpgradeHub y obtuve varios certificados en operaciones de seguridad y hacking ético. Me apasiona defender activos digitales, aprender herramientas nuevas y apoyar una Internet libre y abierta.",
    looking_for_label: "Buscando:",
    looking_for_text: "Un puesto de entrada o junior en ciberseguridad donde seguir aprendiendo y contribuir a la seguridad real.",
    certifications: "Certificaciones",
    skills: "Habilidades",
    skills_cyber: "<strong>Ciberseguridad:</strong> Hacking Ético, Pentesting, Análisis de Vulnerabilidades, Respuesta a Incidentes, SIEM, Forense Digital, OSINT, Detección de Amenazas, Gestión de Riesgos, Gobernanza, Evidencia, Seguridad Linux.",
    skills_btc: "<strong>Bitcoin:</strong> Operación de nodo Lightning, Seguridad Bitcoin, Análisis on-chain, Protocolos abiertos, Privacidad, Mitigación de Riesgos, Forense Bitcoin.",
    skills_cloud: "<strong>Cloud & Infra:</strong> AWS Cloud Practitioner, CloudFormation, Infraestructura como código.",
    skills_prog: "<strong>Programación & Scripting:</strong> Python, Bash, Django, Git, Bases de datos (SQL), Desarrollo Web.",
    skills_languages: "<strong>Idiomas:</strong> Inglés (Fluido), Español (Fluido).",
    skills_other: "<strong>Otros:</strong> Comunidad, Creación de Contenido, Atención al Cliente.",
    education: "Educación",
    edu_title: "Bootcamp Intensivo, Ciberseguridad, Hacking Ético y Cloud",
    edu_desc: "Bootcamp práctico en ciberseguridad, hacking ético y cloud. Uso de Kali, Metasploit, AWS y escenarios reales.",
    software: "Software",
    tools: "Herramientas",
    contact: "Contacto",
    contact_1: "¿Listo para colaborar? Escríbeme:",
    contact_2: "También puedes contactar por <a href='https://www.linkedin.com/in/jimblogic/' target='_blank'>LinkedIn</a> o ver mi nodo público en <a href='https://amboss.space/es/node/02ec23c7c0c1adb58a46f6ca5a5acbcebfb2972ede2ed6ba73de605fda5288509f' target='_blank'>Amboss</a>."
  },
  ca: {
    name: "Jaime R. de Frutos",
    title: "Aspirant Junior en Ciberseguretat i Bitcoiner",
    email: "Correu",
    location: "Ubicació",
    location_value: "Illes Balears, Espanya",
    resume: "Currículum",
    openpdf: "Obrir PDF",
    about: "Sobre mi",
    about_1: "Sóc aspirant junior en ciberseguretat amb formació pràctica en hacking ètic, cloud i forense digital. Bitcoiner curiós, interessat en privadesa i programari lliure. Oper un node públic de Bitcoin/Lightning.",
    about_2: "Recentment he completat un bootcamp intensiu a UpgradeHub i he obtingut diversos certificats en seguretat i hacking ètic. M'apassiona defensar actius digitals, aprendre eines noves i donar suport a una Internet lliure i oberta.",
    looking_for_label: "Busco:",
    looking_for_text: "Un lloc d'entrada o junior en ciberseguretat on continuar aprenent i contribuir a la seguretat real.",
    certifications: "Certificacions",
    skills: "Habilitats",
    skills_cyber: "<strong>Ciberseguretat:</strong> Hacking Ètic, Pentesting, Anàlisi de Vulnerabilitats, Resposta a Incidents, SIEM, Forense Digital, OSINT, Detecció d'Amenaces, Gestió de Riscos, Governança, Evidència, Seguretat Linux.",
    skills_btc: "<strong>Bitcoin:</strong> Operació de node Lightning, Seguretat Bitcoin, Anàlisi on-chain, Protocols oberts, Privadesa, Mitigació de Riscos, Forense Bitcoin.",
    skills_cloud: "<strong>Cloud & Infra:</strong> AWS Cloud Practitioner, CloudFormation, Infraestructura com a codi.",
    skills_prog: "<strong>Programació & Scripting:</strong> Python, Bash, Django, Git, Bases de dades (SQL), Desenvolupament Web.",
    skills_languages: "<strong>Idiomes:</strong> Anglès (Fluid), Espanyol (Fluid).",
    skills_other: "<strong>Altres:</strong> Comunitat, Creació de Contingut, Atenció al Client.",
    education: "Educació",
    edu_title: "Bootcamp Intensiu, Ciberseguretat, Hacking Ètic i Cloud",
    edu_desc: "Bootcamp pràctic en ciberseguretat, hacking ètic i cloud. Ús de Kali, Metasploit, AWS i escenaris reals.",
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
