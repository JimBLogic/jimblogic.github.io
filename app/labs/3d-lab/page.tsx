import type { Metadata } from "next";
import Link from "next/link";
import styles from "../../resources.module.css";

const canonical = "https://jimblogic.github.io/labs/3d-lab/";
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${canonical}#page`,
  url: canonical,
  name: "CyberSecurity 3D Lab: non-3D project brief",
  description: "A practical text guide to an optional interface experiment, its review questions and evidence boundaries.",
  inLanguage: "en",
  dateModified: "2026-11-10",
  isPartOf: { "@id": "https://jimblogic.github.io/#website" },
  author: { "@id": "https://jimblogic.github.io/#person" },
};

export const metadata: Metadata = {
  title: "CyberSecurity 3D Lab | Non-3D project brief",
  description: "A text-first guide to the optional CyberSecurity 3D Lab experiment, with practical project links, review questions and explicit evidence boundaries.",
  alternates: { canonical },
  openGraph: {
    title: "CyberSecurity 3D Lab | Project brief",
    description: "Understand the interactive experiment and inspect the projects without loading a 3D runtime.",
    url: canonical,
    type: "website",
  },
};

export default function ThreeDLabBrief() {
  return (
    <div className={styles.root}>
      <a className="skip-link" href="#lab-main">Skip to project brief</a>
      <div className={styles.frame}>
        <header className={styles.header}>
          <Link className={styles.brand} href="/" aria-label="JimBLogic portfolio home">JimBLogic<span>.</span></Link>
          <nav className={styles.navigation} aria-label="Project navigation">
            <Link href="/#work">All projects</Link>
            <Link href="/agent-resources/">Source-selection guide</Link>
          </nav>
        </header>
        <main id="lab-main" tabIndex={-1}>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
          <section className={styles.hero} aria-labelledby="lab-title">
            <p className={styles.eyebrow}>INTERFACE EXPERIMENT · OPTIONAL 3D</p>
            <h1 id="lab-title">CyberSecurity 3D Lab</h1>
            <p>A spatial presentation experiment around cybersecurity projects. Start here to understand its purpose, inspect the project evidence and choose whether to open the separate interactive experience.</p>
            <p>This text brief works without WebGL, scene navigation or animation. It provides a practical route to portfolio project information without requiring the 3D experience.</p>
            <p className={styles.languageNote}><span lang="es">Resumen del laboratorio sin cargar 3D; la experiencia interactiva es opcional.</span> <span lang="ca">Resum del laboratori sense carregar 3D; l&apos;experiència interactiva és opcional.</span></p>
            <a className={styles.primaryLink} href="#project-evidence">Read the project evidence <span aria-hidden="true">↓</span></a>
            <div className={styles.links}><a href="https://lab.jimblogic.chatgpt.site/" rel="noreferrer">Open the separate 3D experiment (external, optional) ↗</a></div>
          </section>

          <section className={styles.section} id="project-evidence" aria-labelledby="evidence-title">
            <h2 id="evidence-title">The useful information, without the 3D room.</h2>
            <p>Choose a project by its purpose. Each brief explains what to inspect, what the project demonstrates and where its evidence stops.</p>
            <div className={styles.grid}>
              <article className={styles.card}>
                <p className={styles.eyebrow}>DEFENSIVE INTELLIGENCE</p>
                <h3>CyberDailyLog</h3>
                <p>A personal CTI automation project connecting CISA KEV, NVD and FIRST EPSS with stateful CVE tracking, explicit source-health states and publication evidence. Review source freshness and the reason for prioritisation before using a brief.</p>
                <Link href="/labs/cyberdailylog/">Read the CyberDailyLog evidence path →</Link>
              </article>
              <article className={styles.card}>
                <p className={styles.eyebrow}>MACRO DATA AND INTERPRETATION</p>
                <h3>Austrian Business Cycle Monitor</h3>
                <p>An educational macro-data project that separates observed indicators, source states and an Austrian-economics interpretation. Review definitions, update dates and methodology; its signals are not investment advice.</p>
                <Link href="/labs/austrian-monitor/">Read the monitor&apos;s methodology path →</Link>
              </article>
            </div>
            <div className={styles.links}><Link href="/agent-resources/">Compare primary sources and their limitations →</Link><Link href="/#work">Inspect the homelab and other portfolio work →</Link></div>
          </section>

          <section className={styles.section} aria-labelledby="review-title">
            <h2 id="review-title">How to review an interactive security interface.</h2>
            <p>The experiment raises interface questions that can be tested separately from the technical claims of the projects it presents. This is a review checklist, not a claim that those checks have passed.</p>
            <ol className={styles.reviewList}>
              <li><strong>Find the evidence.</strong> Can you identify a project&apos;s purpose and reach its ordinary text brief or source repository without interpreting a scene?</li>
              <li><strong>Inspect the controls.</strong> Check that the published interface explains its actual input methods. Verify keyboard focus, touch targets and an understandable exit before relying on a particular navigation mode.</li>
              <li><strong>Respect motion and device limits.</strong> Evaluate reduced-motion behaviour and small-screen readability on the device you use. Continue with the text briefs if rendering or movement makes the scene difficult.</li>
              <li><strong>Keep presentation separate from proof.</strong> A simulated room, screen or security label does not demonstrate detection coverage, incident response performance or an operational SOC.</li>
            </ol>
          </section>

          <aside className={styles.notice} aria-labelledby="boundary-title">
            <h2 id="boundary-title">Evidence and availability boundaries.</h2>
            <p>The 3D Lab is an interface experiment. This brief does not claim professional SOC experience, completed security exercises, measured performance or verified compatibility of the external deployment.</p>
            <p>The external lab is maintained separately. Its availability and interface may change; the local project briefs remain the non-3D review path. No external scene, video or 3D runtime is embedded in this page or the portfolio homepage.</p>
            <p>Brief written on <time dateTime="2026-11-10">10 November 2026</time>. This date records the text review, not a test of the external application.</p>
          </aside>
        </main>
        <footer className={styles.footer}>
          <Link href="/">← Professional portfolio</Link>
          <Link href="/privacy/">Privacy &amp; local storage</Link>
          <Link href="/agent-resources/">Source-selection guide</Link>
        </footer>
      </div>
    </div>
  );
}
