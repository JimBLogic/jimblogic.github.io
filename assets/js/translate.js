const translations = {
  en: {
    main_name: "Jaime Ramsden de Frutos",
    title: "Aspiring Junior Cybersecurity Analyst & Bitcoiner",
    email: "Email",
    location: "Location",
    location_value: "Balearic Islands, Spain",
    resume: "Resume",
    openpdf: "Open PDF",
    about: "About Me",
    about_1: "I'm an aspiring junior cybersecurity analyst with hands-on training in ethical hacking, cloud security, and digital forensics.",
    looking_for_label: "Looking for:",
    looking_for_text: "An entry-level or junior cybersecurity role where I can keep learning and contribute.",
    certifications: "Certifications",
    skills: "Skills",
    education: "Education",
    software: "Software",
    tools: "Tools",
    contact: "Contact",
    contact_1: "Ready to collaborate? Reach out via email:",
    contact_2: "Or connect via <a href=' https://www.linkedin.com/in/jimblogic/ ' target='_blank'>LinkedIn</a> or view my public Bitcoin node at <a href='https://amboss.space/es/node/02ec23c7c0c1adb58a46f6ca5a5acbcebfb2972ede2ed6ba73de605fda5288509f ' target='_blank'>Amboss</a>."
  },
  es: {
    main_name: "Jaime R. de Frutos",
    title: "Analista de Ciberseguridad y Entusiasta de Bitcoin",
    email: "Correo",
    location: "Ubicación",
    location_value: "Islas Baleares, España",
    resume: "Currículum",
    openpdf: "Abrir PDF",
    about: "Sobre Mí",
    about_1: "Soy un analista de ciberseguridad junior con formación práctica en hacking ético, seguridad en la nube y análisis forense.",
    looking_for_label: "Buscando:",
    looking_for_text: "Un puesto júnior o de entrada en ciberseguridad donde seguir aprendiendo y contribuir.",
    certifications: "Certificaciones",
    skills: "Habilidades",
    education: "Educación",
    software: "Programari",
    tools: "Eines",
    contact: "Contacto",
    contact_1: "¿Listo para colaborar? Escríbeme:",
    contact_2: "O encuentra mi nodo público en <a href='https://amboss.space/es/node/02ec23c7c0c1adb58a46f6ca5a5acbcebfb2972ede2ed6ba73de605fda5288509f ' target='_blank'>Amboss</a>."
  },
  ca: {
    main_name: "Jaime R. de Frutos",
    title: "Analista de Ciberseguretat i Entusiasta de Bitcoin",
    email: "Correu",
    location: "Ubicació",
    location_value: "Illes Balears, Espanya",
    resume: "Currículum",
    openpdf: "Obrir PDF",
    about: "Sobre Mi",
    about_1: "Sóc un analista de ciberseguretat júnior amb formació pràctica en hacking ètic, seguretat al núvol i anàlisi forense.",
    looking_for_label: "Busco:",
    looking_for_text: "Una oportunitat júnior o d'inici en ciberseguretat per seguir aprenent i contribuir.",
    certifications: "Certificacions",
    skills: "Habilitats",
    education: "Educació",
    software: "Programari",
    tools: "Eines",
    contact: "Contacte",
    contact_1: "Preparat per col·laborar? Escriu-me:",
    contact_2: "També pots contactar per <a href='https://www.linkedin.com/in/jimblogic/ ' target='_blank'>LinkedIn</a> o veure el meu node públic a <a href='https://amboss.space/es/node/02ec23c7c0c1adb58a46f6ca5a5acbcebfb2972ede2ed6ba73de605fda5288509f ' target='_blank'>Amboss</a>."
  }
};

function setLang(lang) {
  document.documentElement.setAttribute("lang", lang);
  document.querySelectorAll("[data-txt]").forEach(el => {
    const key = el.getAttribute("data-txt");
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });
}
