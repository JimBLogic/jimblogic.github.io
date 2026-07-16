const REMOTE_FEED_URL = 'https://raw.githubusercontent.com/JimBLogic/CyberDailyLog/main/reports/portfolio-feed.json';
const LOCAL_FEED_URL = './assets/data/cyberdailylog-latest.json';
const FETCH_TIMEOUT_MS = 5000;
const MAX_PRIORITIES = 5;

const UI = {
  en: {
    nav: 'CyberDailyLog',
    eyebrow: 'Automated Blue Team intelligence',
    title: 'CyberDailyLog',
    intro: 'A daily, source-backed intelligence pipeline that collects, validates and prioritises defensive developments. This compact view updates automatically while the complete report remains auditable on GitHub.',
    loading: 'Loading feed',
    live: 'Live feed',
    snapshot: 'Verified snapshot',
    generated: 'Generated',
    coverage: 'Coverage',
    developments: 'Qualified developments',
    immediate: 'Immediate attention',
    priorities: 'Highest-ranked vulnerabilities',
    cvss: 'CVSS',
    kev: 'CISA KEV',
    noKev: 'Not KEV',
    fullReport: 'Read full daily brief',
    repository: 'View automation repository',
    liveNote: 'Showing the latest compact feed published automatically by CyberDailyLog.',
    snapshotNote: 'Live data is temporarily unavailable. Showing the bundled verified snapshot instead.',
    unavailable: 'CyberDailyLog data could not be loaded. The full report remains available on GitHub.',
    unknown: 'Not available'
  },
  es: {
    nav: 'CyberDailyLog',
    eyebrow: 'Inteligencia Blue Team automatizada',
    title: 'CyberDailyLog',
    intro: 'Un pipeline diario de inteligencia respaldada por fuentes que recopila, valida y prioriza novedades defensivas. Esta vista compacta se actualiza automáticamente y el informe completo permanece auditable en GitHub.',
    loading: 'Cargando feed',
    live: 'Feed en directo',
    snapshot: 'Snapshot verificado',
    generated: 'Generado',
    coverage: 'Cobertura',
    developments: 'Novedades cualificadas',
    immediate: 'Atención inmediata',
    priorities: 'Vulnerabilidades mejor priorizadas',
    cvss: 'CVSS',
    kev: 'CISA KEV',
    noKev: 'No KEV',
    fullReport: 'Leer informe diario completo',
    repository: 'Ver repositorio de automatización',
    liveNote: 'Mostrando el feed compacto más reciente publicado automáticamente por CyberDailyLog.',
    snapshotNote: 'Los datos en directo no están disponibles temporalmente. Se muestra el snapshot verificado incluido en la web.',
    unavailable: 'No se han podido cargar los datos de CyberDailyLog. El informe completo sigue disponible en GitHub.',
    unknown: 'No disponible'
  },
  ca: {
    nav: 'CyberDailyLog',
    eyebrow: 'Intel·ligència Blue Team automatitzada',
    title: 'CyberDailyLog',
    intro: 'Un pipeline diari d’intel·ligència basada en fonts que recopila, valida i prioritza novetats defensives. Aquesta vista compacta s’actualitza automàticament i l’informe complet continua sent auditable a GitHub.',
    loading: 'Carregant feed',
    live: 'Feed en directe',
    snapshot: 'Snapshot verificat',
    generated: 'Generat',
    coverage: 'Cobertura',
    developments: 'Novetats qualificades',
    immediate: 'Atenció immediata',
    priorities: 'Vulnerabilitats més prioritzades',
    cvss: 'CVSS',
    kev: 'CISA KEV',
    noKev: 'No KEV',
    fullReport: 'Llegir l’informe diari complet',
    repository: 'Veure el repositori d’automatització',
    liveNote: 'Mostrant el feed compacte més recent publicat automàticament per CyberDailyLog.',
    snapshotNote: 'Les dades en directe no estan disponibles temporalment. Es mostra el snapshot verificat inclòs al web.',
    unavailable: 'No s’han pogut carregar les dades de CyberDailyLog. L’informe complet continua disponible a GitHub.',
    unknown: 'No disponible'
  }
};

let activeFeed = null;
let activeSource = 'loading';

function language() {
  const value = (document.documentElement.lang || 'en').toLowerCase();
  return Object.hasOwn(UI, value) ? value : 'en';
}

function labels() {
  return UI[language()];
}

function cleanText(value, maximum = 180) {
  const text = String(value ?? '').replace(/\s+/g, ' ').trim();
  return text.slice(0, maximum);
}

function validDate(value) {
  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date;
}

function validateFeed(feed) {
  if (!feed || typeof feed !== 'object' || Array.isArray(feed)) return false;
  if (feed.schema_version !== 1 || feed.project !== 'CyberDailyLog') return false;
  if (!validDate(feed.generated_at) || !validDate(feed.coverage_start) || !validDate(feed.coverage_end)) return false;
  if (!Number.isInteger(feed.qualified_developments) || feed.qualified_developments < 0) return false;
  if (!Array.isArray(feed.top_vulnerabilities) || feed.top_vulnerabilities.length > 10) return false;
  return feed.top_vulnerabilities.every(item => item && typeof item === 'object' && cleanText(item.id, 80));
}

async function fetchJson(url, timeoutMs = FETCH_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      cache: 'no-store',
      credentials: 'omit',
      headers: { Accept: 'application/json' },
      signal: controller.signal
    });
    if (!response.ok) throw new Error(`Feed request failed with ${response.status}`);
    const data = await response.json();
    if (!validateFeed(data)) throw new Error('Feed payload failed validation');
    return data;
  } finally {
    window.clearTimeout(timeout);
  }
}

function formatDate(value, includeTime = true) {
  const date = validDate(value);
  if (!date) return labels().unknown;
  return new Intl.DateTimeFormat(language(), {
    dateStyle: 'medium',
    ...(includeTime ? { timeStyle: 'short' } : {})
  }).format(date);
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function metric(label, value) {
  const item = element('div', 'cyberdailylog-metric');
  item.append(element('span', 'cyberdailylog-metric-label', label));
  item.append(element('span', 'cyberdailylog-metric-value', value));
  return item;
}

function priorityCard(item) {
  const card = element('article', 'cyberdailylog-priority');
  const copy = element('div');
  copy.append(element('span', 'cyberdailylog-priority-id', cleanText(item.id, 80)));
  copy.append(element('p', 'cyberdailylog-priority-title', cleanText(item.title || item.id, 180)));

  const meta = element('div', 'cyberdailylog-priority-meta');
  const cvss = Number(item.cvss_score);
  meta.append(element('span', 'cyberdailylog-chip', `${labels().cvss} ${Number.isFinite(cvss) ? cvss.toFixed(1) : 'n/a'}`));
  const kev = element('span', 'cyberdailylog-chip', item.cisa_kev ? labels().kev : labels().noKev);
  kev.dataset.kev = item.cisa_kev ? 'true' : 'false';
  meta.append(kev);

  card.append(copy, meta);
  return card;
}

function render(feed, source) {
  const root = document.getElementById('cyberdailylogFeed');
  const status = document.getElementById('cyberdailylogStatus');
  const note = document.getElementById('cyberdailylogNote');
  if (!root || !status || !note) return;

  activeFeed = feed;
  activeSource = source;
  const text = labels();
  root.setAttribute('aria-busy', 'false');
  root.replaceChildren();

  const metrics = element('div', 'cyberdailylog-metrics');
  metrics.append(
    metric(text.generated, formatDate(feed.generated_at)),
    metric(text.coverage, `${formatDate(feed.coverage_start, false)} → ${formatDate(feed.coverage_end, false)}`),
    metric(text.developments, String(feed.qualified_developments))
  );

  const attention = element('div', 'cyberdailylog-attention');
  attention.append(element('strong', '', text.immediate));
  attention.append(element('p', '', cleanText(feed.immediate_attention, 260) || text.unknown));

  const priorities = element('div', 'cyberdailylog-priorities');
  priorities.append(element('h3', 'cyberdailylog-priorities-title', text.priorities));
  feed.top_vulnerabilities.slice(0, MAX_PRIORITIES).forEach(item => priorities.append(priorityCard(item)));

  root.append(metrics, attention, priorities);
  status.dataset.state = source;
  status.textContent = source === 'live' ? text.live : text.snapshot;
  note.dataset.state = source === 'error' ? 'error' : source;
  note.textContent = source === 'live' ? text.liveNote : text.snapshotNote;
}

function translateStaticUi() {
  const text = labels();
  const navLabel = document.querySelector('.navbar-link[href="#cyberdailylog"] span');
  const eyebrow = document.getElementById('cyberdailylogEyebrow');
  const title = document.getElementById('cyberdailylogTitleText');
  const intro = document.getElementById('cyberdailylogIntro');
  const reportLink = document.getElementById('cyberdailylogReportLink');
  const repositoryLink = document.getElementById('cyberdailylogRepositoryLink');

  if (navLabel) navLabel.textContent = text.nav;
  if (eyebrow) eyebrow.textContent = text.eyebrow;
  if (title) title.textContent = text.title;
  if (intro) intro.textContent = text.intro;
  if (reportLink) reportLink.textContent = text.fullReport;
  if (repositoryLink) repositoryLink.textContent = text.repository;

  if (activeFeed) render(activeFeed, activeSource);
  else {
    const status = document.getElementById('cyberdailylogStatus');
    if (status) status.textContent = text.loading;
  }
}

async function initializeFeed() {
  translateStaticUi();
  const root = document.getElementById('cyberdailylogFeed');
  const note = document.getElementById('cyberdailylogNote');
  if (!root || !note) return;

  let snapshot = null;
  try {
    snapshot = await fetchJson(LOCAL_FEED_URL, 3000);
    render(snapshot, 'snapshot');
  } catch {
    root.setAttribute('aria-busy', 'false');
    note.dataset.state = 'error';
    note.textContent = labels().unavailable;
  }

  try {
    const remote = await fetchJson(REMOTE_FEED_URL);
    const remoteTime = validDate(remote.generated_at)?.getTime() ?? 0;
    const snapshotTime = validDate(snapshot?.generated_at)?.getTime() ?? 0;
    if (!snapshot || remoteTime >= snapshotTime) render(remote, 'live');
  } catch {
    if (snapshot) render(snapshot, 'snapshot');
  }
}

new MutationObserver(mutations => {
  if (mutations.some(mutation => mutation.attributeName === 'lang')) translateStaticUi();
}).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeFeed, { once: true });
} else {
  initializeFeed();
}
