const translations = {
  es: {
    main_name: "Jaime R. de Frutos",
    title: "Analista de Ciberseguridad y Blockchain",
    email: "Correo",
    location: "Ubicación",
    location_value: "Islas Baleares, España",
    resume: "Currículum",
    openpdf: "Abrir PDF",
    about: "Sobre mí",
    about_1: "Soy un analista de ciberseguridad y profesional de Bitcoin con pasión por la defensa digital, análisis forense y privacidad.",
    looking_for_label: "Buscando:",
    looking_for_text: "Un puesto junior en ciberseguridad donde seguir aprendiendo y contribuir.",
    certifications: "Certificaciones",
    skills: "Habilidades",
    education: "Educación",
    software: "Software",
    tools: "Herramientas",
    contact: "Contacto",
  },
  ca: {
    main_name: "Jaime R. de Frutos",
    title: "Analista de Ciberseguretat i Blockchain",
    email: "Correu",
    location: "Ubicació",
    location_value: "Illes Balears, Espanya",
    resume: "Currículum",
    openpdf: "Obrir PDF",
    about: "Sobre mi",
    about_1: "Sóc un analista de ciberseguretat i professional de Bitcoin amb passió per la defensa digital, anàlisi forense i privadesa.",
    looking_for_label: "Busco:",
    looking_for_text: "Un lloc júnior en ciberseguretat on continuar aprenent i contribuir.",
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
}
document.querySelectorAll('.lang-switch button').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});
