import type { Metadata } from "next";
import Link from "next/link";
import { catalog, qaCases, sourceCategories, sourceWorkflows } from "@/lib/agent-resources";
import styles from "../resources.module.css";

const canonical = "https://jimblogic.github.io/agent-resources/";
const sourceById = new Map(catalog.sources.map((source) => [source.id, source]));

export const metadata: Metadata = {
  title: "Agent Resources | Source selection and evidence",
  description: "Choose and combine technical sources with explicit provenance, worked review paths and limitations. Static catalogue and evaluation cases by JimBLogic.",
  alternates: { canonical },
  openGraph: {
    title: "Agent Resources | JimBLogic",
    description: "Practical source-selection workflows, publisher attribution and transparent evaluation cases.",
    url: canonical,
    type: "website",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${canonical}#page`,
  url: canonical,
  name: "Agent Resources: source selection and evidence",
  description: "Editorial technical source catalogue with original review workflows and explicit limitations.",
  inLanguage: "en",
  dateModified: "2026-11-10",
  isPartOf: { "@id": "https://jimblogic.github.io/#website" },
  author: { "@id": "https://jimblogic.github.io/#person" },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: catalog.sources.length,
    itemListElement: catalog.sources.map((source, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: source.name,
        url: source.url,
        publisher: { "@type": "Organization", name: source.publisher },
        description: source.question,
      },
    })),
  },
};

export default function AgentResourcesPage() {
  return (
    <div className={styles.root}>
      <a className="skip-link" href="#resource-main">Skip to source selection</a>
      <div className={styles.frame}>
        <header className={styles.header}>
          <Link className={styles.brand} href="/" aria-label="JimBLogic portfolio home">JimBLogic<span>.</span></Link>
          <nav className={styles.navigation} aria-label="Resource navigation">
            <a href="/agent-resources/catalog.json">Catalogue JSON</a>
            <a href="/agent-resources/qa-cases.json">Evaluation cases</a>
            <Link href="/#work">Portfolio projects</Link>
          </nav>
        </header>
        <main id="resource-main" tabIndex={-1}>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
          <section className={styles.hero} aria-labelledby="resource-title">
            <p className={styles.eyebrow}>JIMBLOGIC SOURCE ROUTER · 1.0 · EDITORIAL RESOURCE</p>
            <h1 id="resource-title">A source is useful when it answers the right question.</h1>
            <p>Start with the decision you need to make, choose a responsible publisher, then preserve the limits of its evidence. These review paths explain how to combine sources without turning a prediction, a framework or a chart into a stronger claim than it supports.</p>
            <p className={styles.languageNote}>Descriptions are in English. <span lang="es">Guía de selección de fuentes con procedencia y límites explícitos.</span> <span lang="ca">Guia de selecció de fonts amb procedència i límits explícits.</span></p>
            <a className={styles.primaryLink} href="#workflows">Choose a review path <span aria-hidden="true">↓</span></a>
            <nav className={styles.jumpLinks} aria-label="On this page">
              <a href="#sources">Publisher sources</a>
              <a href="#projects">Project evidence</a>
              <a href="#evaluation">Evaluation cases</a>
              <a href="#method">Method and JSON</a>
            </nav>
          </section>

          <section className={styles.section} id="workflows" aria-labelledby="workflows-title">
            <p className={styles.eyebrow}>FROM A QUESTION TO A REVIEWABLE CLAIM</p>
            <h2 id="workflows-title">Review paths you can reproduce.</h2>
            <p>Keep a small evidence record: the question, exact source URL, retrieval time, affected version or dataset, observation and remaining uncertainty. The steps below are original editorial guidance; they are not live answers or a record of tests performed by an agent.</p>
            <div className={styles.grid}>
              {sourceWorkflows.map((workflow) => (
                <article className={styles.workflow} key={workflow.id} id={`workflow-${workflow.id}`}>
                  <h3>{workflow.title}</h3>
                  <p><strong>Question:</strong> {workflow.question}</p>
                  <div className={styles.links} aria-label={`Sources for ${workflow.title}`}>
                    {workflow.source_ids.map((id) => <a key={id} href={`#${id}`}>{sourceById.get(id)?.name}</a>)}
                  </div>
                  <ol>{workflow.steps.map((step) => <li key={step}>{step}</li>)}</ol>
                  <p className={styles.warning}><strong>Do not infer:</strong> {workflow.do_not_infer}</p>
                  <p><strong>Project connection:</strong> {workflow.project_connection}</p>
                  <ul className={styles.evidence} aria-label="Supporting references">
                    {workflow.evidence.map((evidence) => <li key={evidence.url}><a href={evidence.url} rel="noreferrer">{evidence.label}</a></li>)}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.section} id="sources" aria-labelledby="sources-title">
            <p className={styles.eyebrow}>PROVENANCE BEFORE POPULARITY</p>
            <h2 id="sources-title">{catalog.sources.length} editorially selected sources.</h2>
            <p>Publisher links are direct. Entries describe what a source can establish, and the boundary you must preserve when citing it. A selection review date does not establish current content, availability or data freshness.</p>
            {sourceCategories.map((category) => (
              <section className={styles.group} key={category.id} aria-labelledby={`heading-${category.id}`}>
                <h3 id={`heading-${category.id}`}>{category.heading}</h3>
                <p>{category.note}</p>
                <div className={styles.grid}>
                  {catalog.sources.filter((source) => source.topic === category.id).map((source) => (
                    <article className={styles.card} key={source.id} id={source.id} tabIndex={-1}>
                      <div className={styles.micro}><span>{source.format}</span><span>{source.publisher}</span></div>
                      <h4>{source.name}</h4>
                      <p><strong>Question:</strong> {source.question}</p>
                      <p><strong>Limitation:</strong> {source.limitation}</p>
                      <p className={styles.reviewDate}>Original selection reviewed: <time dateTime={source.reviewed_on}>{source.reviewed_on}</time></p>
                      <a href={source.url} rel="noreferrer">Read {source.publisher}&apos;s original source <span aria-hidden="true">↗</span></a>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </section>

          <section className={styles.section} id="projects" aria-labelledby="projects-title">
            <h2 id="projects-title">Inspect the reasoning in the projects.</h2>
            <p>These projects offer different ways to examine source handling and interface decisions. Their briefs separate original work, educational interpretation and experimental presentation.</p>
            <div className={styles.projectGrid}>
              <article className={styles.card}>
                <p className={styles.eyebrow}>DEFENSIVE INTELLIGENCE</p>
                <h3>CyberDailyLog</h3>
                <p>Review the personal CTI pipeline&apos;s source health, CVE state transitions and publication evidence. Keep confirmed exploitation, enrichment and predictive scores distinct.</p>
                <Link href="/labs/cyberdailylog/">Read the project and evidence path →</Link>
              </article>
              <article className={styles.card}>
                <p className={styles.eyebrow}>ECONOMIC DATA</p>
                <h3>Austrian Business Cycle Monitor</h3>
                <p>Separate macro observations from an economic interpretation. Start with provenance, definitions and freshness before comparing indicators or reading a cycle signal.</p>
                <Link href="/labs/austrian-monitor/">Read the project and its limits →</Link>
              </article>
              <article className={styles.card}>
                <p className={styles.eyebrow}>OPTIONAL INTERACTIVE EXPERIMENT</p>
                <h3>CyberSecurity 3D Lab</h3>
                <p>Explore the presentation experiment through a text brief first. A spatial interface is not evidence of an operational SOC, completed training or a security assessment.</p>
                <Link href="/labs/3d-lab/">Use the non-3D project brief →</Link>
              </article>
            </div>
          </section>

          <section className={styles.section} id="evaluation" aria-labelledby="evaluation-title">
            <h2 id="evaluation-title">Transparent source-selection cases.</h2>
            <p>{qaCases.purpose}</p>
            <p>These are evaluation fixtures, not recorded model results. For each prompt, choose a source, preserve the warning and inspect the original publisher before answering. Real answer quality also depends on the current evidence and the question&apos;s scope.</p>
            <div className={styles.cases}>
              {qaCases.cases.map((entry) => (
                <details className={styles.case} key={entry.id}>
                  <summary>{entry.prompt}</summary>
                  <p><strong>Expected starting point:</strong> <a href={`#${entry.expected_source_id}`}>{sourceById.get(entry.expected_source_id)?.name}</a></p>
                  <p><strong>Why:</strong> {entry.reason}</p>
                  <p><strong>Preserve this warning:</strong> {entry.avoid}</p>
                </details>
              ))}
            </div>
          </section>

          <section className={styles.notice} id="method" aria-labelledby="method-title">
            <h2 id="method-title">Method, attribution and machine-readable files.</h2>
            <p>Catalogue descriptions and workflows reviewed on <time dateTime={catalog.reviewed_on}>{catalog.reviewed_on}</time>. Per-source dates retain the original editorial selection review. Neither date certifies endpoint uptime, publisher updates or reuse permission. Check source release dates and terms when you use its information.</p>
            <p>{catalog.license_notice}</p>
            <p>The router is static. It does not fetch publishers on your behalf, run an AI model or record your questions. External publishers and the hosting providers apply their own privacy practices. <code>llms.txt</code> is an optional discovery aid; it does not guarantee crawler access, indexing or AI citation.</p>
            <div className={styles.links}>
              <a href="/agent-resources/catalog.json">Catalogue JSON</a>
              <a href="/agent-resources/catalog.schema.json">Catalogue schema</a>
              <a href="/agent-resources/qa-cases.json">Evaluation JSON</a>
              <a href="/agent-resources/qa-cases.schema.json">Evaluation schema</a>
              <a href="/llms.txt">llms.txt</a>
              <a href="https://github.com/JimBLogic/jimblogic.github.io/blob/main/docs/AGENT_RESOURCES.md" rel="noreferrer">Maintenance documentation</a>
            </div>
          </section>
        </main>
        <footer className={styles.footer}>
          <Link href="/">← Professional portfolio</Link>
          <Link href="/privacy/">Privacy &amp; local storage</Link>
          <a href="https://github.com/JimBLogic/jimblogic.github.io" rel="noreferrer">Repository</a>
        </footer>
      </div>
    </div>
  );
}
