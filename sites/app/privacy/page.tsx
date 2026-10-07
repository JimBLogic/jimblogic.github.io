"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/lib/use-language";
import { clearLocalPreferences } from "@/lib/local-preferences";

const copy = {
  en: {
    processing: "Purpose, legal basis and recipients",
    processingText: "Jaime Ramsden de Frutos (JimBLogic), based in Spain, is responsible for the personal data he processes through this portfolio and its contact address. General enquiries are handled on the basis of the legitimate interest in responding to professional correspondence (GDPR Article 6(1)(f)); steps you request before entering into a contract rely on Article 6(1)(b). Hosting and security support the legitimate interest in providing a safe, functioning portfolio. Email is handled by the email provider; Sites data is processed by OpenAI under the applicable service agreement and, where applicable, its Data Processing Addendum. Data is not used for advertising or sold by the publisher.",
    retention: "Retention and international processing",
    retentionText: "Contact correspondence is kept only while the enquiry or professional relationship requires it; any further retention is limited to applicable legal obligations or the handling of legal claims. Hosting retention and transfer safeguards depend on the agreement applicable to this account. No particular hosting country, EU-only storage or fixed platform deletion period is promised. Consult the provider information below or contact the publisher for questions about your data.",
    requests: "You may also request portability where applicable. To exercise a right, write to the contact address below; only information necessary to verify your request will be sought. The normal response period is one month, with any legally permitted extension explained to you. Do not send passwords, payment-card details, health records or confidential third-party information.",
    terms: "About this portfolio and its content",
    termsText: "This is a personal professional portfolio for recruiters and adults interested in technical projects. It has no visitor accounts, public posts, uploads, purchases or financial transactions, and is not directed at children. Cybersecurity projects are for defensive learning and testing with the system owner’s authorisation. Economic projects are educational and do not provide personalised investment advice.",
    ownership: "Third-party names, trademarks and credentials identify their respective organisations; they do not imply sponsorship, affiliation or endorsement. Course completion is distinct from passing a professional certification exam. External projects have their own terms and privacy practices. If you identify content that may infringe your rights or disclose confidential information, email its URL and the reason so it can be reviewed and, where appropriate, corrected or removed.",
    title: "Privacy & local storage", back: "Back to portfolio", language: "Language",
    updated: "Reviewed: 28 September 2026", local: "What stays on your device",
    lead: "This portfolio adds no advertising trackers, analytics SDKs or visitor database. Its application code does not set cookies.",
    preference: "Only the language you explicitly select is remembered. It is used solely for that purpose and is never sent to our server. Browsing without selecting a language writes no application preference.",
    columns: ["Name", "Purpose", "Duration"], purpose: "Your selected language: en, es or ca", duration: "Until you delete it or clear browser data",
    hosting: "Hosting and external services",
    providers: "GitHub Pages hosts the primary site; GitHub may process technical and usage data under its privacy policy. On this OpenAI Sites version, the hosting platform may process IP addresses, request and device information, security logs and usage measurements to deliver and protect the service. Application-level checks cannot establish the platform’s complete processing or retention.",
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
    processing: "Finalidad, base jurídica y destinatarios",
    processingText: "Jaime Ramsden de Frutos (JimBLogic), establecido en España, es responsable de los datos personales que trata mediante este portfolio y su dirección de contacto. Las consultas generales se atienden por interés legítimo en responder a comunicaciones profesionales (artículo 6.1.f del RGPD); las medidas precontractuales que solicites se basan en el artículo 6.1.b. El alojamiento y la seguridad responden al interés legítimo en ofrecer un portfolio seguro y operativo. El correo se gestiona mediante el proveedor de correo; OpenAI trata los datos de Sites conforme al contrato aplicable y, cuando corresponda, su acuerdo de tratamiento de datos. El titular no vende los datos ni los utiliza para publicidad.",
    retention: "Conservación y tratamiento internacional",
    retentionText: "Las comunicaciones se conservan solo mientras sean necesarias para la consulta o relación profesional; cualquier conservación posterior se limita a obligaciones legales aplicables o a la atención de reclamaciones. La conservación del alojamiento y las garantías de transferencia dependen del contrato aplicable a esta cuenta. No se promete un país concreto de alojamiento, almacenamiento exclusivo en la UE ni un plazo fijo de borrado de la plataforma. Consulta la información de proveedores o escribe al titular si tienes dudas sobre tus datos.",
    requests: "También puedes solicitar la portabilidad cuando proceda. Para ejercer tus derechos, escribe al contacto indicado; solo se solicitará la información necesaria para verificar tu petición. El plazo ordinario de respuesta es de un mes, informándote de cualquier ampliación legalmente permitida. No envíes contraseñas, datos de tarjetas, información sanitaria ni información confidencial de terceros.",
    terms: "Sobre el portfolio y sus contenidos",
    termsText: "Es un portfolio profesional personal dirigido a reclutadores y adultos interesados en proyectos técnicos. No ofrece cuentas de visitantes, publicaciones públicas, subidas de archivos, compras ni transacciones financieras, y no se dirige a menores. Los proyectos de ciberseguridad tienen fines de aprendizaje defensivo y pruebas con autorización del titular del sistema. Los proyectos económicos son educativos y no ofrecen asesoramiento personalizado de inversión.",
    ownership: "Los nombres, marcas y credenciales de terceros identifican a sus respectivas organizaciones; no implican patrocinio, afiliación ni respaldo. Completar un curso no equivale a superar un examen de certificación profesional. Los proyectos externos tienen sus propias condiciones y prácticas de privacidad. Si detectas contenido que pueda vulnerar tus derechos o divulgar información confidencial, comunica por correo su URL y el motivo para revisarlo y, cuando proceda, corregirlo o retirarlo.",
    title: "Privacidad y almacenamiento local", back: "Volver al portfolio", language: "Idioma",
    updated: "Revisado: 28 de septiembre de 2026", local: "Qué queda en tu dispositivo",
    lead: "Este portfolio no añade rastreadores publicitarios, SDK de analítica ni una base de visitantes. El código de la aplicación no instala cookies.",
    preference: "Solo se recuerda el idioma que eliges expresamente. Se utiliza exclusivamente para ese fin y no se envía a nuestro servidor. Navegar sin elegir idioma no guarda ninguna preferencia de la aplicación.",
    columns: ["Nombre", "Finalidad", "Duración"], purpose: "El idioma que eliges: en, es o ca", duration: "Hasta borrarlo o eliminar los datos del navegador",
    hosting: "Alojamiento y servicios externos",
    providers: "GitHub Pages aloja el sitio principal; GitHub puede tratar datos técnicos y de uso según su política. En esta versión de OpenAI Sites, la plataforma de alojamiento puede tratar direcciones IP, información de solicitudes y dispositivos, registros de seguridad y mediciones de uso para prestar y proteger el servicio. La revisión del código no permite determinar todo el tratamiento ni la conservación de la plataforma.",
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
    processing: "Finalitat, base jurídica i destinataris",
    processingText: "Jaime Ramsden de Frutos (JimBLogic), establert a Espanya, és responsable de les dades personals que tracta mitjançant aquest portfolio i l’adreça de contacte. Les consultes generals s’atenen per interès legítim a respondre comunicacions professionals (article 6.1.f del RGPD); les mesures precontractuals que demanis es basen en l’article 6.1.b. L’allotjament i la seguretat responen a l’interès legítim d’oferir un portfolio segur i operatiu. El correu es gestiona amb el proveïdor de correu; OpenAI tracta les dades de Sites segons el contracte aplicable i, quan correspongui, l’acord de tractament de dades. El titular no ven les dades ni les utilitza per a publicitat.",
    retention: "Conservació i tractament internacional",
    retentionText: "Les comunicacions es conserven només mentre siguin necessàries per a la consulta o relació professional; qualsevol conservació posterior es limita a obligacions legals aplicables o reclamacions. La conservació de l’allotjament i les garanties de transferència depenen del contracte aplicable a aquest compte. No es promet un país concret d’allotjament, emmagatzematge exclusiu a la UE ni un termini fix d’esborrat de la plataforma. Consulta la informació dels proveïdors o escriu al titular si tens dubtes sobre les dades.",
    requests: "També pots demanar la portabilitat quan correspongui. Per exercir els drets, escriu al contacte indicat; només es demanarà la informació necessària per verificar la petició. El termini ordinari de resposta és d’un mes, informant-te de qualsevol ampliació legalment permesa. No enviïs contrasenyes, dades de targetes, informació sanitària ni informació confidencial de tercers.",
    terms: "Sobre el portfolio i els continguts",
    termsText: "És un portfolio professional personal adreçat a reclutadors i adults interessats en projectes tècnics. No ofereix comptes de visitants, publicacions públiques, càrregues de fitxers, compres ni transaccions financeres, i no s’adreça a menors. Els projectes de ciberseguretat són d’aprenentatge defensiu i proves amb autorització del titular del sistema. Els projectes econòmics són educatius i no ofereixen assessorament personalitzat d’inversió.",
    ownership: "Els noms, marques i credencials de tercers identifiquen les seves organitzacions; no impliquen patrocini, afiliació ni suport. Completar un curs no equival a superar un examen de certificació professional. Els projectes externs tenen condicions i pràctiques de privacitat pròpies. Si detectes contingut que pugui vulnerar els teus drets o divulgar informació confidencial, comunica per correu la URL i el motiu per revisar-lo i, quan correspongui, corregir-lo o retirar-lo.",
    title: "Privacitat i emmagatzematge local", back: "Tornar al portfolio", language: "Idioma",
    updated: "Revisat: 28 de setembre de 2026", local: "Què queda al teu dispositiu",
    lead: "Aquest portfolio no afegeix rastrejadors publicitaris, SDK d’analítica ni una base de visitants. El codi de l’aplicació no instal·la galetes.",
    preference: "Només es recorda l’idioma que tries expressament. S’utilitza exclusivament per a aquesta finalitat i no s’envia al nostre servidor. Navegar sense triar idioma no desa cap preferència de l’aplicació.",
    columns: ["Nom", "Finalitat", "Durada"], purpose: "L’idioma que tries: en, es o ca", duration: "Fins que l’esborris o eliminis les dades del navegador",
    hosting: "Allotjament i serveis externs",
    providers: "GitHub Pages allotja el lloc principal; GitHub pot tractar dades tècniques i d’ús segons la seva política. En aquesta versió d’OpenAI Sites, la plataforma d’allotjament pot tractar adreces IP, informació de peticions i dispositius, registres de seguretat i mesures d’ús per prestar i protegir el servei. La revisió del codi no permet determinar tot el tractament ni la conservació de la plataforma.",
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
    <section><h2>{t.processing}</h2><p>{t.processingText}</p></section>
    <section><h2>{t.retention}</h2><p>{t.retentionText}</p></section>
    <section><h2>{t.terms}</h2><p>{t.termsText}</p><p>{t.ownership}</p></section>
    <section><h2>{t.contact}</h2><p>{t.rights}</p><p>{t.requests}</p><a href="mailto:jrf91@pm.me">jrf91@pm.me</a>
      <h3>{t.sources}</h3><ul>
        <li><a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" rel="noreferrer">GitHub · Privacy</a></li>
        <li><a href="https://openai.com/policies/privacy-policy/" rel="noreferrer">OpenAI · Privacy</a></li>
        <li><a href="https://help.openai.com/articles/20001340" rel="noreferrer">ChatGPT Sites · Data protection</a></li>
        <li><a href="https://openai.com/policies/chatgpt-sites-data-processing-addendum/" rel="noreferrer">ChatGPT Sites · Data Processing Addendum</a></li>
        <li><a href="https://proton.me/legal/privacy" rel="noreferrer">Proton · Privacy</a></li>
        <li><a href="https://www.aepd.es/guias/guia-cookies.pdf" rel="noreferrer">AEPD · Cookies</a></li>
        <li><a href="https://www.aepd.es/" rel="noreferrer">Agencia Española de Protección de Datos</a></li>
      </ul>
    </section>
    <footer><Link href="/">JimBLogic</Link><p>© 2026 Jaime Ramsden de Frutos</p></footer>
  </main>;
}
