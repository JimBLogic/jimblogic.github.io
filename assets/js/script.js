// Helper: try local, then fallback to CDN
function resolveImg(localPath, fallbackUrl) {
  // Try to fetch the localPath, if fails, use fallbackUrl
  // In HTML, <img onerror="..."> handles fallback, but for src, we always try local first.
  return { src: localPath, fallback: fallbackUrl };
}

function imgHtml({ src, fallback, alt }) {
  return `<img src="${src}" alt="${alt}" loading="lazy" onerror="this.onerror=null;this.src='${fallback}'">`;
}

document.addEventListener('DOMContentLoaded', () => {
  // CERTIFICATES
  fetch('./certificates.json')
    .then(r => r.json())
    .then(data => {
      const el = document.getElementById('certificateList');
      if (el && Array.isArray(data)) {
        el.innerHTML = data.map(cert => {
          // Try to use local badge if present, fallback to remote
          let baseName = cert.badgeLocal || '';
          let local = baseName ? `./assets/Images/${baseName}` : '';
          let fallback = cert.badge || 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/security.svg';
          return `<li>
            ${imgHtml({ src: local, fallback, alt: cert.name })}
            <div>
              <strong>${cert.name}</strong><br>
              <span>${cert.issuer}</span>
              ${cert.link ? ` - <a href="${cert.link}" target="_blank" rel="noopener">View</a>` : ''}
            </div>
          </li>`;
        }).join('');
      }
    });

  // SOFTWARE
  fetch('./software.json')
    .then(r => r.json())
    .then(data => {
      const el = document.getElementById('softwareList');
      if (el && Array.isArray(data)) {
        el.innerHTML = data.map(soft => {
          let local = soft.iconLocal ? `./assets/software/${soft.iconLocal}` : '';
          let fallback = soft.icon || 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/software.svg';
          return `<li>
            ${imgHtml({ src: local, fallback, alt: soft.name })}
            <div>
              <strong>${soft.name}</strong>
              <br><span>${soft.description || ''}</span>
            </div>
          </li>`;
        }).join('');
      }
    });

  // TOOLS
  fetch('./tools.json')
    .then(r => r.json())
    .then(data => {
      const el = document.getElementById('toolsList');
      if (el && Array.isArray(data)) {
        el.innerHTML = data.map(tool => {
          let local = tool.iconLocal ? `./assets/tools/${tool.iconLocal}` : '';
          let fallback = tool.icon || 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tools.svg';
          return `<li>
            ${imgHtml({ src: local, fallback, alt: tool.name })}
            <div>
              <strong>${tool.name}</strong>
              <br><span>${tool.description || ''}</span>
            </div>
          </li>`;
        }).join('');
      }
    });
});
