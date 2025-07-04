function certImg(local, fallback, alt) {
  // If local is blank, use fallback directly
  if (!local) return `<img src="${fallback}" alt="${alt}" loading="lazy">`;
  const localPath = `assets/Images/${local}`;
  return `<img src="${localPath}" alt="${alt}" loading="lazy" onerror="this.onerror=null;this.src='${fallback}'">`;
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('./certificates.json')
    .then(r => r.json())
    .then(data => {
      const el = document.getElementById('certificateList');
      if (!el || !Array.isArray(data)) return;
      el.innerHTML = data.map(cert => {
        return `<li>
          ${certImg(cert.badgeLocal, cert.badgeFallback, cert.name)}
          <div>
            <strong>${cert.name}</strong><br>
            <span>${cert.issuer}</span>
            ${cert.link ? ` - <a href="${cert.link}" target="_blank" rel="noopener">View</a>` : ''}
          </div>
        </li>`;
      }).join('');
    });
});
