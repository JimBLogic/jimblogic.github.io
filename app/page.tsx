"use client";

import { useEffect, useState } from "react";

type Language = "en" | "es" | "ca";

type CyberDailySnapshot = {
  above_threshold: number;
  generated_at: string;
  pipeline_status: string;
  qualified_developments: number;
  source_health: {
    core: {
      healthy: number;
      total: number;
    };
  };
};

const links = {
  github: "https://github.com/JimBLogic",
  linkedin: "https://www.linkedin.com/in/jimblogic/",
  tryHackMe: "https://tryhackme.com/p/JimBLogic",
  cv: "https://jimblogic.github.io/documents/Jaime-Ramsden-de-Frutos-CV.pdf",
  email: "mailto:jrf91@pm.me",
  cyberDailyLog: "https://github.com/JimBLogic/CyberDailyLog",
  cyberDailyLab: "/labs/cyberdailylog",
  cyberDailyLive:
    "https://cyberdailylog-dashboard.jimblogic.chatgpt.site",
  cyberDailyReport:
    "https://github.com/JimBLogic/CyberDailyLog/blob/main/reports/latest.md",
  austrianMonitorLab: "/labs/austrian-monitor",
  austrianMonitorLive:
    "https://austrian-business-cycle-monitor.jimblogic.chatgpt.site",
  austrianMonitorRepo:
    "https://github.com/JimBLogic/AustrianBusinessCycleMonitor",
  homelab: "https://github.com/JimBLogic/defensive-homelab-blue-team",
  portfolio: "https://github.com/JimBLogic/jimblogic.github.io",
  blueTeam:
    "https://github.com/JimBLogic/Security-Blue-Team-Learning-Journey-Certificates",
  cybrary:
    "https://github.com/JimBLogic/Cybrary-IT-Cybersecurity-Certificates-and-Labs",
  awsEvidence:
    "https://github.com/JimBLogic/AWS-IBM-Skills-Build-KCCS-Moss-Cibersecurity-Institute",
  credly: "https://www.credly.com/users/jaime-ramsden-de-frutos",
  upgradeHubCertificate:
    "https://jimblogic.github.io/documents/UpgradeHub-Cert.pdf",
  blueTeamPathway:
    "https://github.com/JimBLogic/Security-Blue-Team-Learning-Journey-Certificates/blob/main/certs/Blue%20Team%20Junior%20Analyst%20Pathway%20Bundle-btja.pdf",
  cyberDailyFeed:
    "https://raw.githubusercontent.com/JimBLogic/CyberDailyLog/main/reports/portfolio-feed.json",
};

const credentialMarks: Record<string, string> = {
  "Security Blue Team": "SBT",
  UpgradeHub: "UH",
  arcX: "aX",
  "Cisco Networking Academy": "CISCO",
  "AWS Skill Builder": "AWS",
  TryHackMe: "THM",
};

const content = {
  en: {
    meta: {
      menu: "Open menu",
      close: "Close menu",
      skip: "Skip to content",
      external: "opens in a new tab",
      top: "Back to top",
    },
    nav: {
      work: "Work",
      capabilities: "Capabilities",
      evidence: "Evidence",
      background: "Experience",
      about: "About",
      contact: "Contact",
      live: "Open to work",
    },
    hero: {
      name: "Jaime Ramsden de Frutos",
      role: "Junior SOC Analyst · Blue Team / Security Operations",
      statementStart: "I turn operational discipline into",
      statementAccent: "auditable defensive work.",
      intro:
        "I combine incident ownership, multilingual operations and hands-on defensive engineering: source-backed triage, Linux and containers, network visibility, clear handovers, recovery and careful automation.",
      explore: "Explore proof of work",
      cv: "Open CV",
      location: "Menorca · Remote across Spain / EU · UK eligible",
      availability:
        "Native English + Spanish · Professional Catalan · EU + UK work rights",
      railLabel: "Evidence index",
      signals: [
        {
          name: "CyberDailyLog",
          status: "Automated daily",
          detail: "Source-backed 24-hour pipeline",
          stamp: "LIVE FEED",
          href: links.cyberDailyLab,
        },
        {
          name: "Defensive Homelab",
          status: "Operational build",
          detail: "LITE / FULL Raspberry Pi baseline",
          stamp: "PUBLIC REPO",
          href: links.homelab,
        },
        {
          name: "TryHackMe",
          status: "Top 1%",
          detail: "Hands-on learning evidence",
          stamp: "PROFILE",
          href: links.tryHackMe,
        },
      ],
    },
    liveFeed: {
      operational: "Pipeline operational",
      degraded: "Pipeline status available",
      assessed: "developments assessed",
      threshold: "above threshold",
      sources: "core sources healthy",
      updated: "UPDATED",
    },
    scan: {
      eyebrow: "Recruiter route",
      title: "A 60-second proof path.",
      intro:
        "Start with what I built, inspect how I explain decisions, then verify the training behind it.",
      steps: [
        ["01", "See the output", "Open the live defensive intelligence project.", links.cyberDailyLab],
        ["02", "Inspect the system", "Review the automation and validation.", links.cyberDailyLog],
        ["03", "Follow the build", "Explore the defensive homelab baseline.", links.homelab],
        ["04", "Verify the profile", "Open the CV and selected evidence.", links.cv],
      ],
    },
    work: {
      eyebrow: "Selected proof of work",
      title: "Projects designed to survive questions.",
      intro:
        "Each project states its purpose, current status and limits. No enterprise-SOC cosplay; just real, reviewable work and the next sensible improvement.",
      open: "Open project",
      brief: "View project brief",
      report: "Read today’s brief",
      cards: [
        {
          index: "01",
          kicker: "Flagship · Automation + threat intelligence",
          title: "CyberDailyLog",
          summary:
            "An automated, source-backed daily Blue Team brief that collects public advisories, scores and curates defensive signals, validates its own outputs and publishes an auditable report.",
          metrics: [
            ["24 h", "rolling coverage"],
            ["CVE", "KEV + EPSS context"],
            ["3/3", "core source quorum"],
          ],
          notes: [
            "GitHub Actions pipeline with safe publishing",
            "CVE, KEV, EPSS and official-source context",
            "Human context and community signals kept separate",
            "Clear methodology, limitations and analyst next actions",
          ],
          pipeline: {
            label: "Auditable daily pipeline",
            stages: [
              ["01", "Collect", "Official advisories + defensive sources"],
              ["02", "Validate", "Schema, freshness and source quorum"],
              ["03", "Prioritise", "CVE · KEV · EPSS · analyst context"],
              ["04", "Publish", "Checked report + portfolio snapshot"],
            ],
          },
          href: links.cyberDailyLab,
          secondaryHref: links.cyberDailyLog,
          secondaryLabel: "Inspect repository",
          featured: true,
        },
        {
          index: "02",
          kicker: "Linux + containers + monitoring",
          title: "Defensive Homelab",
          summary:
            "A reproducible Raspberry Pi 4 Blue Team lab with LITE and FULL deployments for service health, metrics, DNS security, hardening, tested recovery and incident notes.",
          metrics: [
            ["8 GB", "Raspberry Pi 4"],
            ["1 TB", "SSD storage"],
            ["2", "deployment modes"],
          ],
          notes: [
            "Prometheus, Grafana, Node Exporter and Uptime Kuma",
            "Local-first exposure and least-privilege decisions",
            "Sanitized documentation and trust boundaries",
            "Explicitly not presented as an enterprise SOC",
          ],
          href: links.homelab,
          secondaryHref: "",
          secondaryLabel: "",
          featured: false,
        },
        {
          index: "03",
          kicker: "Product + QA + secure delivery",
          title: "This portfolio",
          summary:
            "A multilingual portfolio treated as a small production system: recruiter-first content, accessible controls, content security policy, responsive QA and exact-artifact deployment.",
          metrics: [
            ["3", "languages"],
            ["CI", "build + browser QA"],
            ["A11y", "keyboard + motion"],
          ],
          notes: [
            "EN / ES / CA with safe content fallbacks",
            "Mobile navigation and strict-storage resilience",
            "Evidence links point to exact certificates",
            "GitHub Pages deployment gated by validation",
          ],
          delivery: {
            label: "One portable source, three compatible delivery paths",
            source: "Public GitHub source",
            checks: "Lint · static build · route QA",
            artifact: "Reproducible compatibility build",
            targets: ["GitHub Pages", "ChatGPT Sites", "Docker / Nginx"],
          },
          href: links.portfolio,
          secondaryHref: "",
          secondaryLabel: "",
          featured: false,
        },
        {
          index: "04",
          kicker: "Economics + data provenance + product thinking",
          title: "Austrian Business Cycle Monitor",
          summary:
            "A transparent macro dashboard that connects liquidity, credit conditions, productive activity and market structure through an Austrian-economics lens, while keeping source health and model limits visible.",
          metrics: [
            ["3", "analytical pillars"],
            ["MACRO", "economic indicators"],
            ["LIVE", "data health"],
          ],
          notes: [
            "Liquidity, credit and market-structure layers",
            "Productive-activity and market indicators",
            "Visible divergence and data-freshness states",
            "Educational analysis, not trading advice",
          ],
          href: links.austrianMonitorLab,
          secondaryHref: links.austrianMonitorRepo,
          secondaryLabel: "Inspect repository",
          featured: false,
        },
      ],
    },
    capabilities: {
      eyebrow: "Capabilities",
      title: "Useful junior skills, stated at the right altitude.",
      intro:
        "My value is not pretending to know everything. It is combining operational discipline, technical foundations and clear communication so senior people can trust what I hand over.",
      items: [
        {
          code: "TRIAGE",
          title: "Defensive monitoring",
          text: "Alert prioritisation, source validation, concise reporting, escalation thinking and documented next actions.",
          tools: "CVE · KEV · EPSS · Splunk/SPL foundations",
        },
        {
          code: "SYSTEMS",
          title: "Linux & container operations",
          text: "Service baselines, Docker deployments, health checks, logs, updates, backup validation and least privilege.",
          tools: "Linux · Bash · Docker · Prometheus · Grafana",
        },
        {
          code: "NETWORK",
          title: "Network visibility",
          text: "TCP/IP foundations, packet analysis, DNS security awareness, exposure review and defensible diagrams.",
          tools: "Wireshark · tcpdump · AdGuard Home",
        },
        {
          code: "IR / DFIR",
          title: "Incident foundations",
          text: "Evidence-handling basics, timeline thinking, incident notes, OSINT and repeatable investigative workflows.",
          tools: "Security Blue Team · TryHackMe · OSINT",
        },
        {
          code: "CLOUD",
          title: "AWS foundations",
          text: "Preparing for AWS Cloud Practitioner with attention to IAM, shared responsibility, logging and cost awareness.",
          tools: "IAM · CloudTrail concepts · shared responsibility",
        },
        {
          code: "OPS",
          title: "Operational communication",
          text: "Customer-facing administration, IT support, documentation, sensitive-data handling, ownership and escalation.",
          tools: "Native English + Spanish · professional Catalan",
        },
      ],
    },
    evidence: {
      eyebrow: "Selected evidence",
      title: "Depth without the certificate wall.",
      intro:
        "The current portfolio contains 37 verifiable learning records. These six are the quickest way to understand the defensive path; the full repositories remain available for deeper review.",
      selected: "6 selected",
      total: "37 total records",
      verify: "Verify evidence",
      full: "View full learning evidence",
      items: [
        {
          issuer: "Security Blue Team",
          title: "Blue Team Junior Analyst Pathway",
          focus: "VMs · networks · forensics · OSINT · hunting · Bash · Python",
          year: "2024–25",
          href: links.blueTeamPathway,
        },
        {
          issuer: "UpgradeHub",
          title: "Cybersecurity, Ethical Hacking & Cloud",
          focus: "350-hour intensive bootcamp",
          year: "2024",
          href: links.upgradeHubCertificate,
        },
        {
          issuer: "arcX",
          title: "Threat Intelligence Foundation",
          focus: "Intelligence lifecycle and analysis foundations",
          year: "2024",
          href: links.credly,
        },
        {
          issuer: "Cisco Networking Academy",
          title: "Cyber Threat Management",
          focus: "Threats, controls and defensive management",
          year: "2024",
          href: links.credly,
        },
        {
          issuer: "AWS Skill Builder",
          title: "Cloud Practitioner learning path",
          focus: "Course evidence; certification exam in preparation",
          year: "Active",
          href: links.awsEvidence,
        },
        {
          issuer: "TryHackMe",
          title: "Hands-on cyber learning",
          focus: "Top 1% profile and documented lab practice",
          year: "Active",
          href: links.tryHackMe,
        },
      ],
    },
    background: {
      eyebrow: "Operational background",
      title: "Experience that transfers into security work.",
      intro:
        "My cybersecurity career is new; disciplined operations are not. These roles built the habits behind reliable triage, careful handovers and calm communication.",
      workLabel: "Relevant experience",
      educationLabel: "Education & development",
      roles: [
        {
          period: "2025 — NOW",
          role: "Administration with practical IT responsibility",
          organisation: "Property operations · Menorca",
          text:
            "Coordinate incidents, suppliers and stakeholders; handle sensitive records; troubleshoot everyday systems; and keep a written trail when several issues compete for attention.",
          signal: "Triage · ownership · documentation · escalation",
        },
        {
          period: "2023 — 2025",
          role: "Airport customer operations",
          organisation: "Jet2.com · Menorca Airport",
          text:
            "Worked in a time-sensitive, multilingual environment where accurate information, calm decisions and clean escalation mattered to real passengers.",
          signal: "Live operations · customer impact · bilingual communication",
        },
        {
          period: "2016 — 2021",
          role: "Senior support work",
          organisation: "Residential services · United Kingdom",
          text:
            "Managed safeguarding, confidential information, shift handovers and incidents in a role where trust and precise records were non-negotiable.",
          signal: "Sensitive data · handovers · incident records",
        },
      ],
      education: [
        {
          period: "2024",
          title: "Cybersecurity, Ethical Hacking & Cloud",
          organisation: "UpgradeHub · 350-hour full-time bootcamp",
          text:
            "Hands-on foundations in ethical hacking, vulnerability analysis, digital forensics, incident response and cloud security.",
        },
        {
          period: "ONGOING",
          title: "Blue Team and cloud development",
          organisation: "Security Blue Team · TryHackMe · AWS Skill Builder",
          text:
            "Continuous lab work in network analysis, forensics, threat intelligence, Splunk foundations, Linux and AWS Cloud Practitioner preparation.",
        },
        {
          period: "BACKGROUND",
          title: "Sports Science",
          organisation: "Formal education",
          text:
            "Kept as academic background—not presented as a cybersecurity credential.",
        },
      ],
      facts: [
        "Native English + Spanish",
        "Professional Catalan",
        "EU + UK work rights",
        "Remote-first from Menorca",
      ],
    },
    about: {
      eyebrow: "About",
      title: "A career transition built on operational habits.",
      lead:
        "I am moving into cybersecurity from customer-facing operations, administration and practical IT support. That background is not a detour: it taught me to document, prioritise, protect sensitive information and communicate when the situation is messy.",
      body:
        "Outside work I build public security projects, run a defensive Raspberry Pi lab and study SOC, incident response, threat intelligence and AWS foundations. I also bring years of live-community experience as a Twitch Partner—useful training in calm communication, troubleshooting and reading a room.",
      principles: [
        ["Evidence over claims", "If I say I built it, there should be a repository, report or lab note."],
        ["Useful over flashy", "The next operational control matters more than another decorative badge."],
        ["Open, but careful", "I value open source, privacy and reproducibility without publishing sensitive lab data."],
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Let’s talk about your security team.",
      text:
        "I am seeking junior SOC, Blue Team and security operations roles. I am also open to security-adjacent IT operations or NOC positions where monitoring, incident ownership and escalation are central to the work.",
      email: "Email Jaime",
      linkedin: "LinkedIn",
      github: "GitHub",
      cv: "Open CV",
      availability: "Based in Menorca · Native English and Spanish",
    },
    footer: {
      note: "Built as auditable proof of work.",
      legal: "© 2026 Jaime Ramsden de Frutos",
    },
  },
  es: {
    meta: {
      menu: "Abrir menú",
      close: "Cerrar menú",
      skip: "Saltar al contenido",
      external: "se abre en una pestaña nueva",
      top: "Volver arriba",
    },
    nav: {
      work: "Proyectos",
      capabilities: "Capacidades",
      evidence: "Evidencia",
      background: "Experiencia",
      about: "Sobre mí",
      contact: "Contacto",
      live: "Disponible",
    },
    hero: {
      name: "Jaime Ramsden de Frutos",
      role: "Analista SOC Junior · Blue Team / Operaciones de Seguridad",
      statementStart: "Convierto disciplina operativa en",
      statementAccent: "trabajo defensivo auditable.",
      intro:
        "Combino responsabilidad sobre incidencias, operaciones multilingües e ingeniería defensiva práctica: triaje respaldado por fuentes, Linux y contenedores, visibilidad de red, buenos relevos, recuperación y automatización cuidadosa.",
      explore: "Explorar evidencia práctica",
      cv: "Abrir CV",
      location: "Menorca · Remoto en España / UE · habilitado para Reino Unido",
      availability:
        "Inglés + español nativos · Catalán profesional · permiso UE + Reino Unido",
      railLabel: "Índice de evidencias",
      signals: [
        {
          name: "CyberDailyLog",
          status: "Automatizado a diario",
          detail: "Pipeline de 24 horas basado en fuentes",
          stamp: "DATOS EN VIVO",
          href: links.cyberDailyLab,
        },
        {
          name: "Homelab defensivo",
          status: "Despliegue operativo",
          detail: "Base LITE / FULL para Raspberry Pi",
          stamp: "REPO PÚBLICA",
          href: links.homelab,
        },
        {
          name: "TryHackMe",
          status: "Top 1%",
          detail: "Evidencia de aprendizaje práctico",
          stamp: "PERFIL",
          href: links.tryHackMe,
        },
      ],
    },
    liveFeed: {
      operational: "Pipeline operativo",
      degraded: "Estado del pipeline disponible",
      assessed: "novedades analizadas",
      threshold: "sobre el umbral",
      sources: "fuentes principales sanas",
      updated: "ACTUALIZADO",
    },
    scan: {
      eyebrow: "Ruta para recruiters",
      title: "Una ruta de evidencia de 60 segundos.",
      intro:
        "Empieza por lo que he construido, revisa cómo explico las decisiones y verifica después la formación que lo respalda.",
      steps: [
        ["01", "Ver el resultado", "Abrir el proyecto de inteligencia defensiva en vivo.", links.cyberDailyLab],
        ["02", "Revisar el sistema", "Examinar la automatización y sus validaciones.", links.cyberDailyLog],
        ["03", "Seguir el despliegue", "Explorar la base del homelab defensivo.", links.homelab],
        ["04", "Verificar el perfil", "Abrir el CV y la evidencia seleccionada.", links.cv],
      ],
    },
    work: {
      eyebrow: "Evidencia práctica destacada",
      title: "Proyectos preparados para responder preguntas.",
      intro:
        "Cada proyecto declara su propósito, estado actual y límites. Nada de disfrazarse de SOC empresarial: trabajo real y revisable, con la siguiente mejora lógica a la vista.",
      open: "Abrir proyecto",
      brief: "Ver resumen del proyecto",
      report: "Leer el informe de hoy",
      cards: [
        {
          index: "01",
          kicker: "Proyecto principal · Automatización + inteligencia",
          title: "CyberDailyLog",
          summary:
            "Un informe Blue Team diario, automatizado y basado en fuentes, que recopila avisos públicos, puntúa y selecciona señales defensivas, valida sus salidas y publica un resultado auditable.",
          metrics: [
            ["24 h", "cobertura móvil"],
            ["CVE", "contexto KEV + EPSS"],
            ["3/3", "cuórum de fuentes"],
          ],
          notes: [
            "Pipeline de GitHub Actions con publicación segura",
            "Contexto CVE, KEV, EPSS y fuentes oficiales",
            "Contexto humano y señales comunitarias separados",
            "Metodología, límites y siguientes acciones claras",
          ],
          pipeline: {
            label: "Pipeline diario auditable",
            stages: [
              ["01", "Recopilar", "Avisos oficiales + fuentes defensivas"],
              ["02", "Validar", "Esquema, actualidad y cuórum de fuentes"],
              ["03", "Priorizar", "CVE · KEV · EPSS · contexto analista"],
              ["04", "Publicar", "Informe validado + snapshot del portfolio"],
            ],
          },
          href: links.cyberDailyLab,
          secondaryHref: links.cyberDailyLog,
          secondaryLabel: "Revisar repositorio",
          featured: true,
        },
        {
          index: "02",
          kicker: "Linux + contenedores + monitorización",
          title: "Homelab defensivo",
          summary:
            "Un laboratorio Blue Team reproducible con Raspberry Pi 4 y despliegues LITE y FULL para salud de servicios, métricas, seguridad DNS, hardening, recuperación probada y notas de incidentes.",
          metrics: [
            ["8 GB", "Raspberry Pi 4"],
            ["1 TB", "almacenamiento SSD"],
            ["2", "modos de despliegue"],
          ],
          notes: [
            "Prometheus, Grafana, Node Exporter y Uptime Kuma",
            "Exposición local y decisiones de mínimo privilegio",
            "Documentación saneada y límites de confianza",
            "No se presenta como un SOC empresarial",
          ],
          href: links.homelab,
          secondaryHref: "",
          secondaryLabel: "",
          featured: false,
        },
        {
          index: "03",
          kicker: "Producto + QA + entrega segura",
          title: "Este portfolio",
          summary:
            "Un portfolio multilingüe tratado como un pequeño sistema de producción: contenido para recruiters, controles accesibles, CSP, QA responsive y despliegue del artefacto exacto probado.",
          metrics: [
            ["3", "idiomas"],
            ["CI", "build + QA de navegador"],
            ["A11y", "teclado + movimiento"],
          ],
          notes: [
            "EN / ES / CA con fallbacks de contenido seguros",
            "Navegación móvil resistente a almacenamiento estricto",
            "Enlaces a certificados concretos",
            "Despliegue en GitHub Pages condicionado a validación",
          ],
          delivery: {
            label: "Una fuente portable, tres rutas de entrega compatibles",
            source: "Código público en GitHub",
            checks: "Lint · build estática · QA de rutas",
            artifact: "Build de compatibilidad reproducible",
            targets: ["GitHub Pages", "ChatGPT Sites", "Docker / Nginx"],
          },
          href: links.portfolio,
          secondaryHref: "",
          secondaryLabel: "",
          featured: false,
        },
        {
          index: "04",
          kicker: "Economía + procedencia de datos + producto",
          title: "Austrian Business Cycle Monitor",
          summary:
            "Un dashboard macro transparente que conecta liquidez, condiciones de crédito, actividad productiva y estructura de mercado desde una óptica de economía austriaca, mostrando la salud de las fuentes y los límites del modelo.",
          metrics: [
            ["3", "pilares analíticos"],
            ["MACRO", "indicadores económicos"],
            ["LIVE", "salud de datos"],
          ],
          notes: [
            "Capas de liquidez, crédito y estructura de mercado",
            "Indicadores de actividad productiva y mercados",
            "Estados visibles de divergencia y actualidad de datos",
            "Análisis educativo, no asesoramiento financiero",
          ],
          href: links.austrianMonitorLab,
          secondaryHref: links.austrianMonitorRepo,
          secondaryLabel: "Revisar repositorio",
          featured: false,
        },
      ],
    },
    capabilities: {
      eyebrow: "Capacidades",
      title: "Competencias junior útiles, expresadas a la altura correcta.",
      intro:
        "Mi valor no está en fingir que lo sé todo. Está en combinar disciplina operativa, fundamentos técnicos y comunicación clara para que perfiles senior puedan confiar en lo que les entrego.",
      items: [
        {
          code: "TRIAJE",
          title: "Monitorización defensiva",
          text: "Priorización de alertas, validación de fuentes, informes concisos, criterio de escalado y siguientes acciones documentadas.",
          tools: "CVE · KEV · EPSS · fundamentos Splunk/SPL",
        },
        {
          code: "SISTEMAS",
          title: "Linux y contenedores",
          text: "Líneas base de servicio, Docker, comprobaciones de salud, logs, actualizaciones, validación de backups y mínimo privilegio.",
          tools: "Linux · Bash · Docker · Prometheus · Grafana",
        },
        {
          code: "RED",
          title: "Visibilidad de red",
          text: "Fundamentos TCP/IP, análisis de paquetes, seguridad DNS, revisión de exposición y diagramas defendibles.",
          tools: "Wireshark · tcpdump · AdGuard Home",
        },
        {
          code: "IR / DFIR",
          title: "Fundamentos de incidentes",
          text: "Manejo básico de evidencias, cronologías, notas de incidentes, OSINT y flujos de investigación repetibles.",
          tools: "Security Blue Team · TryHackMe · OSINT",
        },
        {
          code: "CLOUD",
          title: "Fundamentos AWS",
          text: "Preparación para AWS Cloud Practitioner con atención a IAM, responsabilidad compartida, logs y costes.",
          tools: "IAM · conceptos CloudTrail · responsabilidad compartida",
        },
        {
          code: "OPS",
          title: "Comunicación operativa",
          text: "Administración y atención al usuario, soporte IT, documentación, datos sensibles, responsabilidad y escalado.",
          tools: "Inglés y español nativos · catalán profesional",
        },
      ],
    },
    evidence: {
      eyebrow: "Evidencia seleccionada",
      title: "Profundidad sin un muro de certificados.",
      intro:
        "El portfolio actual contiene 37 registros formativos verificables. Estos seis explican más rápido el recorrido defensivo; los repositorios completos siguen disponibles para profundizar.",
      selected: "6 seleccionados",
      total: "37 registros totales",
      verify: "Verificar evidencia",
      full: "Ver toda la evidencia formativa",
      items: [
        {
          issuer: "Security Blue Team",
          title: "Blue Team Junior Analyst Pathway",
          focus: "VMs · redes · forense · OSINT · hunting · Bash · Python",
          year: "2024–25",
          href: links.blueTeamPathway,
        },
        {
          issuer: "UpgradeHub",
          title: "Ciberseguridad, Hacking Ético y Cloud",
          focus: "Bootcamp intensivo de 350 horas",
          year: "2024",
          href: links.upgradeHubCertificate,
        },
        {
          issuer: "arcX",
          title: "Threat Intelligence Foundation",
          focus: "Ciclo de inteligencia y fundamentos de análisis",
          year: "2024",
          href: links.credly,
        },
        {
          issuer: "Cisco Networking Academy",
          title: "Cyber Threat Management",
          focus: "Amenazas, controles y gestión defensiva",
          year: "2024",
          href: links.credly,
        },
        {
          issuer: "AWS Skill Builder",
          title: "Ruta de Cloud Practitioner",
          focus: "Evidencia del curso; examen de certificación en preparación",
          year: "Activo",
          href: links.awsEvidence,
        },
        {
          issuer: "TryHackMe",
          title: "Aprendizaje práctico en ciberseguridad",
          focus: "Perfil Top 1% y práctica de laboratorios documentada",
          year: "Activo",
          href: links.tryHackMe,
        },
      ],
    },
    background: {
      eyebrow: "Experiencia operativa",
      title: "Una trayectoria que sí transfiere valor a seguridad.",
      intro:
        "Mi carrera en ciberseguridad es nueva; la disciplina operativa no. Estos puestos consolidaron los hábitos que sostienen un triaje fiable, buenos relevos y una comunicación serena.",
      workLabel: "Experiencia relevante",
      educationLabel: "Formación y desarrollo",
      roles: [
        {
          period: "2025 — AHORA",
          role: "Administración con responsabilidad IT práctica",
          organisation: "Operaciones inmobiliarias · Menorca",
          text:
            "Coordino incidencias, proveedores y partes interesadas; gestiono documentación sensible; resuelvo problemas cotidianos de sistemas y dejo trazabilidad cuando varias urgencias compiten.",
          signal: "Triaje · responsabilidad · documentación · escalado",
        },
        {
          period: "2023 — 2025",
          role: "Operaciones y atención en aeropuerto",
          organisation: "Jet2.com · Aeropuerto de Menorca",
          text:
            "Trabajé en un entorno multilingüe y condicionado por el tiempo, donde la información correcta, las decisiones calmadas y un escalado limpio afectaban a pasajeros reales.",
          signal: "Operaciones en vivo · impacto al usuario · comunicación bilingüe",
        },
        {
          period: "2016 — 2021",
          role: "Profesional senior de apoyo",
          organisation: "Servicios residenciales · Reino Unido",
          text:
            "Gestioné protección de personas, información confidencial, relevos e incidentes en un trabajo donde la confianza y los registros precisos no eran negociables.",
          signal: "Datos sensibles · relevos · registro de incidentes",
        },
      ],
      education: [
        {
          period: "2024",
          title: "Ciberseguridad, Hacking Ético y Cloud",
          organisation: "UpgradeHub · bootcamp intensivo de 350 horas",
          text:
            "Fundamentos prácticos de hacking ético, análisis de vulnerabilidades, forense digital, respuesta a incidentes y seguridad cloud.",
        },
        {
          period: "EN CURSO",
          title: "Desarrollo Blue Team y cloud",
          organisation: "Security Blue Team · TryHackMe · AWS Skill Builder",
          text:
            "Laboratorios continuos de análisis de red, forense, inteligencia de amenazas, fundamentos de Splunk, Linux y preparación de AWS Cloud Practitioner.",
        },
        {
          period: "BASE ACADÉMICA",
          title: "Ciencias del Deporte",
          organisation: "Formación reglada",
          text:
            "Se mantiene como formación académica; no se presenta como una credencial de ciberseguridad.",
        },
      ],
      facts: [
        "Inglés + español nativos",
        "Catalán profesional",
        "Permiso de trabajo UE + Reino Unido",
        "Remoto-first desde Menorca",
      ],
    },
    about: {
      eyebrow: "Sobre mí",
      title: "Una transición profesional apoyada en hábitos operativos.",
      lead:
        "Estoy dando el salto a ciberseguridad desde operaciones de atención al cliente, administración y soporte IT práctico. Ese recorrido no es un desvío: me enseñó a documentar, priorizar, proteger información sensible y comunicar cuando la situación viene con curvas.",
      body:
        "Fuera del trabajo construyo proyectos públicos de seguridad, mantengo un laboratorio defensivo con Raspberry Pi y estudio SOC, respuesta a incidentes, inteligencia de amenazas y fundamentos AWS. También aporto años de experiencia gestionando comunidades en directo como Twitch Partner: una escuela bastante eficaz de comunicación tranquila, resolución de problemas y lectura de contexto.",
      principles: [
        ["Evidencia antes que afirmaciones", "Si digo que lo he construido, debe existir un repositorio, informe o nota de laboratorio."],
        ["Útil antes que vistoso", "El siguiente control operativo importa más que otra insignia decorativa."],
        ["Abierto, pero cuidadoso", "Valoro el código abierto, la privacidad y la reproducibilidad sin publicar datos sensibles del laboratorio."],
      ],
    },
    contact: {
      eyebrow: "Contacto",
      title: "Hablemos de tu equipo de seguridad.",
      text:
        "Busco oportunidades junior en SOC, Blue Team y operaciones de seguridad. También estoy abierto a puestos de operaciones IT o NOC cercanos a seguridad donde la monitorización, la gestión de incidencias y el escalado sean parte central del trabajo.",
      email: "Escribir a Jaime",
      linkedin: "LinkedIn",
      github: "GitHub",
      cv: "Abrir CV",
      availability: "Con base en Menorca · Inglés y español nativos",
    },
    footer: {
      note: "Construido como evidencia práctica auditable.",
      legal: "© 2026 Jaime Ramsden de Frutos",
    },
  },
  ca: {
    meta: {
      menu: "Obrir menú",
      close: "Tancar menú",
      skip: "Saltar al contingut",
      external: "s’obre en una pestanya nova",
      top: "Tornar a dalt",
    },
    nav: {
      work: "Projectes",
      capabilities: "Capacitats",
      evidence: "Evidència",
      background: "Experiència",
      about: "Sobre mi",
      contact: "Contacte",
      live: "Disponible",
    },
    hero: {
      name: "Jaime Ramsden de Frutos",
      role: "Analista SOC Junior · Blue Team / Operacions de Seguretat",
      statementStart: "Converteixo disciplina operativa en",
      statementAccent: "feina defensiva auditable.",
      intro:
        "Combino responsabilitat sobre incidències, operacions multilingües i enginyeria defensiva pràctica: triatge basat en fonts, Linux i contenidors, visibilitat de xarxa, bons relleus, recuperació i automatització acurada.",
      explore: "Explorar evidència pràctica",
      cv: "Obrir CV",
      location: "Menorca · Remot a Espanya / UE · habilitat per al Regne Unit",
      availability:
        "Anglès + castellà natius · Català professional · permís UE + Regne Unit",
      railLabel: "Índex d’evidències",
      signals: [
        {
          name: "CyberDailyLog",
          status: "Automatitzat diàriament",
          detail: "Pipeline de 24 hores basat en fonts",
          stamp: "DADES EN VIU",
          href: links.cyberDailyLab,
        },
        {
          name: "Homelab defensiu",
          status: "Desplegament operatiu",
          detail: "Base LITE / FULL per a Raspberry Pi",
          stamp: "REPO PÚBLIC",
          href: links.homelab,
        },
        {
          name: "TryHackMe",
          status: "Top 1%",
          detail: "Evidència d’aprenentatge pràctic",
          stamp: "PERFIL",
          href: links.tryHackMe,
        },
      ],
    },
    liveFeed: {
      operational: "Pipeline operatiu",
      degraded: "Estat del pipeline disponible",
      assessed: "novetats analitzades",
      threshold: "sobre el llindar",
      sources: "fonts principals sanes",
      updated: "ACTUALITZAT",
    },
    scan: {
      eyebrow: "Ruta per a recruiters",
      title: "Una ruta d’evidència de 60 segons.",
      intro:
        "Comença pel que he construït, revisa com explico les decisions i verifica després la formació que ho sosté.",
      steps: [
        ["01", "Veure el resultat", "Obrir el projecte d’intel·ligència defensiva en viu.", links.cyberDailyLab],
        ["02", "Revisar el sistema", "Examinar l’automatització i les validacions.", links.cyberDailyLog],
        ["03", "Seguir el desplegament", "Explorar la base de l’homelab defensiu.", links.homelab],
        ["04", "Verificar el perfil", "Obrir el CV i l’evidència seleccionada.", links.cv],
      ],
    },
    work: {
      eyebrow: "Evidència pràctica destacada",
      title: "Projectes preparats per respondre preguntes.",
      intro:
        "Cada projecte declara el propòsit, l’estat actual i els límits. Res de disfressar-se de SOC empresarial: feina real i revisable, amb la següent millora lògica a la vista.",
      open: "Obrir projecte",
      brief: "Veure resum del projecte",
      report: "Llegir l’informe d’avui",
      cards: [
        {
          index: "01",
          kicker: "Projecte principal · Automatització + intel·ligència",
          title: "CyberDailyLog",
          summary:
            "Un informe Blue Team diari, automatitzat i basat en fonts, que recopila avisos públics, puntua i selecciona senyals defensius, valida els resultats i publica un informe auditable.",
          metrics: [
            ["24 h", "cobertura mòbil"],
            ["CVE", "context KEV + EPSS"],
            ["3/3", "quòrum de fonts"],
          ],
          notes: [
            "Pipeline de GitHub Actions amb publicació segura",
            "Context CVE, KEV, EPSS i fonts oficials",
            "Context humà i senyals comunitaris separats",
            "Metodologia, límits i accions següents clares",
          ],
          pipeline: {
            label: "Pipeline diari auditable",
            stages: [
              ["01", "Recopilar", "Avisos oficials + fonts defensives"],
              ["02", "Validar", "Esquema, actualitat i quòrum de fonts"],
              ["03", "Prioritzar", "CVE · KEV · EPSS · context analista"],
              ["04", "Publicar", "Informe validat + snapshot del portfolio"],
            ],
          },
          href: links.cyberDailyLab,
          secondaryHref: links.cyberDailyLog,
          secondaryLabel: "Revisar repositori",
          featured: true,
        },
        {
          index: "02",
          kicker: "Linux + contenidors + monitoratge",
          title: "Homelab defensiu",
          summary:
            "Un laboratori Blue Team reproduïble amb Raspberry Pi 4 i desplegaments LITE i FULL per a salut de serveis, mètriques, seguretat DNS, hardening, recuperació provada i notes d’incidents.",
          metrics: [
            ["8 GB", "Raspberry Pi 4"],
            ["1 TB", "emmagatzematge SSD"],
            ["2", "modes de desplegament"],
          ],
          notes: [
            "Prometheus, Grafana, Node Exporter i Uptime Kuma",
            "Exposició local i decisions de mínim privilegi",
            "Documentació sanejada i límits de confiança",
            "No es presenta com un SOC empresarial",
          ],
          href: links.homelab,
          secondaryHref: "",
          secondaryLabel: "",
          featured: false,
        },
        {
          index: "03",
          kicker: "Producte + QA + lliurament segur",
          title: "Aquest portfolio",
          summary:
            "Un portfolio multilingüe tractat com un petit sistema de producció: contingut per a recruiters, controls accessibles, CSP, QA responsive i desplegament de l’artefacte exacte.",
          metrics: [
            ["3", "idiomes"],
            ["CI", "build + QA de navegador"],
            ["A11y", "teclat + moviment"],
          ],
          notes: [
            "EN / ES / CA amb alternatives de contingut segures",
            "Navegació mòbil resistent a l’emmagatzematge estricte",
            "Enllaços a certificats concrets",
            "Desplegament a GitHub Pages condicionat a validació",
          ],
          delivery: {
            label: "Una font portable, tres rutes de lliurament compatibles",
            source: "Codi públic a GitHub",
            checks: "Lint · build estàtica · QA de rutes",
            artifact: "Build de compatibilitat reproduïble",
            targets: ["GitHub Pages", "ChatGPT Sites", "Docker / Nginx"],
          },
          href: links.portfolio,
          secondaryHref: "",
          secondaryLabel: "",
          featured: false,
        },
        {
          index: "04",
          kicker: "Economia + procedència de dades + producte",
          title: "Austrian Business Cycle Monitor",
          summary:
            "Un dashboard macro transparent que connecta liquiditat, condicions de crèdit, activitat productiva i estructura de mercat des d’una òptica d’economia austríaca, mostrant la salut de les fonts i els límits del model.",
          metrics: [
            ["3", "pilars analítics"],
            ["MACRO", "indicadors econòmics"],
            ["LIVE", "salut de dades"],
          ],
          notes: [
            "Capes de liquiditat, crèdit i estructura de mercat",
            "Indicadors d’activitat productiva i mercats",
            "Estats visibles de divergència i actualitat de dades",
            "Anàlisi educativa, no assessorament financer",
          ],
          href: links.austrianMonitorLab,
          secondaryHref: links.austrianMonitorRepo,
          secondaryLabel: "Revisar repositori",
          featured: false,
        },
      ],
    },
    capabilities: {
      eyebrow: "Capacitats",
      title: "Competències junior útils, expressades a l’altura correcta.",
      intro:
        "El meu valor no és fingir que ho sé tot. És combinar disciplina operativa, fonaments tècnics i comunicació clara perquè els perfils sèniors puguin confiar en el que lliuro.",
      items: [
        {
          code: "TRIATGE",
          title: "Monitoratge defensiu",
          text: "Priorització d’alertes, validació de fonts, informes concisos, criteri d’escalat i accions següents documentades.",
          tools: "CVE · KEV · EPSS · fonaments Splunk/SPL",
        },
        {
          code: "SISTEMES",
          title: "Linux i contenidors",
          text: "Línies base de servei, Docker, comprovacions de salut, logs, actualitzacions, validació de còpies i mínim privilegi.",
          tools: "Linux · Bash · Docker · Prometheus · Grafana",
        },
        {
          code: "XARXA",
          title: "Visibilitat de xarxa",
          text: "Fonaments TCP/IP, anàlisi de paquets, seguretat DNS, revisió d’exposició i diagrames defensables.",
          tools: "Wireshark · tcpdump · AdGuard Home",
        },
        {
          code: "IR / DFIR",
          title: "Fonaments d’incidents",
          text: "Gestió bàsica d’evidències, cronologies, notes d’incidents, OSINT i fluxos d’investigació repetibles.",
          tools: "Security Blue Team · TryHackMe · OSINT",
        },
        {
          code: "CLOUD",
          title: "Fonaments AWS",
          text: "Preparació per a AWS Cloud Practitioner amb atenció a IAM, responsabilitat compartida, logs i costos.",
          tools: "IAM · conceptes CloudTrail · responsabilitat compartida",
        },
        {
          code: "OPS",
          title: "Comunicació operativa",
          text: "Administració i atenció a l’usuari, suport IT, documentació, dades sensibles, responsabilitat i escalat.",
          tools: "Anglès i castellà natius · català professional",
        },
      ],
    },
    evidence: {
      eyebrow: "Evidència seleccionada",
      title: "Profunditat sense un mur de certificats.",
      intro:
        "El portfolio actual conté 37 registres formatius verificables. Aquests sis expliquen més ràpid el recorregut defensiu; els repositoris complets continuen disponibles per aprofundir.",
      selected: "6 seleccionats",
      total: "37 registres totals",
      verify: "Verificar evidència",
      full: "Veure tota l’evidència formativa",
      items: [
        {
          issuer: "Security Blue Team",
          title: "Blue Team Junior Analyst Pathway",
          focus: "VMs · xarxes · forense · OSINT · hunting · Bash · Python",
          year: "2024–25",
          href: links.blueTeamPathway,
        },
        {
          issuer: "UpgradeHub",
          title: "Ciberseguretat, Hacking Ètic i Cloud",
          focus: "Bootcamp intensiu de 350 hores",
          year: "2024",
          href: links.upgradeHubCertificate,
        },
        {
          issuer: "arcX",
          title: "Threat Intelligence Foundation",
          focus: "Cicle d’intel·ligència i fonaments d’anàlisi",
          year: "2024",
          href: links.credly,
        },
        {
          issuer: "Cisco Networking Academy",
          title: "Cyber Threat Management",
          focus: "Amenaces, controls i gestió defensiva",
          year: "2024",
          href: links.credly,
        },
        {
          issuer: "AWS Skill Builder",
          title: "Ruta de Cloud Practitioner",
          focus: "Evidència del curs; examen de certificació en preparació",
          year: "Actiu",
          href: links.awsEvidence,
        },
        {
          issuer: "TryHackMe",
          title: "Aprenentatge pràctic en ciberseguretat",
          focus: "Perfil Top 1% i pràctica de laboratoris documentada",
          year: "Actiu",
          href: links.tryHackMe,
        },
      ],
    },
    background: {
      eyebrow: "Experiència operativa",
      title: "Una trajectòria que transfereix valor a seguretat.",
      intro:
        "La meva carrera en ciberseguretat és nova; la disciplina operativa no. Aquests llocs han consolidat els hàbits que sostenen un triatge fiable, bons relleus i una comunicació serena.",
      workLabel: "Experiència rellevant",
      educationLabel: "Formació i desenvolupament",
      roles: [
        {
          period: "2025 — ARA",
          role: "Administració amb responsabilitat IT pràctica",
          organisation: "Operacions immobiliàries · Menorca",
          text:
            "Coordino incidències, proveïdors i parts interessades; gestiono documentació sensible; resolc problemes quotidians de sistemes i deixo traçabilitat quan diverses urgències competeixen.",
          signal: "Triatge · responsabilitat · documentació · escalat",
        },
        {
          period: "2023 — 2025",
          role: "Operacions i atenció a l’aeroport",
          organisation: "Jet2.com · Aeroport de Menorca",
          text:
            "Vaig treballar en un entorn multilingüe i condicionat pel temps, on la informació correcta, les decisions calmades i un escalat net afectaven passatgers reals.",
          signal: "Operacions en viu · impacte a l’usuari · comunicació bilingüe",
        },
        {
          period: "2016 — 2021",
          role: "Professional sènior de suport",
          organisation: "Serveis residencials · Regne Unit",
          text:
            "Vaig gestionar protecció de persones, informació confidencial, relleus i incidents en una feina on la confiança i els registres precisos no eren negociables.",
          signal: "Dades sensibles · relleus · registre d’incidents",
        },
      ],
      education: [
        {
          period: "2024",
          title: "Ciberseguretat, Hacking Ètic i Cloud",
          organisation: "UpgradeHub · bootcamp intensiu de 350 hores",
          text:
            "Fonaments pràctics de hacking ètic, anàlisi de vulnerabilitats, forense digital, resposta a incidents i seguretat cloud.",
        },
        {
          period: "EN CURS",
          title: "Desenvolupament Blue Team i cloud",
          organisation: "Security Blue Team · TryHackMe · AWS Skill Builder",
          text:
            "Laboratoris continus d’anàlisi de xarxa, forense, intel·ligència d’amenaces, fonaments de Splunk, Linux i preparació d’AWS Cloud Practitioner.",
        },
        {
          period: "BASE ACADÈMICA",
          title: "Ciències de l’Esport",
          organisation: "Formació reglada",
          text:
            "Es manté com a formació acadèmica; no es presenta com una credencial de ciberseguretat.",
        },
      ],
      facts: [
        "Anglès + castellà natius",
        "Català professional",
        "Permís de treball UE + Regne Unit",
        "Remote-first des de Menorca",
      ],
    },
    about: {
      eyebrow: "Sobre mi",
      title: "Una transició professional sostinguda per hàbits operatius.",
      lead:
        "Estic fent el salt a la ciberseguretat des d’operacions d’atenció al client, administració i suport IT pràctic. Aquest recorregut no és una desviació: m’ha ensenyat a documentar, prioritzar, protegir informació sensible i comunicar quan la situació es complica.",
      body:
        "Fora de la feina construeixo projectes públics de seguretat, mantinc un laboratori defensiu amb Raspberry Pi i estudio SOC, resposta a incidents, intel·ligència d’amenaces i fonaments AWS. També aporto anys d’experiència gestionant comunitats en directe com a Twitch Partner: una escola força eficaç de comunicació tranquil·la, resolució de problemes i lectura de context.",
      principles: [
        ["Evidència abans que afirmacions", "Si dic que ho he construït, hi ha d’haver un repositori, informe o nota de laboratori."],
        ["Útil abans que vistós", "El següent control operatiu importa més que una altra insígnia decorativa."],
        ["Obert, però acurat", "Valoro el codi obert, la privacitat i la reproduïbilitat sense publicar dades sensibles del laboratori."],
      ],
    },
    contact: {
      eyebrow: "Contacte",
      title: "Parlem del teu equip de seguretat.",
      text:
        "Busco oportunitats junior en SOC, Blue Team i operacions de seguretat. També estic obert a llocs d’operacions IT o NOC propers a seguretat on el monitoratge, la gestió d’incidències i l’escalat siguin una part central de la feina.",
      email: "Escriure a Jaime",
      linkedin: "LinkedIn",
      github: "GitHub",
      cv: "Obrir CV",
      availability: "Amb base a Menorca · Anglès i castellà natius",
    },
    footer: {
      note: "Construït com a evidència pràctica auditable.",
      legal: "© 2026 Jaime Ramsden de Frutos",
    },
  },
} as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function isCyberDailySnapshot(value: unknown): value is CyberDailySnapshot {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<CyberDailySnapshot>;
  return (
    typeof candidate.above_threshold === "number" &&
    typeof candidate.generated_at === "string" &&
    typeof candidate.pipeline_status === "string" &&
    typeof candidate.qualified_developments === "number" &&
    typeof candidate.source_health?.core?.healthy === "number" &&
    typeof candidate.source_health?.core?.total === "number"
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [showTop, setShowTop] = useState(false);
  const [cyberDailySnapshot, setCyberDailySnapshot] =
    useState<CyberDailySnapshot | null>(null);
  const t = content[language];

  useEffect(() => {
    let timer: number | undefined;
    try {
      const saved = window.localStorage.getItem("jimblogic-language") as Language;
      if (saved && saved in content) {
        timer = window.setTimeout(() => setLanguage(saved), 0);
      }
    } catch {
      // A blocked storage API must never block the portfolio.
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
      // Language still changes for the current visit.
    }
  }, [language]);

  useEffect(() => {
    const update = () => setShowTop(window.scrollY > 720);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const closeMenu = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };
    document.addEventListener("keydown", closeMenu);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      document.removeEventListener("keydown", closeMenu);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const sectionIds = [
      "top",
      "work",
      "capabilities",
      "evidence",
      "background",
      "about",
      "contact",
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -60%", threshold: [0, 0.2, 0.5] },
    );
    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cacheKey = "jimblogic-cyberdailylog-snapshot";
    const controller = new AbortController();
    let cancelled = false;
    let cacheTimer: number | undefined;

    try {
      const cached = window.sessionStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached) as {
          cachedAt?: number;
          data?: unknown;
        };
        if (
          typeof parsed.cachedAt === "number" &&
          Date.now() - parsed.cachedAt < 60 * 60 * 1000 &&
          isCyberDailySnapshot(parsed.data)
        ) {
          const cachedData = parsed.data;
          cacheTimer = window.setTimeout(() => {
            if (!cancelled) setCyberDailySnapshot(cachedData);
          }, 0);
        }
      }
    } catch {
      // A private or locked-down browser still receives the static fallback.
    }

    fetch(links.cyberDailyFeed, {
      headers: { accept: "application/json" },
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error("CyberDailyLog feed unavailable");
        return response.json() as Promise<unknown>;
      })
      .then((data) => {
        if (cancelled || !isCyberDailySnapshot(data)) return;
        setCyberDailySnapshot(data);
        try {
          window.sessionStorage.setItem(
            cacheKey,
            JSON.stringify({ cachedAt: Date.now(), data }),
          );
        } catch {
          // Live data remains visible even when storage is unavailable.
        }
      })
      .catch(() => {
        // The source-backed static summary is the intentional fallback.
      });

    return () => {
      cancelled = true;
      if (cacheTimer) window.clearTimeout(cacheTimer);
      controller.abort();
    };
  }, []);

  const changeLanguage = (next: Language) => {
    setLanguage(next);
    setMenuOpen(false);
  };

  const dateLocale = {
    en: "en-GB",
    es: "es-ES",
    ca: "ca-ES",
  }[language];

  const liveDate = cyberDailySnapshot
    ? new Intl.DateTimeFormat(dateLocale, {
        day: "2-digit",
        month: "short",
        timeZone: "Europe/Madrid",
      })
        .format(new Date(cyberDailySnapshot.generated_at))
        .toUpperCase()
    : null;

  const heroSignals = t.hero.signals.map((signal, index) =>
    index === 0 && cyberDailySnapshot
      ? {
          ...signal,
          status:
            cyberDailySnapshot.pipeline_status.toLowerCase() === "operational"
              ? t.liveFeed.operational
              : t.liveFeed.degraded,
          detail: `${cyberDailySnapshot.qualified_developments} ${t.liveFeed.assessed} · ${cyberDailySnapshot.above_threshold} ${t.liveFeed.threshold}`,
          stamp: `${t.liveFeed.updated} ${liveDate}`,
        }
      : signal,
  );

  const workCards = t.work.cards.map((project, index) =>
    index === 0 && cyberDailySnapshot
      ? {
          ...project,
          metrics: [
            [
              String(cyberDailySnapshot.qualified_developments),
              t.liveFeed.assessed,
            ],
            [
              String(cyberDailySnapshot.above_threshold),
              t.liveFeed.threshold,
            ],
            [
              `${cyberDailySnapshot.source_health.core.healthy}/${cyberDailySnapshot.source_health.core.total}`,
              t.liveFeed.sources,
            ],
          ],
        }
      : project,
  );

  return (
    <>
      <a className="skip-link" href="#main">
        {t.meta.skip}
      </a>

      <div className="site-shell">
        <header className="site-header">
          <a
            className="wordmark"
            href="#top"
            aria-label="JimBLogic — home"
            aria-current={activeSection === "top" ? "page" : undefined}
          >
            JimBLogic<span>.</span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? t.meta.close : t.meta.menu}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>

          <div className={`header-panel ${menuOpen ? "is-open" : ""}`}>
            <nav id="primary-navigation" aria-label="Primary">
              {(
                [
                  "work",
                  "capabilities",
                  "evidence",
                  "background",
                  "about",
                  "contact",
                ] as const
              ).map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    aria-current={activeSection === item ? "location" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {t.nav[item]}
                  </a>
                ))}
            </nav>

            <div className="availability">
              <span aria-hidden="true" />
              {t.nav.live}
            </div>

            <div className="languages" aria-label="Language">
              {(["en", "es", "ca"] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  className={language === lang ? "is-active" : ""}
                  aria-pressed={language === lang}
                  onClick={() => changeLanguage(lang)}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </header>

        <main id="main">
          <section className="hero" id="top" aria-labelledby="hero-title">
            <div className="hero-copy">
              <div className="trace trace-a" aria-hidden="true">
                07:00:00Z
              </div>
              <div className="trace trace-b" aria-hidden="true">
                SHA / PUBLIC
              </div>

              <div className="identity">
                <p>{t.hero.name}</p>
                <span>{t.hero.role}</span>
              </div>

              <h1 id="hero-title">
                {t.hero.statementStart}{" "}
                <em>{t.hero.statementAccent}</em>
              </h1>

              <p className="hero-intro">{t.hero.intro}</p>

              <div className="hero-actions">
                <a className="button button-primary" href="#work">
                  {t.hero.explore} <span aria-hidden="true">→</span>
                </a>
                <a
                  className="button button-secondary"
                  href={links.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.hero.cv} <Arrow />
                </a>
              </div>

              <div className="hero-meta">
                <p>
                  <span aria-hidden="true">⌖</span> {t.hero.location}
                </p>
                <p>{t.hero.availability}</p>
              </div>
            </div>

            <aside className="evidence-rail" aria-label={t.hero.railLabel}>
              <div className="profile-card">
                <div className="avatar-frame">
                  {/* Served locally on purpose: this avoids a fragile external image dependency. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/jaime-ramsden.webp"
                    alt="Jaime Ramsden de Frutos"
                    width="240"
                    height="240"
                    decoding="async"
                    fetchPriority="high"
                  />
                </div>
                <p className="profile-name">JimBLogic</p>
                <p className="profile-role">{t.hero.role}</p>
                <div className="profile-links">
                  <a href={links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                  <a href={links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <a href={links.tryHackMe} target="_blank" rel="noopener noreferrer">TryHackMe</a>
                </div>
              </div>
              <p className="rail-heading">{t.hero.railLabel}</p>
              {heroSignals.map((signal, index) => (
                <a
                  href={signal.href}
                  target={signal.href.startsWith("/") ? undefined : "_blank"}
                  rel={
                    signal.href.startsWith("/")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="signal"
                  key={signal.name}
                >
                  <span className="signal-number">0{index + 1}</span>
                  <span className="status-dot" aria-hidden="true" />
                  <span className="signal-copy">
                    <strong>{signal.name}</strong>
                    <span>{signal.status}</span>
                    <small>{signal.detail}</small>
                  </span>
                  <span className="signal-stamp">{signal.stamp}</span>
                  <Arrow />
                </a>
              ))}
            </aside>
          </section>

          <section className="proof-path" aria-labelledby="proof-path-title">
            <div className="section-heading compact">
              <p className="eyebrow">{t.scan.eyebrow}</p>
              <h2 id="proof-path-title">{t.scan.title}</h2>
              <p>{t.scan.intro}</p>
            </div>
            <ol>
              {t.scan.steps.map(([number, title, text, href]) => (
                <li key={number}>
                  <a
                    href={href}
                    target={href.startsWith("/") ? undefined : "_blank"}
                    rel={href.startsWith("/") ? undefined : "noopener noreferrer"}
                  >
                    <span>{number}</span>
                    <strong>{title}</strong>
                    <p>{text}</p>
                  </a>
                </li>
              ))}
            </ol>
          </section>

          <section className="section work-section" id="work">
            <div className="section-heading">
              <p className="eyebrow">{t.work.eyebrow}</p>
              <h2>{t.work.title}</h2>
              <p>{t.work.intro}</p>
            </div>

            <div className="work-grid">
              {workCards.map((project) => (
                <article
                  className={`project-card ${project.featured ? "is-featured" : ""} ${project.index === "04" ? "is-wide" : ""}`}
                  key={project.title}
                >
                  <div className="project-topline">
                    <span>{project.index}</span>
                    <p>{project.kicker}</p>
                  </div>
                  <h3>{project.title}</h3>
                  {project.index === "02" ? (
                    <figure className="project-visual">
                      {/* Direct static delivery is more reliable than runtime image transformation here. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/generic-sbc-homelab.webp"
                        alt="Generic single-board computer configured as a defensive homelab"
                        width="1200"
                        height="800"
                        loading="lazy"
                        decoding="async"
                      />
                      <figcaption>
                        SBC / LOCAL-FIRST / DEFENSIVE LAB
                      </figcaption>
                    </figure>
                  ) : null}
                  <p className="project-summary">{project.summary}</p>

                  {"delivery" in project ? (
                    <figure className="delivery-map">
                      <figcaption>{project.delivery.label}</figcaption>
                      <div className="delivery-flow">
                        <div className="delivery-node">
                          <span>01 / SOURCE</span>
                          <strong>{project.delivery.source}</strong>
                        </div>
                        <div className="delivery-node">
                          <span>02 / VERIFY</span>
                          <strong>{project.delivery.checks}</strong>
                        </div>
                        <div className="delivery-node is-artifact">
                          <span>03 / PACKAGE</span>
                          <strong>{project.delivery.artifact}</strong>
                        </div>
                        <div className="delivery-targets">
                          {project.delivery.targets.map((target) => (
                            <span key={target}>{target}</span>
                          ))}
                        </div>
                      </div>
                    </figure>
                  ) : null}

                  {"pipeline" in project ? (
                    <figure className="project-pipeline">
                      <figcaption>{project.pipeline.label}</figcaption>
                      <ol>
                        {project.pipeline.stages.map(([number, title, detail]) => (
                          <li key={number}>
                            <span>{number}</span>
                            <strong>{title}</strong>
                            <small>{detail}</small>
                          </li>
                        ))}
                      </ol>
                    </figure>
                  ) : null}

                  <dl className="project-metrics">
                    {project.metrics.map(([value, label]) => (
                      <div key={label}>
                        <dt>{value}</dt>
                        <dd>{label}</dd>
                      </div>
                    ))}
                  </dl>

                  <ul className="project-notes">
                    {project.notes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>

                  <div className="project-actions">
                    <a
                      href={project.href}
                      target={project.href.startsWith("/") ? undefined : "_blank"}
                      rel={
                        project.href.startsWith("/")
                          ? undefined
                          : "noopener noreferrer"
                      }
                    >
                      {project.href.startsWith("/") ? t.work.brief : t.work.open} <Arrow />
                    </a>
                    {project.secondaryHref ? (
                      <a
                        className="quiet-link"
                        href={project.secondaryHref}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.secondaryLabel} <Arrow />
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="section capabilities-section" id="capabilities">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">{t.capabilities.eyebrow}</p>
                <h2>{t.capabilities.title}</h2>
              </div>
              <p>{t.capabilities.intro}</p>
            </div>

            <div className="capability-grid">
              {t.capabilities.items.map((item, index) => (
                <article key={item.code}>
                  <div className="capability-code">
                    <span>0{index + 1}</span>
                    {item.code}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <small>{item.tools}</small>
                </article>
              ))}
            </div>
          </section>

          <section className="section evidence-section" id="evidence">
            <div className="section-heading evidence-heading">
              <div>
                <p className="eyebrow">{t.evidence.eyebrow}</p>
                <h2>{t.evidence.title}</h2>
                <p>{t.evidence.intro}</p>
              </div>
              <div className="evidence-count" aria-label={t.evidence.total}>
                <strong>{t.evidence.selected}</strong>
                <span>/ {t.evidence.total}</span>
              </div>
            </div>

            <div className="credential-list">
              {t.evidence.items.map((item, index) => (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={`${item.issuer}-${item.title}`}
                >
                  <span className="credential-mark" aria-hidden="true">
                    {credentialMarks[item.issuer] ?? `0${index + 1}`}
                  </span>
                  <span className="credential-main">
                    <small>{item.issuer}</small>
                    <strong>{item.title}</strong>
                    <span>{item.focus}</span>
                  </span>
                  <span className="credential-year">{item.year}</span>
                  <span className="credential-action">
                    {t.evidence.verify} <Arrow />
                  </span>
                </a>
              ))}
            </div>

            <a
              className="text-link"
              href="/certifications"
            >
              {t.evidence.full} <Arrow />
            </a>
          </section>

          <section className="section background-section" id="background">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">{t.background.eyebrow}</p>
                <h2>{t.background.title}</h2>
              </div>
              <p>{t.background.intro}</p>
            </div>

            <div className="background-grid">
              <div>
                <h3 className="group-label">{t.background.workLabel}</h3>
                <div className="timeline-list">
                  {t.background.roles.map((item) => (
                    <article key={`${item.period}-${item.role}`}>
                      <p className="timeline-period">{item.period}</p>
                      <div>
                        <h4>{item.role}</h4>
                        <p className="timeline-organisation">
                          {item.organisation}
                        </p>
                        <p>{item.text}</p>
                        <small>{item.signal}</small>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="group-label">{t.background.educationLabel}</h3>
                <div className="education-list">
                  {t.background.education.map((item) => (
                    <article key={`${item.period}-${item.title}`}>
                      <span>{item.period}</span>
                      <h4>{item.title}</h4>
                      <p className="timeline-organisation">
                        {item.organisation}
                      </p>
                      <p>{item.text}</p>
                    </article>
                  ))}
                </div>

                <ul className="profile-facts" aria-label={t.background.educationLabel}>
                  {t.background.facts.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="section about-section" id="about">
            <div className="section-heading">
              <p className="eyebrow">{t.about.eyebrow}</p>
              <h2>{t.about.title}</h2>
            </div>

            <div className="about-grid">
              <div className="about-copy">
                <p className="about-lead">{t.about.lead}</p>
                <p>{t.about.body}</p>
              </div>

              <div className="principles">
                {t.about.principles.map(([title, text], index) => (
                  <article key={title}>
                    <span>0{index + 1}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="contact-section" id="contact">
            <p className="eyebrow">{t.contact.eyebrow}</p>
            <h2>{t.contact.title}</h2>
            <p className="contact-copy">{t.contact.text}</p>
            <div className="contact-actions">
              <a className="button button-primary" href={links.email}>
                {t.contact.email} <span aria-hidden="true">→</span>
              </a>
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
                {t.contact.linkedin} <Arrow />
              </a>
              <a href={links.github} target="_blank" rel="noopener noreferrer">
                {t.contact.github} <Arrow />
              </a>
              <a href={links.cv} target="_blank" rel="noopener noreferrer">
                {t.contact.cv} <Arrow />
              </a>
            </div>
            <p className="contact-meta">{t.contact.availability}</p>
          </section>
        </main>

        <footer>
          <a className="wordmark" href="#top">
            JimBLogic<span>.</span>
          </a>
          <p>{t.footer.note}</p>
          <p>{t.footer.legal}</p>
        </footer>
      </div>

      <button
        type="button"
        className={`back-to-top ${showTop ? "is-visible" : ""}`}
        aria-label={t.meta.top}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>
    </>
  );
}
