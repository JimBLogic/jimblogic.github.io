function imgLocalFirst(local, fallback, alt) {
  // Try to use local image, fall back to remote if error
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
          const local = cert.badgeLocal ? `./assets/Images/${cert.badgeLocal}` : cert.badge;
          const fallback = cert.badge;
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
          const local = soft.iconLocal ? `./assets/Images/software/${soft.iconLocal}` : soft.icon;
          const fallback = soft.icon;
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
          const local = tool.iconLocal ? `./assets/Images/tools/${tool.iconLocal}` : tool.icon;
          const fallback = tool.icon;
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
