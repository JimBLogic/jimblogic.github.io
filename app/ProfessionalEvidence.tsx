import type { Language } from "@/lib/local-preferences";
import { careerStatus } from "@/lib/career-status";

const copy = {
  en: {
    title: "What the evidence actually demonstrates", original: "Original projects", learning: "Learning / labs", training: "Training & certifications", forks: "Forks / upstream experiments",
    originals: "CyberDailyLog, Defensive Homelab, Austrian Business Cycle Monitor and this portfolio are my own project repositories. Their dependencies and external data sources retain their respective authorship.",
    cti: "CyberDailyLog is my main defensive project: CISA KEV, NVD and FIRST EPSS; stateful CVE tracking and state transitions; structured feeds and advisory text; correlation, prioritisation and reporting. Source-health checks, explicit degradation and publication SLO records make failures and delays reviewable. It is a CTI learning and automation project, not a SIEM or professional SOC service.",
    next: "Next homelab evidence · pending", pending: "These are planned evidence deliverables, not completed exercises. Public templates and fictional examples do not prove operation.",
    checklist: ["Baseline service health", "Authentication triage", "Windows / Sysmon or equivalent telemetry", "SIEM query with explained results", "Sanitised incident note", "Detection tuning and before/after results"],
    labs: "TryHackMe and guided Blue Team / Splunk exercises are training. Professional experience remains administration, customer operations and practical IT support; no paid SOC role is claimed.",
    upstream: "PEASS-ng, RaspiBlitz, DeepSeek-R1, public-apis, Odysseus and Lightning Network Book are upstream learning resources, not my authored products. A fork alone does not demonstrate a contribution.",
    evidence: "Inspect state tracking", timing: "Inspect publication timing", validation: "Inspect homelab validation script",
  },
  es: {
    title: "Qué demuestra realmente la evidencia", original: "Proyectos originales", learning: "Aprendizaje / laboratorios", training: "Formación y certificaciones", forks: "Forks / experimentos sobre código de terceros",
    originals: "CyberDailyLog, Defensive Homelab, Austrian Business Cycle Monitor y este portfolio son repositorios de proyectos propios. Sus dependencias y fuentes externas conservan su autoría correspondiente.",
    cti: "CyberDailyLog es mi principal proyecto defensivo: CISA KEV, NVD y FIRST EPSS; seguimiento persistente de CVE y transiciones de estado; feeds estructurados y texto de avisos; correlación, priorización e informes. La salud de fuentes, la degradación explícita y los registros del SLO de publicación permiten revisar fallos y retrasos. Es un proyecto de aprendizaje y automatización CTI, no un SIEM ni un servicio SOC profesional.",
    next: "Próximas evidencias del homelab · pendientes", pending: "Son entregables previstos, no ejercicios completados. Las plantillas públicas y los ejemplos ficticios no acreditan operación real.",
    checklist: ["Estado base de los servicios", "Triaje de autenticación", "Telemetría Windows / Sysmon o equivalente", "Consulta SIEM con resultados explicados", "Nota de incidente anonimizada", "Ajuste de detección y resultados antes/después"],
    labs: "TryHackMe y los ejercicios guiados Blue Team / Splunk son formación. La experiencia profesional corresponde a administración, atención al cliente y soporte IT práctico; no se afirma experiencia laboral SOC.",
    upstream: "PEASS-ng, RaspiBlitz, DeepSeek-R1, public-apis, Odysseus y Lightning Network Book son recursos de aprendizaje de terceros, no productos propios. Un fork por sí solo no demuestra una contribución.",
    evidence: "Revisar seguimiento de estados", timing: "Revisar tiempos de publicación", validation: "Revisar script de validación del homelab",
  },
  ca: {
    title: "Què demostra realment l’evidència", original: "Projectes originals", learning: "Aprenentatge / laboratoris", training: "Formació i certificacions", forks: "Forks / experiments sobre codi de tercers",
    originals: "CyberDailyLog, Defensive Homelab, Austrian Business Cycle Monitor i aquest portfolio són repositoris de projectes propis. Les dependències i fonts externes conserven l’autoria corresponent.",
    cti: "CyberDailyLog és el meu principal projecte defensiu: CISA KEV, NVD i FIRST EPSS; seguiment persistent de CVE i transicions d’estat; feeds estructurats i text d’avisos; correlació, priorització i informes. La salut de fonts, la degradació explícita i els registres de l’SLO de publicació permeten revisar fallades i retards. És un projecte d’aprenentatge i automatització CTI, no un SIEM ni un servei SOC professional.",
    next: "Pròximes evidències del homelab · pendents", pending: "Són lliurables previstos, no exercicis completats. Les plantilles públiques i els exemples ficticis no acrediten operació real.",
    checklist: ["Estat base dels serveis", "Triatge d’autenticació", "Telemetria Windows / Sysmon o equivalent", "Consulta SIEM amb resultats explicats", "Nota d’incident anonimitzada", "Ajust de detecció i resultats abans/després"],
    labs: "TryHackMe i els exercicis guiats Blue Team / Splunk són formació. L’experiència professional correspon a administració, atenció al client i suport IT pràctic; no s’afirma experiència laboral SOC.",
    upstream: "PEASS-ng, RaspiBlitz, DeepSeek-R1, public-apis, Odysseus i Lightning Network Book són recursos d’aprenentatge de tercers, no productes propis. Un fork per si sol no demostra una contribució.",
    evidence: "Revisar seguiment d’estats", timing: "Revisar temps de publicació", validation: "Revisar script de validació del homelab",
  },
};
export function ProfessionalEvidence({ language }: { language: Language }) {
  const t = copy[language]; const status = careerStatus[language];
  return <section className="section professional-evidence" aria-labelledby="evidence-scope">
    <h2 id="evidence-scope">{t.title}</h2>
    <h3>{t.original}</h3><p>{t.originals}</p><p>{t.cti}</p>
    <p><a href="https://github.com/JimBLogic/CyberDailyLog/blob/main/src/cyberdailylog/state.py">{t.evidence}</a> · <a href="https://github.com/JimBLogic/CyberDailyLog/blob/main/reports/publication-timing.json">{t.timing}</a></p>
    <h3>Defensive Homelab</h3><p><strong>{status.baseline}</strong></p>
    <details><summary>{t.next}</summary><p>{t.pending}</p><ul>{t.checklist.map(item => <li key={item}>{item}</li>)}</ul><a href="https://github.com/JimBLogic/defensive-homelab-blue-team/blob/main/deploy/scripts/verify-stack.sh">{t.validation}</a></details>
    <h3>{t.learning}</h3><p>{t.labs}</p>
    <h3>{t.training}</h3><p>{status.aws}</p><p>{status.badge}</p>
    <details><summary>{t.forks}</summary><p>{t.upstream}</p></details>
  </section>;
}
