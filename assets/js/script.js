function imgLocalThenOnline(local, fallback, alt, prefix = "") {
  // Fix: If no local, try fallback; if no fallback, show default placeholder
  const defaultImg = "./assets/Images/default.png"; // Place a visible default icon here!
  if (local) {
    const localPath = prefix + local;
    return `<img src="${localPath}" alt="${alt}" loading="lazy" 
      onerror="this.onerror=null;this.src='${fallback || defaultImg}';"
    >`;
  }
  if (fallback) {
    return `<img src="${fallback}" alt="${alt}" loading="lazy"
      onerror="this.onerror=null;this.src='${defaultImg}';"
    >`;
  }
  return `<img src="${defaultImg}" alt="${alt}" loading="lazy">`;
}

function renderCertList(jsonFile, listId) {
  fetch(jsonFile)
    .then(r => r.json())
    .then(data => {
      const el = document.getElementById(listId);
      if (!el || !Array.isArray(data)) return;
      el.innerHTML = data.map(cert => {
        return `<li>
          ${imgLocalThenOnline(cert.badgeLocal, cert.badgeWeb, cert.name, "assets/Images/")}
          <div>
            <strong>${cert.name}</strong><br>
            <span>${cert.issuer}</span>
            ${cert.link ? ` - <a href="${cert.link}" target="_blank" rel="noopener">View</a>` : ''}
          </div>
        </li>`;
      }).join('');
    });
}

function renderList(jsonFile, listId, folder) {
  fetch(jsonFile)
    .then(r => r.json())
    .then(data => {
      const el = document.getElementById(listId);
      if (!el || !Array.isArray(data)) return;
      el.innerHTML = data.map(item => {
        return `<li>
          ${imgLocalThenOnline(item.icon, item.iconWeb, item.name, `assets/${folder}/`)}
          <div>
            <strong>${item.name}</strong><br>
            <span>${item.description || ""}</span>
          </div>
        </li>`;
      }).join('');
    });
}

document.addEventListener('DOMContentLoaded', () => {
  renderCertList('./certificates.json', 'certificateList');
  renderList('./software.json', 'softwareList', "software");
  renderList('./tools.json', 'toolsList', "tools");
});
