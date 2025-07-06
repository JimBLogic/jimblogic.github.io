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
  },
  ca: {
    main_name: "Jaime R. de Frutos",
    title: "Analista de Ciberseguretat · Hacker Ètic · Entusiasta de Bitcoin",
    email: "Correu",
    location: "Ubicació",
    location_value: "Illes Balears, Espanya",
    resume: "Currículum",
    openpdf: "Obrir PDF",
    about: "Sobre mi",
    certifications: "Certificacions",
    skills: "Habilitats",
    education: "Educació",
    software: "Programari",
    tools: "Eines",
    contact: "Contacte",
  }
};

function setLang(lang) {
  document.querySelectorAll("[data-txt]").forEach(el => {
    const key = el.getAttribute("data-txt");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  document.documentElement.setAttribute("lang", lang);
}

document.querySelectorAll('.lang-switch button').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});
