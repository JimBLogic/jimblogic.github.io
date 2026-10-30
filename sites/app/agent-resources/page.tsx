import type { Metadata } from "next";
import catalog from "@/public/agent-resources/catalog.json";
import styles from "./page.module.css";

const canonical = "https://jimblogic.github.io/agent-resources/";
const categories = [
  { id: "security", heading: "Defensive security", note: "Distinguish confirmed exploitation, prediction, CVE enrichment and guidance." },
  { id: "identity", heading: "Identity and cloud permissions", note: "Prefer the responsible vendor's guidance before changing access controls." },
  { id: "web", heading: "Web protocols and performance", note: "Use specifications for semantics and technical guides for implementations." },
  { id: "data", heading: "Official public data", note: "Inspect each publisher's release dates, units, revisions and reuse terms." },
] as const;

export const metadata: Metadata = {
  title: "Agent Resources | Source discovery",
  description: "Find an authoritative starting point for technical questions, with original links, provenance and known limits. Free static JSON catalogue for people and AI agents.",
  alternates: { canonical },
  robots: { index: true, follow: true },
  openGraph: { title: "Agent Resources | JimBLogic", description: "Curated technical source routes and a transparent JSON catalogue.", url: canonical, type: "website" },
};

export default function AgentResourcesPage() {
  return <main className={styles.root}>
    <div className={styles.frame}>
      <header className={styles.top}>
        <a className={styles.brand} href="/" aria-label="JimBLogic portfolio home">JimBLogic<span>.</span></a>
        <nav aria-label="Resource navigation">
          <a href="/agent-resources/catalog.json">Catalogue JSON</a>
          <a href="/llms.txt">llms.txt</a>
          <a href="/">Portfolio</a>
        </nav>
      </header>
      <section className={styles.hero} aria-labelledby="agent-title">
        <p className={styles.eyebrow}>OPEN RESOURCE · STATIC · V0.1</p>
        <h1 id="agent-title">Find the right source, faster.</h1>
        <p>One compact index for humans, developers and AI agents. Choose by <strong>the question a source answers</strong>, not keyword popularity. Each entry names the original publisher and states an important limitation.</p>
        <p className={styles.lang}>ES: Directorio de fuentes verificables. · CA: Directori de fonts verificables. Pilot descriptions are in English.</p>
        <a className={styles.cta} href="/agent-resources/catalog.json">Open machine-readable JSON ↗</a>
      </section>
      <aside className={styles.help} aria-label="How to interpret the sources">
        <h2>Good evidence starts with the right question.</h2>
        <p><strong>Known exploitation:</strong> CISA KEV. <strong>Prediction:</strong> FIRST EPSS. <strong>CVE details:</strong> NVD. These cannot be substituted for each other. Prefer an original security advisory or vendor documentation when an implementation decision depends on a particular version.</p>
      </aside>
      <section className={styles.catalogue} aria-labelledby="catalogue-title">
        <h2 id="catalogue-title">Source routes</h2>
        <p>12 editorially selected starting points. No scraping, ranking claims or generated answers.</p>
        {categories.map(category=><section className={styles.group} key={category.id} aria-labelledby={`heading-${category.id}`}>
          <h3 id={`heading-${category.id}`}>{category.heading}</h3>
          <p>{category.note}</p>
          <div className={styles.grid}>{catalog.sources.filter(source=>source.topic===category.id).map(source=><article className={styles.card} key={source.id} id={source.id}>
            <div className={styles.micro}><span>{source.format}</span><span>{source.publisher}</span></div>
            <h4>{source.name}</h4>
            <p><strong>Question:</strong> {source.question}</p>
            <p><strong>Limit:</strong> {source.limitation}</p>
            <a href={source.url} target="_blank" rel="noopener noreferrer">Visit original source ↗</a>
          </article>)}</div>
        </section>)}
      </section>
      <aside className={styles.footnote} aria-label="Source methodology and privacy">
        <h2>Method and limitations</h2>
        <p>Editorially curated on <time dateTime={catalog.reviewed_on}>{catalog.reviewed_on}</time>. This does not certify uptime, reliability, current content or licensing. Follow each publisher's usage conditions and verify the current source before using its information.</p>
        <p>All links are direct. This resource does not proxy external data, fingerprint visitors, store requests or require login. No guarantee of indexing, citations or search ranking.</p>
      </aside>
      <footer className={styles.footer}><a href="/">← Professional portfolio</a><a href="/privacy/">Privacy</a><a href="https://github.com/JimBLogic/jimblogic.github.io" target="_blank" rel="noopener noreferrer">Repository ↗</a></footer>
    </div>
  </main>;
}
