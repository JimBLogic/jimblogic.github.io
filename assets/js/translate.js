const translations = {
  en: {
    main_name: "Jaime Ramsden de Frutos",
    title: "Cybersecurity Analyst · Ethical Hacker · Bitcoin Enthusiast",
    email: "Email",
    location: "Location",
    location_value: "Balearic Islands, Spain",
    resume: "Resume",
    openpdf: "Open PDF",
    about: "About Me",
    certifications: "Certifications",
    skills: "Skills",
    education: "Education",
    software: "Software",
    tools: "Tools",
    contact: "Contact",
    contact_1: "Ready to collaborate? Reach out via email:",
    contact_2: "Or connect via <a href=' https://www.linkedin.com/in/jimblogic/ ' target='_blank'>LinkedIn</a>"
  },
  es: {
    main_name: "Jaime R. de Frutos",
    title: "Analista de Ciberseguridad · Hacker Ético · Entusiasta de Bitcoin",
    email: "Correo",
    location: "Ubicación",
    location_value: "Islas Baleares, España",
    resume: "Currículum",
    openpdf: "Abrir PDF",
    about: "Sobre Mí",
    certifications: "Certificaciones",
    skills: "Habilidades",
    education: "Educación",
    software: "Programari",
    tools: "Eines",
    contact: "Contacto",
    contact_1: "¿Listo para colaborar? Escríbeme:",
    contact_2: "O encuentra mi nodo público en <a href='https://amboss.space/es/node/02ec23c7c0c1adb58a46f6ca5a5acbcebfb2972ede2ed6ba73de605fda5288509f ' target='_blank'>Amboss</a>"
  },
  ca: {
    main_name: "Jaime R. de Frutos",
    title: "Analista de Ciberseguretat · Hacker Ètic · Entusiasta de Bitcoin",
    email: "Correu",
    location: "Ubicació",
    location_value: "Illes Balears, Espanya",
    resume: "Currículum",
    openpdf: "Obrir PDF",
    about: "Sobre Mi",
    certifications: "Certificacions",
    skills: "Habilitats",
    education: "Educació",
    software: "Programari",
    tools: "Eines",
    contact: "Contacte",
    contact_1: "Preparat per col·laborar? Escriu-me:",
    contact_2: "També pots contactar per <a href='https://www.linkedin.com/in/jimblogic/ ' target='_blank'>LinkedIn</a>"
  }
};

function setLang(lang) {
  document.querySelectorAll("[data-txt]").forEach(el => {
    const key = el.getAttribute("data-txt");
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });
  document.documentElement.setAttribute("lang", lang);
}

document.querySelectorAll('.lang-switch button').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});
