function imgLocalThenOnline(local, fallback, alt) {
  // Show local image, if it fails load fallback
  return `<img src="${local}" alt="${alt}" loading="lazy" onerror="this.onerror=null;this.src='${fallback}'">`;
}

function renderList(jsonFile, listId, label) {
  fetch(jsonFile)
    .then(r => r.json())
    .then(data => {
      const el = document.getElementById(listId);
      if (!el || !Array.isArray(data)) return;
      el.innerHTML = data.map(item => {
        const icon = imgLocalThenOnline(item.icon, item.icon_fallback, item.name);
        return `<li>
          ${icon}
          <div>
            <strong>${item.name}</strong><br>
            <span>${item.description || item.issuer || ''}</span>
            ${item.link ? ` - <a href="${item.link}" target="_blank" rel="noopener">${label || 'View'}</a>` : ''}
          </div>
        </li>`;
      }).join('');
    });
}

document.addEventListener('DOMContentLoaded', () => {
  renderList('./certificates.json', 'certificateList', 'Certificate');
  renderList('./software.json', 'softwareList');
  renderList('./tools.json', 'toolsList');
});
