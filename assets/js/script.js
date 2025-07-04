function imgLocalFirst(local, fallback, alt) {
  // If local image is not present, onerror falls back to fallback URL
  return `<img src="${local}" alt="${alt}" loading="lazy" onerror="this.onerror=null;this.src='${fallback}'">`;
}

document.addEventListener('DOMContentLoaded', () => {
  // Certifications
  fetch('./certificates.json')
    .then(r => r.json())
    .then(data => {
      const el = document.getElementById('certificateList');
      if (el && Array.isArray(data)) {
        el.innerHTML = data.map(cert => {
          const local = cert.badgeLocal ? `./assets/Images/${cert.badgeLocal}` : '';
          const fallback = cert.badge || 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/security.svg';
          return `<li>
            ${imgLocalFirst(local, fallback, cert.name)}
            <div>
              <strong>${cert.name}</strong><br>
              <span>${cert.issuer}</span>
              ${cert.link ? ` - <a href="${cert.link}" target="_blank" rel="noopener">View</a>` : ''}
            </div>
          </li>`;
        }).join('');
      }
    });

  // Software
  fetch('./software.json')
    .then(r => r.json())
    .then(data => {
      const el = document.getElementById('softwareList');
      if (el && Array.isArray(data)) {
        el.innerHTML = data.map(soft => {
          const local = soft.iconLocal ? `./assets/Images/software/${soft.iconLocal}` : '';
          const fallback = soft.icon || 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/software.svg';
          return `<li>
            ${imgLocalFirst(local, fallback, soft.name)}
            <div>
              <strong>${soft.name}</strong>
              <br><span>${soft.description || ''}</span>
            </div>
          </li>`;
        }).join('');
      }
    });

  // Tools
  fetch('./tools.json')
    .then(r => r.json())
    .then(data => {
      const el = document.getElementById('toolsList');
      if (el && Array.isArray(data)) {
        el.innerHTML = data.map(tool => {
          const local = tool.iconLocal ? `./assets/Images/tools/${tool.iconLocal}` : '';
          const fallback = tool.icon || 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tools.svg';
          return `<li>
            ${imgLocalFirst(local, fallback, tool.name)}
            <div>
              <strong>${tool.name}</strong>
              <br><span>${tool.description || ''}</span>
            </div>
          </li>`;
        }).join('');
      }
    });
});
