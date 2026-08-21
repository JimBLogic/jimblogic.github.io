"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import "./certifications.css";

type Certificate = { name: string; issuer: string; href: string; featured?: boolean };
type Language = "en" | "es" | "ca";

const certificates: Certificate[] = [
  { name: "Blue Team Junior Analyst Pathway Bundle", issuer: "Security Blue Team", href: "https://github.com/JimBLogic/Security-Blue-Team-Learning-Journey-Certificates/blob/main/certs/Blue%20Team%20Junior%20Analyst%20Pathway%20Bundle-btja.pdf", featured: true },
  { name: "Cybersecurity, Ethical Hacking & Cloud Bootcamp", issuer: "UpgradeHub", href: "https://jimblogic.github.io/documents/UpgradeHub-Cert.pdf", featured: true },
  { name: "Cyber Threat Management", issuer: "Cisco", href: "https://www.credly.com/badges/5e2eb763-9d96-4f29-8018-99a71b82c352", featured: true },
  { name: "AWS SimuLearn — Cloud Practitioner", issuer: "AWS", href: "https://www.credly.com/badges/2fbdc9ba-c4f6-4e34-bfe6-ada0751e536a", featured: true },
  { name: "KCCS — Knowledge of Cybersecurity Skills", issuer: "Mossé Cyber Security Institute", href: "https://students.mosse-institute.com/knowledge-test/CwLmPjf2GImtJzeszhxJ", featured: true },
  { name: "Introduction to Cybersecurity", issuer: "Cisco", href: "https://www.credly.com/badges/cf1cfdca-0fa3-4989-b065-46d985178ae2" },
  { name: "Access Control Basics", issuer: "Cybrary", href: "https://github.com/JimBLogic/Cybrary-IT-Cybersecurity-Certificates-and-Labs/blob/main/Certificates/cybrary-cert-access-control-basics.pdf" },
  { name: "Cryptography Basics", issuer: "Cybrary", href: "https://github.com/JimBLogic/Cybrary-IT-Cybersecurity-Certificates-and-Labs/blob/main/Certificates/cybrary-cert-cryptography-basics.pdf" },
  { name: "Firewall Basics", issuer: "Cybrary", href: "https://github.com/JimBLogic/Cybrary-IT-Cybersecurity-Certificates-and-Labs/blob/main/Certificates/cybrary-cert-firewall-basics.pdf" },
  { name: "Group Policy Basics", issuer: "Cybrary", href: "https://github.com/JimBLogic/Cybrary-IT-Cybersecurity-Certificates-and-Labs/blob/main/Certificates/cybrary-cert-group-policy-basics.pdf" },
  { name: "IP Addressing Basics", issuer: "Cybrary", href: "https://github.com/JimBLogic/Cybrary-IT-Cybersecurity-Certificates-and-Labs/blob/main/Certificates/cybrary-cert-ip-addressing-basics.pdf" },
  { name: "Patching Basics", issuer: "Cybrary", href: "https://github.com/JimBLogic/Cybrary-IT-Cybersecurity-Certificates-and-Labs/blob/main/Certificates/cybrary-cert-patching-basics.pdf" },
  { name: "General Security Concepts", issuer: "Cybrary", href: "https://github.com/JimBLogic/Cybrary-IT-Cybersecurity-Certificates-and-Labs/blob/main/Labs/cybrary-cert-security-general-security-concepts.pdf" },
  { name: "Security Architecture", issuer: "Cybrary", href: "https://github.com/JimBLogic/Cybrary-IT-Cybersecurity-Certificates-and-Labs/blob/main/Labs/cybrary-cert-security-security-architecture.pdf" },
  { name: "Security Operations", issuer: "Cybrary", href: "https://github.com/JimBLogic/Cybrary-IT-Cybersecurity-Certificates-and-Labs/blob/main/Labs/cybrary-cert-security-security-operations.pdf" },
  { name: "Security Program Management and Oversight", issuer: "Cybrary", href: "https://github.com/JimBLogic/Cybrary-IT-Cybersecurity-Certificates-and-Labs/blob/main/Labs/cybrary-cert-security-security-program-management-and-oversight.pdf" },
  { name: "Threats, Vulnerabilities, and Mitigations", issuer: "Cybrary", href: "https://github.com/JimBLogic/Cybrary-IT-Cybersecurity-Certificates-and-Labs/blob/main/Labs/cybrary-cert-security-threats-vulnerabilities-and-mitigations.pdf" },
  { name: "Vulnerability Scanner Basics", issuer: "Cybrary", href: "https://github.com/JimBLogic/Cybrary-IT-Cybersecurity-Certificates-and-Labs/blob/main/Certificates/cybrary-cert-vulnerability-scanner-basics.pdf" },
  { name: "Defensive Security Operations", issuer: "Cybrary", href: "https://github.com/JimBLogic/Cybrary-IT-Cybersecurity-Certificates-and-Labs/blob/main/Labs/cybrary-cert-defensive-security-operations.pdf" },
  { name: "Data Backup and Recovery Basics", issuer: "Cybrary", href: "https://github.com/JimBLogic/Cybrary-IT-Cybersecurity-Certificates-and-Labs/blob/main/Certificates/cybrary-cert-data-backup-and-recovery.pdf" },
  { name: "Threat Modeling", issuer: "Cybrary", href: "https://github.com/JimBLogic/Cybrary-IT-Cybersecurity-Certificates-and-Labs/blob/main/Certificates/cybrary-cert-threat-modeling.pdf" },
  { name: "Defensive Security and Cyber Risk", issuer: "Cybrary", href: "https://github.com/JimBLogic/Cybrary-IT-Cybersecurity-Certificates-and-Labs/blob/main/Labs/cybrary-cert-defensive-security-and-cyber-risk.pdf" },
  { name: "Introduction to Dark Web Operations", issuer: "Security Blue Team", href: "https://github.com/JimBLogic/Security-Blue-Team-Learning-Journey-Certificates/blob/main/certs/Introduction%20to%20Dark%20Web%20Operations-course.pdf" },
  { name: "Introduction to Digital Forensics", issuer: "Security Blue Team", href: "https://github.com/JimBLogic/Security-Blue-Team-Learning-Journey-Certificates/blob/main/certs/Introduction%20to%20Digital%20Forensics-course.pdf" },
  { name: "Introduction to Network Analysis", issuer: "Security Blue Team", href: "https://github.com/JimBLogic/Security-Blue-Team-Learning-Journey-Certificates/blob/main/certs/Introduction%20to%20Network%20Analysis-course.pdf" },
  { name: "Introduction to OSINT", issuer: "Security Blue Team", href: "https://github.com/JimBLogic/Security-Blue-Team-Learning-Journey-Certificates/blob/main/certs/Introduction%20to%20OSINT-course.pdf" },
  { name: "Introduction to PowerShell", issuer: "Security Blue Team", href: "https://github.com/JimBLogic/Security-Blue-Team-Learning-Journey-Certificates/blob/main/certs/Introduction%20to%20PowerShell-course.pdf" },
  { name: "Introduction to Python", issuer: "Security Blue Team", href: "https://github.com/JimBLogic/Security-Blue-Team-Learning-Journey-Certificates/blob/main/certs/Introduction%20to%20Python-course.pdf" },
  { name: "Introduction to Bash", issuer: "Security Blue Team", href: "https://github.com/JimBLogic/Security-Blue-Team-Learning-Journey-Certificates/blob/main/certs/Introduction%20to%20Bash-course.pdf" },
  { name: "Introduction to Threat Hunting", issuer: "Security Blue Team", href: "https://github.com/JimBLogic/Security-Blue-Team-Learning-Journey-Certificates/blob/main/certs/Introduction%20to%20Threat%20Hunting-course.pdf" },
  { name: "Introduction to Virtual Machines", issuer: "Security Blue Team", href: "https://github.com/JimBLogic/Security-Blue-Team-Learning-Journey-Certificates/blob/main/certs/Introduction%20to%20Virtual%20Machines-course.pdf" },
  { name: "Introduction to Vulnerability Management", issuer: "Security Blue Team", href: "https://github.com/JimBLogic/Security-Blue-Team-Learning-Journey-Certificates/blob/main/certs/Introduction%20to%20Vulnerability%20Management-course.pdf" },
  { name: "Mental Health in Cybersecurity", issuer: "Security Blue Team", href: "https://github.com/JimBLogic/Security-Blue-Team-Learning-Journey-Certificates/blob/main/certs/Mental%20Health%20in%20Cybersecurity-course.pdf" },
  { name: "AWS Course Completion Certificate", issuer: "AWS", href: "https://github.com/JimBLogic/AWS-IBM-Skills-Build-KCCS-Moss-Cibersecurity-Institute/blob/main/certs/156_3_6860342_1735817985_AWS%20Course%20Completion%20Certificate.pdf" },
  { name: "AWS Skill Builder Course Completion Certificate", issuer: "AWS", href: "https://github.com/JimBLogic/AWS-IBM-Skills-Build-KCCS-Moss-Cibersecurity-Institute/blob/main/certs/18443_5_6860342_1735810643_AWS%20Skill%20Builder%20Course%20Completion%20Certificate.pdf" },
  { name: "Python 60h", issuer: "IBM", href: "https://github.com/JimBLogic/AWS-IBM-Skills-Build-KCCS-Moss-Cibersecurity-Institute/blob/main/certs/python%2060h.pdf" },
  { name: "Web Development with Python", issuer: "IBM", href: "https://www.credly.com/badges/377ba6ff-0d4b-41df-8477-5ba08748c63d" },
];

const copy = {
  en: {
    skip: "Skip to credentials",
    back: "Portfolio",
    eyebrow: "VERIFIABLE LEARNING EVIDENCE",
    title: "Credentials, without the badge wall.",
    intro: "A complete, searchable record. Featured credentials come first; every card opens the original PDF, repository evidence or issuer verification page.",
    records: "records",
    issuers: "issuers",
    search: "Search",
    issuer: "Issuer",
    all: "All",
    placeholder: "Try: forensics, AWS, Python…",
    showing: "Showing",
    of: "of",
    featured: "Featured",
    empty: "No matching credentials. Try a broader search.",
    return: "Return to portfolio",
    filters: "Credential filters",
    list: "Credentials",
    language: "Language",
  },
  es: {
    skip: "Saltar a las credenciales",
    back: "Portfolio",
    eyebrow: "EVIDENCIA FORMATIVA VERIFICABLE",
    title: "Credenciales, sin un muro de insignias.",
    intro: "Un registro completo y buscable. Las credenciales destacadas aparecen primero; cada tarjeta abre el PDF original, la evidencia del repositorio o la verificación del emisor.",
    records: "registros",
    issuers: "emisores",
    search: "Buscar",
    issuer: "Emisor",
    all: "Todos",
    placeholder: "Prueba: forense, AWS, Python…",
    showing: "Mostrando",
    of: "de",
    featured: "Destacada",
    empty: "No hay credenciales coincidentes. Prueba una búsqueda más amplia.",
    return: "Volver al portfolio",
    filters: "Filtros de credenciales",
    list: "Credenciales",
    language: "Idioma",
  },
  ca: {
    skip: "Saltar a les credencials",
    back: "Portfolio",
    eyebrow: "EVIDÈNCIA FORMATIVA VERIFICABLE",
    title: "Credencials, sense un mur d’insígnies.",
    intro: "Un registre complet i cercable. Les credencials destacades apareixen primer; cada targeta obre el PDF original, l’evidència del repositori o la verificació de l’emissor.",
    records: "registres",
    issuers: "emissors",
    search: "Cercar",
    issuer: "Emissor",
    all: "Tots",
    placeholder: "Prova: forense, AWS, Python…",
    showing: "Mostrant",
    of: "de",
    featured: "Destacada",
    empty: "No hi ha credencials coincidents. Prova una cerca més àmplia.",
    return: "Tornar al portfolio",
    filters: "Filtres de credencials",
    list: "Credencials",
    language: "Idioma",
  },
} as const;

export default function CertificationsPage() {
  const [language, setLanguage] = useState<Language>("en");
  const [query, setQuery] = useState("");
  const [issuer, setIssuer] = useState("All");
  const t = copy[language];
  const issuers = useMemo(() => ["All", ...Array.from(new Set(certificates.map((item) => item.issuer))).sort()], []);
  const results = certificates.filter((item) => {
    const matchesIssuer = issuer === "All" || item.issuer === issuer;
    const haystack = `${item.name} ${item.issuer}`.toLowerCase();
    return matchesIssuer && haystack.includes(query.trim().toLowerCase());
  });

  useEffect(() => {
    let timer: number | undefined;
    try {
      const saved = window.localStorage.getItem("jimblogic-language") as Language | null;
      if (saved && saved in copy) {
        timer = window.setTimeout(() => {
          setLanguage(saved);
        }, 0);
      }
    } catch {
      // The default language remains available when storage is blocked.
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
      // The selection still applies to this visit.
    }
  }, [language]);

  const changeLanguage = (next: Language) => {
    setLanguage(next);
  };

  return (
    <>
    <a className="skip-link" href="#certificates">{t.skip}</a>
    <main className="cert-page">
      <nav className="cert-nav" aria-label="Breadcrumb">
        <Link href="/">← {t.back}</Link>
        <div className="cert-nav-tools">
          <div className="languages" aria-label={t.language}>
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
          <span>JimBLogic.</span>
        </div>
      </nav>
      <header className="cert-hero">
        <p className="cert-eyebrow">{t.eyebrow}</p>
        <h1>{t.title}</h1>
        <p>{t.intro}</p>
        <div className="cert-stats"><strong>{certificates.length}</strong><span>{t.records}</span><strong>{issuers.length - 1}</strong><span>{t.issuers}</span></div>
      </header>
      <section className="cert-controls" aria-label={t.filters}>
        <label><span>{t.search}</span><input type="search" autoComplete="off" value={query} onChange={(event) => setQuery(event.currentTarget.value)} placeholder={t.placeholder} /></label>
        <label><span>{t.issuer}</span><select value={issuer} onChange={(event) => setIssuer(event.target.value)}>{issuers.map((item) => <option key={item} value={item}>{item === "All" ? t.all : item}</option>)}</select></label>
      </section>
      <p className="result-count" aria-live="polite">{t.showing} {results.length} {t.of} {certificates.length}</p>
      <section className="cert-grid" id="certificates" aria-label={t.list}>
        {results.map((item, index) => (
          <a href={item.href} target="_blank" rel="noopener noreferrer" className={item.featured ? "cert-card featured" : "cert-card"} key={`${item.issuer}-${item.name}`}>
            <span className="cert-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="cert-copy"><small>{item.issuer}</small><strong>{item.name}</strong>{item.featured ? <em>{t.featured}</em> : null}</span>
            <span className="cert-open" aria-hidden="true">↗</span>
          </a>
        ))}
      </section>
      {results.length === 0 ? <p className="cert-empty">{t.empty}</p> : null}
      <footer className="cert-footer"><Link href="/">{t.return}</Link><span>© 2026 Jaime Ramsden de Frutos</span></footer>
    </main>
    </>
  );
}
