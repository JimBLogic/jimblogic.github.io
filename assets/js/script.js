document.addEventListener('DOMContentLoaded', () => {
  // Load certificates
  fetch('./certificates.json')
    .then(r => r.json())
    .then(data => {
      const el = document.getElementById('certificateList');
      if (el && Array.isArray(data.certificates)) {
        el.innerHTML = data.certificates.map(cert =>
          `<li>
            <img src="${cert.badge}" alt="${cert.name}">
            <div>
              <strong>${cert.name}</strong><br>
              <span>${cert.issuer}</span>
              ${cert.link ? ` - <a href="${cert.link}" target="_blank" rel="noopener">View</a>` : ''}
            </div>
          </li>`
        ).join('');
      }
    });

  // Load software
  fetch('./software.json')
    .then(r => r.json())
    .then(data => {
      const el = document.getElementById('softwareList');
      if (el && Array.isArray(data.software)) {
        el.innerHTML = data.software.map(soft =>
          `<li>
            <img src="${soft.icon}" alt="${soft.name}">
            <div>
              <strong>${soft.name}</strong>
              <br><span>${soft.description || ''}</span>
            </div>
          </li>`
        ).join('');
      }
    });

  // Load tools
  fetch('./tools.json')
    .then(r => r.json())
    .then(data => {
      const el = document.getElementById('toolsList');
      if (el && Array.isArray(data.tools)) {
        el.innerHTML = data.tools.map(tool =>
          `<li>
            <img src="${tool.icon}" alt="${tool.name}">
            <div>
              <strong>${tool.name}</strong>
              <br><span>${tool.description || ''}</span>
            </div>
          </li>`
        ).join('');
      }
    });

  // Highlight navbar link on scroll
  const links = document.querySelectorAll('.navbar-link');
  window.addEventListener('scroll', () => {
    let fromTop = window.scrollY + 90;
    links.forEach(link => {
      let section = document.querySelector(link.getAttribute('href'));
      if (
        section.offsetTop <= fromTop &&
        section.offsetTop + section.offsetHeight > fromTop
      ) {
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });
});
