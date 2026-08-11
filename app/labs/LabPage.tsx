"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Language = "en" | "es" | "ca";
export type LabId = "cyberdailylog" | "austrian-monitor";

const labConfig = {
  cyberdailylog: {
    code: "INTEL / 01",
    liveUrl: "https://cyberdailylog-dashboard.jimblogic.chatgpt.site",
    repoUrl: "https://github.com/JimBLogic/CyberDailyLog",
    sibling: "austrian-monitor" as LabId,
    siblingPath: "/labs/austrian-monitor",
  },
  "austrian-monitor": {
    code: "MACRO / 02",
    liveUrl:
      "https://austrian-business-cycle-monitor.jimblogic.chatgpt.site",
    repoUrl: "https://github.com/JimBLogic/AustrianBusinessCycleMonitor",
    sibling: "cyberdailylog" as LabId,
    siblingPath: "/labs/cyberdailylog",
  },
} as const;

const copy = {
  en: {
    skip: "Skip to project",
    portfolio: "Portfolio",
    projects: "All projects",
    status: "Public live demo",
    gateway: "Live project gateway",
    open: "View the complete live application",
    repo: "Inspect repository",
    back: "Back to portfolio",
    keepOpen:
      "The live application opens in a new tab, so this portfolio context stays open.",
    context: "What you are opening",
    briefEyebrow: "Project brief",
    briefTitle: "Three things worth knowing.",
    find: "What you’ll find",
    shows: "What it demonstrates",
    relationship: "Why it belongs here",
    purpose: "Purpose",
    inside: "Inside the system",
    review: "A useful review path",
    boundary: "Boundary",
    other: "Continue to the other field lab",
    footer: "Built as auditable, practical proof of work.",
    projectsCopy: {
      cyberdailylog: {
        title: "CyberDailyLog",
        eyebrow: "Blue Team intelligence system",
        statement:
          "From source validation to an analyst-ready daily defensive brief.",
        intro:
          "A live interface for the automated pipeline behind my daily threat-intelligence work: qualified developments, source health, prioritisation and exportable evidence in one reviewable surface.",
        purposeText:
          "Reduce noisy public security information into a concise, source-backed starting point for defensive triage without hiding freshness, confidence or methodology.",
        insideItems: [
          "Normalised CVE, KEV and EPSS context",
          "Source-health and pipeline status",
          "Thirty-day history plus JSON/CSV exports",
          "Bilingual methodology and watchlist views",
        ],
        reviewItems: [
          "Check the timestamp and source quorum",
          "Open a qualified development",
          "Trace why it crossed the threshold",
          "Inspect the export and repository evidence",
        ],
        boundaryText:
          "A defensive research and learning project. It supports analyst review; it does not replace organisational telemetry, enrichment or human escalation decisions.",
        metrics: [
          ["24 h", "rolling window"],
          ["CVE", "KEV + EPSS"],
          ["3/3", "core sources"],
        ],
        accessTitle: "The working system, one click away",
        accessLead:
          "This page is only a short project brief. Continue to the real deployed dashboard for the complete experience.",
        findText:
          "A live 24-hour defensive brief, qualified developments, source health, a 30-day history, watchlists and JSON/CSV exports.",
        showsText:
          "Source validation, Python automation, data normalisation, prioritisation, documentation and bilingual product delivery.",
        relationshipText:
          "My main Blue Team experimentation project. It turns daily learning into an auditable analyst workflow aligned with the SOC role I am targeting.",
        accessItems: [
          ["Live dashboard", "Qualified developments, history and source health"],
          ["Public evidence", "Exports, methodology and source repository"],
          ["Review order", "Freshness → threshold → source trace"],
        ],
      },
      "austrian-monitor": {
        title: "Austrian Business Cycle Monitor",
        eyebrow: "Macro research system",
        statement:
          "A transparent macro lens for liquidity, credit and business-cycle conditions.",
        intro:
          "A live analytical dashboard that makes its data layers, source health and divergences visible instead of collapsing a complex cycle into a single magic number.",
        purposeText:
          "Organise macro signals through an Austrian-economics framework while preserving the distinction between observed data, interpretation and educational context.",
        insideItems: [
          "Liquidity, credit and market-structure pillars",
          "Productive-activity and market indicators",
          "Visible source freshness and fallback states",
          "Educational insights, tooltips and annotations",
        ],
        reviewItems: [
          "Start with data freshness and source health",
          "Compare the three analytical pillars",
          "Inspect explicit signal divergences",
          "Read the methodology before drawing conclusions",
        ],
        boundaryText:
          "An educational monitoring and research tool, not investment advice, a forecast engine or an instruction to trade.",
        metrics: [
          ["3", "signal pillars"],
          ["MACRO", "economic indicators"],
          ["LIVE", "data health"],
        ],
        accessTitle: "The working monitor, one click away",
        accessLead:
          "This page is only a short project brief. Continue to the real deployed macro dashboard for the complete experience.",
        findText:
          "Macro indicators organised around liquidity, credit, productive activity and market structure, with source health and methodology visible.",
        showsText:
          "Full-stack dashboarding, API integration, data provenance, resilient fallbacks and interpretation without false precision.",
        relationshipText:
          "A personal interest in Austrian economics turned into a technical product. It shows that I can apply rigorous data and product thinking beyond a single domain.",
        accessItems: [
          ["Live dashboard", "Macro indicators, cycle signals and data health"],
          ["Public evidence", "Methodology, source states and repository"],
          ["Review order", "Freshness → pillars → divergences"],
        ],
      },
    },
  },
  es: {
    skip: "Saltar al proyecto",
    portfolio: "Portfolio",
    projects: "Todos los proyectos",
    status: "Demo pública activa",
    gateway: "Acceso al proyecto en vivo",
    open: "Ver la web completa",
    repo: "Revisar repositorio",
    back: "Volver al portfolio",
    keepOpen:
      "La aplicación en vivo se abre en una pestaña nueva, por lo que este contexto del portfolio permanece abierto.",
    context: "Qué vas a abrir",
    briefEyebrow: "Resumen del proyecto",
    briefTitle: "Tres cosas que merece la pena saber.",
    find: "Qué encontrarás",
    shows: "Qué demuestra",
    relationship: "Por qué encaja aquí",
    purpose: "Propósito",
    inside: "Dentro del sistema",
    review: "Una ruta útil de revisión",
    boundary: "Límite",
    other: "Continuar al otro laboratorio",
    footer: "Construido como evidencia práctica auditable.",
    projectsCopy: {
      cyberdailylog: {
        title: "CyberDailyLog",
        eyebrow: "Sistema de inteligencia Blue Team",
        statement:
          "De la validación de fuentes a un informe defensivo diario listo para el analista.",
        intro:
          "Una interfaz viva para el pipeline automatizado que sostiene mi trabajo diario de inteligencia de amenazas: novedades cualificadas, salud de fuentes, priorización y evidencia exportable en una superficie revisable.",
        purposeText:
          "Reducir el ruido de la información pública de seguridad a un punto de partida conciso y respaldado por fuentes para el triaje defensivo, sin ocultar actualidad, confianza o metodología.",
        insideItems: [
          "Contexto normalizado de CVE, KEV y EPSS",
          "Salud de fuentes y estado del pipeline",
          "Histórico de 30 días y exportación JSON/CSV",
          "Metodología bilingüe y vistas de watchlist",
        ],
        reviewItems: [
          "Comprobar timestamp y cuórum de fuentes",
          "Abrir una novedad cualificada",
          "Seguir por qué superó el umbral",
          "Revisar la exportación y la evidencia del repositorio",
        ],
        boundaryText:
          "Proyecto defensivo de investigación y aprendizaje. Ayuda a la revisión del analista; no sustituye telemetría interna, enriquecimiento ni decisiones humanas de escalado.",
        metrics: [
          ["24 h", "ventana móvil"],
          ["CVE", "KEV + EPSS"],
          ["3/3", "fuentes núcleo"],
        ],
        accessTitle: "El sistema real, a un clic",
        accessLead:
          "Esta página es solo un resumen breve. Continúa al dashboard real desplegado para ver la experiencia completa.",
        findText:
          "Un informe defensivo vivo de 24 horas, novedades cualificadas, salud de fuentes, histórico de 30 días, watchlists y exportaciones JSON/CSV.",
        showsText:
          "Validación de fuentes, automatización con Python, normalización de datos, priorización, documentación y entrega bilingüe de producto.",
        relationshipText:
          "Mi principal proyecto de experimentación Blue Team. Convierte el aprendizaje diario en un flujo de analista auditable y alineado con el puesto SOC al que aspiro.",
        accessItems: [
          ["Dashboard en vivo", "Novedades cualificadas, histórico y salud de fuentes"],
          ["Evidencia pública", "Exportaciones, metodología y repositorio"],
          ["Orden de revisión", "Actualidad → umbral → trazabilidad de fuente"],
        ],
      },
      "austrian-monitor": {
        title: "Austrian Business Cycle Monitor",
        eyebrow: "Sistema de investigación macro",
        statement:
          "Una lente macro transparente para liquidez, crédito y condiciones del ciclo económico.",
        intro:
          "Un dashboard analítico vivo que hace visibles sus capas de datos, salud de fuentes y divergencias, en vez de reducir un ciclo complejo a un único número mágico.",
        purposeText:
          "Organizar señales macro mediante un marco de economía austriaca, manteniendo la distinción entre datos observados, interpretación y contexto educativo.",
        insideItems: [
          "Pilares de liquidez, crédito y estructura de mercado",
          "Indicadores de actividad productiva y mercados",
          "Actualidad de fuentes y fallbacks visibles",
          "Insights educativos, tooltips y anotaciones",
        ],
        reviewItems: [
          "Empezar por actualidad y salud de fuentes",
          "Comparar los tres pilares analíticos",
          "Revisar las divergencias explícitas",
          "Leer la metodología antes de concluir",
        ],
        boundaryText:
          "Herramienta educativa de monitorización e investigación; no es asesoramiento financiero, motor de predicción ni instrucción para operar.",
        metrics: [
          ["3", "pilares de señal"],
          ["MACRO", "indicadores económicos"],
          ["LIVE", "salud de datos"],
        ],
        accessTitle: "El monitor real, a un clic",
        accessLead:
          "Esta página es solo un resumen breve. Continúa al dashboard macro real desplegado para ver la experiencia completa.",
        findText:
          "Indicadores macro organizados en torno a liquidez, crédito, actividad productiva y estructura de mercado, con salud de fuentes y metodología visibles.",
        showsText:
          "Desarrollo full-stack de dashboards, integración de APIs, procedencia de datos, fallbacks resilientes e interpretación sin falsa precisión.",
        relationshipText:
          "Un interés personal por la economía austriaca convertido en producto técnico. Demuestra que aplico rigor de datos y criterio de producto más allá de un único ámbito.",
        accessItems: [
          ["Dashboard en vivo", "Indicadores macro, señales de ciclo y salud de datos"],
          ["Evidencia pública", "Metodología, estados de fuentes y repositorio"],
          ["Orden de revisión", "Actualidad → pilares → divergencias"],
        ],
      },
    },
  },
  ca: {
    skip: "Saltar al projecte",
    portfolio: "Portfolio",
    projects: "Tots els projectes",
    status: "Demo pública activa",
    gateway: "Accés al projecte en viu",
    open: "Veure el web complet",
    repo: "Revisar repositori",
    back: "Tornar al portfolio",
    keepOpen:
      "L’aplicació en viu s’obre en una pestanya nova, de manera que aquest context del portfolio queda obert.",
    context: "Què obriràs",
    briefEyebrow: "Resum del projecte",
    briefTitle: "Tres coses que val la pena saber.",
    find: "Què hi trobaràs",
    shows: "Què demostra",
    relationship: "Per què encaixa aquí",
    purpose: "Propòsit",
    inside: "Dins del sistema",
    review: "Una ruta útil de revisió",
    boundary: "Límit",
    other: "Continuar a l’altre laboratori",
    footer: "Construït com a evidència pràctica auditable.",
    projectsCopy: {
      cyberdailylog: {
        title: "CyberDailyLog",
        eyebrow: "Sistema d’intel·ligència Blue Team",
        statement:
          "De la validació de fonts a un informe defensiu diari llest per a l’analista.",
        intro:
          "Una interfície viva per al pipeline automatitzat que sosté la meva feina diària d’intel·ligència d’amenaces: novetats qualificades, salut de fonts, priorització i evidència exportable en una superfície revisable.",
        purposeText:
          "Reduir el soroll de la informació pública de seguretat a un punt de partida concís i basat en fonts per al triatge defensiu, sense ocultar actualitat, confiança o metodologia.",
        insideItems: [
          "Context normalitzat de CVE, KEV i EPSS",
          "Salut de fonts i estat del pipeline",
          "Històric de 30 dies i exportació JSON/CSV",
          "Metodologia bilingüe i vistes de watchlist",
        ],
        reviewItems: [
          "Comprovar timestamp i quòrum de fonts",
          "Obrir una novetat qualificada",
          "Seguir per què ha superat el llindar",
          "Revisar l’exportació i l’evidència del repositori",
        ],
        boundaryText:
          "Projecte defensiu de recerca i aprenentatge. Ajuda la revisió de l’analista; no substitueix telemetria interna, enriquiment ni decisions humanes d’escalat.",
        metrics: [
          ["24 h", "finestra mòbil"],
          ["CVE", "KEV + EPSS"],
          ["3/3", "fonts nucli"],
        ],
        accessTitle: "El sistema real, a un clic",
        accessLead:
          "Aquesta pàgina és només un resum breu. Continua al dashboard real desplegat per veure l’experiència completa.",
        findText:
          "Un informe defensiu viu de 24 hores, novetats qualificades, salut de fonts, històric de 30 dies, watchlists i exportacions JSON/CSV.",
        showsText:
          "Validació de fonts, automatització amb Python, normalització de dades, priorització, documentació i lliurament bilingüe de producte.",
        relationshipText:
          "El meu principal projecte d’experimentació Blue Team. Converteix l’aprenentatge diari en un flux d’analista auditable i alineat amb el lloc SOC al qual aspiro.",
        accessItems: [
          ["Dashboard en viu", "Novetats qualificades, històric i salut de fonts"],
          ["Evidència pública", "Exportacions, metodologia i repositori"],
          ["Ordre de revisió", "Actualitat → llindar → traçabilitat de font"],
        ],
      },
      "austrian-monitor": {
        title: "Austrian Business Cycle Monitor",
        eyebrow: "Sistema de recerca macro",
        statement:
          "Una lent macro transparent per a liquiditat, crèdit i condicions del cicle econòmic.",
        intro:
          "Un dashboard analític viu que mostra les capes de dades, la salut de les fonts i les divergències, en lloc de reduir un cicle complex a un únic número màgic.",
        purposeText:
          "Organitzar senyals macro mitjançant un marc d’economia austríaca, mantenint la distinció entre dades observades, interpretació i context educatiu.",
        insideItems: [
          "Pilars de liquiditat, crèdit i estructura de mercat",
          "Indicadors d’activitat productiva i mercats",
          "Actualitat de fonts i fallbacks visibles",
          "Insights educatius, tooltips i anotacions",
        ],
        reviewItems: [
          "Començar per actualitat i salut de fonts",
          "Comparar els tres pilars analítics",
          "Revisar les divergències explícites",
          "Llegir la metodologia abans de concloure",
        ],
        boundaryText:
          "Eina educativa de monitoratge i recerca; no és assessorament financer, motor de predicció ni instrucció per operar.",
        metrics: [
          ["3", "pilars de senyal"],
          ["MACRO", "indicadors econòmics"],
          ["LIVE", "salut de dades"],
        ],
        accessTitle: "El monitor real, a un clic",
        accessLead:
          "Aquesta pàgina és només un resum breu. Continua al dashboard macro real desplegat per veure l’experiència completa.",
        findText:
          "Indicadors macro organitzats al voltant de liquiditat, crèdit, activitat productiva i estructura de mercat, amb salut de fonts i metodologia visibles.",
        showsText:
          "Desenvolupament full-stack de dashboards, integració d’APIs, procedència de dades, fallbacks resilients i interpretació sense falsa precisió.",
        relationshipText:
          "Un interès personal per l’economia austríaca convertit en producte tècnic. Demostra que aplico rigor de dades i criteri de producte més enllà d’un únic àmbit.",
        accessItems: [
          ["Dashboard en viu", "Indicadors macro, senyals de cicle i salut de dades"],
          ["Evidència pública", "Metodologia, estats de fonts i repositori"],
          ["Ordre de revisió", "Actualitat → pilars → divergències"],
        ],
      },
    },
  },
} as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function LabPage({ lab }: { lab: LabId }) {
  const [language, setLanguage] = useState<Language>("en");
  const config = labConfig[lab];
  const t = copy[language];
  const project = t.projectsCopy[lab];
  const sibling = t.projectsCopy[config.sibling];

  useEffect(() => {
    let timer: number | undefined;
    try {
      const saved = window.localStorage.getItem(
        "jimblogic-language",
      ) as Language | null;
      if (saved && saved in copy) {
        timer = window.setTimeout(() => setLanguage(saved), 0);
      }
    } catch {
      // The page remains usable when storage is blocked.
    }
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem("jimblogic-language", language);
    } catch {
      // The selected language still applies to this visit.
    }
  }, [language]);

  return (
    <>
      <a className="skip-link" href="#lab-main">
        {t.skip}
      </a>

      <div className="site-shell lab-site-shell">
        <header className="site-header lab-header">
          <Link className="wordmark" href="/" aria-label="JimBLogic — home">
            JimBLogic<span>.</span>
          </Link>

          <div className="lab-header-panel">
            <nav aria-label="Project navigation">
              <Link href="/#work">{t.projects}</Link>
              <Link href="/">{t.portfolio}</Link>
            </nav>
            <div className="languages" aria-label="Language">
              {(["en", "es", "ca"] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  className={language === lang ? "is-active" : ""}
                  aria-pressed={language === lang}
                  onClick={() => setLanguage(lang)}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </header>

        <main id="lab-main" className="lab-main">
          <section className="lab-hero" aria-labelledby="lab-title">
            <div className="lab-copy">
              <div className="lab-breadcrumb" aria-label="Breadcrumb">
                <Link href="/">JimBLogic</Link>
                <span aria-hidden="true">/</span>
                <Link href="/#work">Labs</Link>
                <span aria-hidden="true">/</span>
                <span>{config.code}</span>
              </div>

              <div className="lab-status-line">
                <span className="status-dot" aria-hidden="true" />
                {t.status}
              </div>
              <p className="eyebrow">{t.gateway} · {project.eyebrow}</p>
              <h1 id="lab-title">{project.title}</h1>
              <p className="lab-statement">{project.statement}</p>
              <p className="lab-intro">{project.intro}</p>
            </div>

            <aside className="lab-access-card" aria-labelledby="lab-access-title">
              <div className="lab-access-topline">
                <span>{config.code}</span>
                <strong><i aria-hidden="true" /> {t.status}</strong>
              </div>
              <h2 id="lab-access-title">{project.accessTitle}</h2>
              <p>{project.accessLead}</p>

              <div className="lab-actions lab-actions-prominent">
                <a
                  className="lab-live-launch"
                  href={config.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{t.status}</span>
                  <strong>{t.open}</strong>
                  <Arrow />
                </a>
                <a
                  className="lab-repo-link"
                  href={config.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.repo} <Arrow />
                </a>
              </div>
              <p className="lab-new-tab">{t.keepOpen}</p>

              <dl className="lab-metrics">
                {project.metrics.map(([value, label]) => (
                  <div key={label}>
                    <dt>{value}</dt>
                    <dd>{label}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </section>

          <section className="lab-brief" aria-labelledby="lab-brief-title">
            <div className="section-heading compact">
              <p className="eyebrow">{t.briefEyebrow} · {config.code}</p>
              <h2 id="lab-brief-title">{t.briefTitle}</h2>
            </div>

            <div className="lab-brief-grid">
              <article>
                <span>01</span>
                <h3>{t.find}</h3>
                <p>{project.findText}</p>
              </article>
              <article>
                <span>02</span>
                <h3>{t.shows}</h3>
                <p>{project.showsText}</p>
              </article>
              <article>
                <span>03</span>
                <h3>{t.relationship}</h3>
                <p>{project.relationshipText}</p>
              </article>
            </div>
          </section>

          <nav className="lab-next" aria-label="Related project">
            <a
              href={config.siblingPath}
              aria-label={`${t.other}: ${sibling.title}`}
            >
              <div>
                <span>{t.other}</span>
                <strong>{sibling.title}</strong>
              </div>
              <span className="lab-next-action">
                {sibling.eyebrow} <span aria-hidden="true">→</span>
              </span>
            </a>
          </nav>
        </main>

        <footer className="lab-footer">
          <Link className="wordmark" href="/">
            JimBLogic<span>.</span>
          </Link>
          <p>{t.footer}</p>
          <Link href="/">{t.back} <span aria-hidden="true">→</span></Link>
        </footer>
      </div>
    </>
  );
}
