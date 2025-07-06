function imgLocalThenOnline(local, fallback, alt, prefix = "") {
  // Local first (if exists), then web, then default
  const defaultImg = "./assets/Images/default.png";
  let tag = "";
  if (local) {
    const localPath = prefix + local;
    tag = `<img src="${localPath}" alt="${alt}" loading="lazy" onerror="this.onerror=null;this.src='${fallback || defaultImg}';">`;
  } else if (fallback) {
    tag = `<img src="${fallback}" alt="${alt}" loading="lazy" onerror="this.onerror=null;this.src='${defaultImg}';">`;
  } else {
    tag = `<img src="${defaultImg}" alt="${alt}" loading="lazy">`;
  }
  return tag;
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
