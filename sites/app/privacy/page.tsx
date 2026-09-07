"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/lib/use-language";
import { clearLocalPreferences } from "@/lib/local-preferences";

const copy = {
  en: {
    title: "Privacy & local storage", back: "Back to portfolio", language: "Language",
    updated: "Reviewed: 7 September 2026", local: "What stays on your device",
    lead: "This portfolio adds no advertising trackers, analytics SDKs or visitor database. Its application code does not set cookies.",
    preference: "Only the language you explicitly select is remembered. It is used solely for that purpose and is never sent to our server. Browsing without selecting a language writes no application preference.",
    columns: ["Name", "Purpose", "Duration"], purpose: "Your selected language: en, es or ca", duration: "Until you delete it or clear browser data",
    hosting: "Hosting and external services",
    providers: "GitHub Pages hosts the primary site; GitHub may process technical and usage data under its privacy policy. The OpenAI Sites mirror automatically records unique visitors and page views. The portfolio has no verified control that disables that platform measurement.",
    feed: "Images, fonts and the CyberDailyLog snapshot are served from this domain. The Sites server retrieves the public GitHub Pages snapshot without forwarding visitor headers; a bundled copy is the fallback. External links contact their destination when you open them.",
    consent: "Why there is no consent banner",
    consentText: "The only application preference is a language you request, used exclusively for that purpose. The AEPD cookie guide describes this exception. There is no optional application tracker to accept or reject. This notice does not switch off hosting analytics.",
    choices: "Your controls", clear: "Delete local preferences",
    scope: "Deletion applies to this domain only, including the old session feed cache if present. Repeat it on the other mirror if you used both. It does not delete provider logs. The current page keeps its displayed language without saving it again.",
    done: "Local portfolio preferences deleted.", failed: "The browser blocked deletion. Use its site-data settings to remove the preferences.",
    contact: "Contact and rights",
    rights: "Publisher: Jaime Ramsden de Frutos. If you email me, your address and message are used to handle your enquiry, for as long as needed to resolve it and meet applicable obligations. You can request access, correction, deletion, restriction or objection, as applicable. You may lodge a complaint with the AEPD. Provider retention and international transfers are described in their policies.",
    sources: "Provider information and guidance",
  },
  es: {
    title: "Privacidad y almacenamiento local", back: "Volver al portfolio", language: "Idioma",
    updated: "Revisado: 7 de septiembre de 2026", local: "Qué queda en tu dispositivo",
    lead: "Este portfolio no añade rastreadores publicitarios, SDK de analítica ni una base de visitantes. El código de la aplicación no instala cookies.",
    preference: "Solo se recuerda el idioma que eliges expresamente. Se utiliza exclusivamente para ese fin y no se envía a nuestro servidor. Navegar sin elegir idioma no guarda ninguna preferencia de la aplicación.",
    columns: ["Nombre", "Finalidad", "Duración"], purpose: "El idioma que eliges: en, es o ca", duration: "Hasta borrarlo o eliminar los datos del navegador",
    hosting: "Alojamiento y servicios externos",
    providers: "GitHub Pages aloja el sitio principal; GitHub puede tratar datos técnicos y de uso según su política. El espejo de OpenAI Sites registra automáticamente visitantes únicos y páginas vistas. El portfolio no dispone de un control verificado para desactivar esa medición de la plataforma.",
    feed: "Las imágenes, las fuentes y la instantánea de CyberDailyLog se sirven desde este dominio. El servidor de Sites consulta la copia pública de GitHub Pages sin reenviar cabeceras del visitante; una copia incluida sirve de respaldo. Los enlaces externos contactan con su destino cuando los abres.",
    consent: "Por qué no hay banner de consentimiento",
    consentText: "La única preferencia propia es el idioma que solicitas, utilizado solo para ese fin. La guía de cookies de la AEPD contempla esta excepción. No hay seguimiento opcional propio que aceptar o rechazar. Este aviso no desactiva la analítica del alojamiento.",
    choices: "Tus controles", clear: "Borrar preferencias locales",
    scope: "El borrado afecta solo a este dominio, incluida la antigua caché de sesión del feed si existe. Repítelo en el otro espejo si has usado ambos. No borra registros del proveedor. Esta página conserva el idioma visible sin volver a guardarlo.",
    done: "Preferencias locales del portfolio borradas.", failed: "El navegador ha bloqueado el borrado. Usa sus ajustes de datos del sitio para eliminar las preferencias.",
    contact: "Contacto y derechos",
    rights: "Titular: Jaime Ramsden de Frutos. Si me escribes, usaré tu dirección y mensaje para atender la consulta, durante el tiempo necesario para resolverla y cumplir las obligaciones aplicables. Puedes solicitar acceso, rectificación, supresión, limitación u oposición, según corresponda, y reclamar ante la AEPD. Los proveedores detallan la conservación y las transferencias internacionales en sus políticas.",
    sources: "Información de proveedores y guía",
  },
  ca: {
    title: "Privacitat i emmagatzematge local", back: "Tornar al portfolio", language: "Idioma",
    updated: "Revisat: 7 de setembre de 2026", local: "Què queda al teu dispositiu",
    lead: "Aquest portfolio no afegeix rastrejadors publicitaris, SDK d’analítica ni una base de visitants. El codi de l’aplicació no instal·la galetes.",
    preference: "Només es recorda l’idioma que tries expressament. S’utilitza exclusivament per a aquesta finalitat i no s’envia al nostre servidor. Navegar sense triar idioma no desa cap preferència de l’aplicació.",
    columns: ["Nom", "Finalitat", "Durada"], purpose: "L’idioma que tries: en, es o ca", duration: "Fins que l’esborris o eliminis les dades del navegador",
    hosting: "Allotjament i serveis externs",
    providers: "GitHub Pages allotja el lloc principal; GitHub pot tractar dades tècniques i d’ús segons la seva política. El mirall d’OpenAI Sites registra automàticament visitants únics i pàgines vistes. El portfolio no disposa d’un control verificat per desactivar aquesta mesura de la plataforma.",
    feed: "Les imatges, les fonts i la instantània de CyberDailyLog se serveixen des d’aquest domini. El servidor de Sites consulta la còpia pública de GitHub Pages sense reenviar capçaleres del visitant; una còpia inclosa serveix de suport. Els enllaços externs contacten amb la destinació quan els obres.",
    consent: "Per què no hi ha bàner de consentiment",
    consentText: "L’única preferència pròpia és l’idioma que demanes, utilitzat només per a aquesta finalitat. La guia de galetes de l’AEPD preveu aquesta excepció. No hi ha seguiment opcional propi per acceptar o rebutjar. Aquest avís no desactiva l’analítica de l’allotjament.",
    choices: "Els teus controls", clear: "Esborrar preferències locals",
    scope: "L’esborrat afecta només aquest domini, inclosa l’antiga memòria cau de sessió del feed si existeix. Repeteix-lo a l’altre mirall si has utilitzat tots dos. No esborra registres del proveïdor. Aquesta pàgina conserva l’idioma visible sense tornar-lo a desar.",
    done: "Preferències locals del portfolio esborrades.", failed: "El navegador ha bloquejat l’esborrat. Utilitza els ajustos de dades del lloc per eliminar les preferències.",
    contact: "Contacte i drets",
    rights: "Titular: Jaime Ramsden de Frutos. Si m’escrius, utilitzaré l’adreça i el missatge per respondre la consulta, durant el temps necessari per resoldre-la i complir les obligacions aplicables. Pots sol·licitar accés, rectificació, supressió, limitació o oposició, segons correspongui, i reclamar davant l’AEPD. Els proveïdors detallen la conservació i les transferències internacionals a les seves polítiques.",
    sources: "Informació de proveïdors i guia",
  },
} as const;

export default function PrivacyPage() {
  const [language, chooseLanguage] = useLanguage();
  const [result, setResult] = useState<"idle" | "done" | "failed">("idle");
  const t = copy[language];
  return <main className="privacy-page">
    <nav className="privacy-nav" aria-label={t.title}>
      <Link href="/">← {t.back}</Link>
      <div className="languages" aria-label={t.language}>{(["en", "es", "ca"] as const).map(lang =>
        <button key={lang} type="button" aria-pressed={language === lang} className={language === lang ? "is-active" : ""}
          onClick={() => { chooseLanguage(lang); setResult("idle"); }}>{lang.toUpperCase()}</button>)}</div>
    </nav>
    <header><p>{t.updated}</p><h1>{t.title}</h1><p>{t.lead}</p></header>
    <section><h2>{t.local}</h2><p>{t.preference}</p>
      <div className="privacy-table-wrap"><table><thead><tr>{t.columns.map(c => <th key={c} scope="col">{c}</th>)}</tr></thead>
        <tbody><tr><td><code>jimblogic-language</code><br />localStorage</td><td>{t.purpose}</td><td>{t.duration}</td></tr></tbody></table></div>
    </section>
    <section><h2>{t.hosting}</h2><p>{t.providers}</p><p>{t.feed}</p></section>
    <section><h2>{t.consent}</h2><p>{t.consentText}</p></section>
    <section><h2>{t.choices}</h2><p>{t.scope}</p>
      <button type="button" className="privacy-clear" onClick={() => setResult(clearLocalPreferences(window) ? "done" : "failed")}>{t.clear}</button>
      <p className="privacy-result" role="status">{result === "idle" ? "" : t[result]}</p>
    </section>
    <section><h2>{t.contact}</h2><p>{t.rights}</p><a href="mailto:jrf91@pm.me">jrf91@pm.me</a>
      <h3>{t.sources}</h3><ul>
        <li><a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" rel="noreferrer">GitHub · Privacy</a></li>
        <li><a href="https://openai.com/policies/privacy-policy/" rel="noreferrer">OpenAI · Privacy</a></li>
        <li><a href="https://learn.chatgpt.com/docs/sites" rel="noreferrer">ChatGPT Sites · Analytics</a></li>
        <li><a href="https://www.aepd.es/guias/guia-cookies.pdf" rel="noreferrer">AEPD · Cookies</a></li>
        <li><a href="https://www.aepd.es/" rel="noreferrer">Agencia Española de Protección de Datos</a></li>
      </ul>
    </section>
    <footer><Link href="/">JimBLogic</Link><p>© 2026 Jaime Ramsden de Frutos</p></footer>
  </main>;
}
