import { chromium } from 'playwright';
import { mkdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const outputPath = path.resolve('assets/pdfs/Jaime Ramsden de Frutos CV.pdf');
const avatarPath = path.resolve('assets/Images/Profilepicandother/my-avatar.png');
const avatar = await readFile(avatarPath);
const avatarData = `data:image/png;base64,${avatar.toString('base64')}`;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Jamie Ramsden de Frutos - Cybersecurity Analyst CV</title>
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; color: #20282b; background: #fff; }
  body { font-size: 9.1pt; line-height: 1.29; }
  .page { width: 210mm; height: 297mm; padding: 9.5mm 11mm 8mm; position: relative; page-break-after: always; overflow: hidden; }
  .page:last-child { page-break-after: auto; }
  .header { min-height: 55mm; background: #123d41; color: #fff; display: grid; grid-template-columns: 1fr 52mm; gap: 8mm; padding: 8mm 8mm 7mm; align-items: center; }
  .header h1 { margin: 0 0 5mm; font-size: 19pt; line-height: 1.08; letter-spacing: .1px; }
  .role { margin: 0 0 3.5mm; font-size: 11.2pt; font-weight: 700; line-height: 1.45; }
  .contact { margin: 0; font-size: 9.3pt; line-height: 1.42; }
  .contact a { color: #fff; text-decoration: underline; text-underline-offset: 1px; }
  .avatar-wrap { display: flex; align-items: center; justify-content: center; }
  .avatar { width: 31mm; height: 31mm; border-radius: 50%; object-fit: cover; object-position: center; }
  .section { margin-top: 7mm; }
  .section.tight { margin-top: 5mm; }
  h2 { margin: 0; font-size: 10.8pt; line-height: 1.15; color: #24383b; text-transform: uppercase; }
  .rule { height: .55mm; background: #44a8ad; margin: 6mm 0 4mm; }
  p { margin: 0; }
  ul { margin: 0; padding-left: 4.2mm; }
  li { margin: 0 0 1.2mm; padding-left: .4mm; }
  .training p { margin: 0 0 .75mm; }
  .training strong { color: #1b2022; }
  .experience { margin: 0 0 4.1mm; }
  .experience h3 { margin: 0 0 1.1mm; font-size: 9.4pt; line-height: 1.25; color: #252b2d; }
  .experience ul { margin-top: 0; }
  .footer { position: absolute; left: 0; right: 0; bottom: 4mm; text-align: center; font-size: 6.7pt; color: #6a7375; }
  .page-two { padding-top: 9mm; }
  .page-two .section:first-child { margin-top: 0; }
  .page-two .rule { margin-top: 4.5mm; margin-bottom: 4mm; }
  .education p { margin: 0 0 1.2mm; }
  .languages li { margin-bottom: 1mm; }
</style>
</head>
<body>
<section class="page">
  <header class="header">
    <div>
      <h1>Jamie Ramsden de Frutos</h1>
      <p class="role">Junior Cybersecurity Analyst | Blue Team |<br>Incident Response</p>
      <p class="contact">Balearic Islands, Spain | +34 659 176 954 |<br>
        <a href="mailto:jrf91@pm.me">jrf91@pm.me</a><br>
        <a href="https://jimblogic.github.io/">https://jimblogic.github.io/</a><br>
        <a href="https://tryhackme.com/p/JimBLogic">https://tryhackme.com/p/JimBLogic</a>
      </p>
    </div>
    <div class="avatar-wrap"><img class="avatar" src="${avatarData}" alt="Jamie Ramsden de Frutos"></div>
  </header>

  <section class="section">
    <h2>Profile</h2><div class="rule"></div>
    <p>Cybersecurity analyst in transition with hands-on Blue Team training in incident response, threat detection, digital forensics, SIEM investigation and cloud security. I combine practical labs in Splunk/SPL, TryHackMe and Security Blue Team with real-world experience in administration, IT support, documentation, triage, escalation and customer-facing problem solving. Native English and Spanish communicator, used to handling sensitive information and working under operational pressure.</p>
  </section>

  <section class="section tight">
    <h2>Relevant Cybersecurity Evidence</h2><div class="rule"></div>
    <ul>
      <li>TryHackMe profile JimBLogic: Top 1% global ranking, Rank 21,897, 237 completed rooms and 35 badges.</li>
      <li>Completed TryHackMe paths/certificates: Love at First Breach, Cyber Security 101, Pre Security and Advent of Cyber 2025.</li>
      <li>Splunk / Hack The Box labs: investigated security incidents using log sources, fields and SPL searches aligned with adversary behavior and abnormal activity patterns.</li>
      <li>Blue Team training coverage: digital forensics, network analysis, OSINT, threat hunting, vulnerability management, chain of custody and evidence handling.</li>
      <li>Cloud security foundations: AWS Cloud Practitioner preparation, AWS fundamentals, IAM concepts and cloud security basics.</li>
    </ul>
  </section>

  <section class="section tight training">
    <h2>Selected Certifications &amp; Training</h2><div class="rule"></div>
    <p><strong>Security Blue Team</strong> - Blue Team Junior Analyst Pathway Bundle; Introduction to Digital Forensics, Threat Hunting, Network Analysis, OSINT and Vulnerability Management, 2024.</p>
    <p><strong>LinkedIn / Hack The Box</strong> - Understanding Log Sources and Investigating with Splunk, 2026.</p>
    <p><strong>TryHackMe</strong> - Cyber Security 101 Certificate; Pre Security Certificate; Love at First Breach; Advent of Cyber 2025, 2025-2026.</p>
    <p><strong>Cisco</strong> - Cyber Threat Management; Introduction to Cybersecurity, 2024.</p>
    <p><strong>arcX</strong> - Foundation Level Threat Intelligence Analyst, 2024.</p>
    <p><strong>UpgradeHub</strong> - Cybersecurity, Ethical Hacking &amp; Cloud Bootcamp, 2024.</p>
    <p><strong>Microsoft / LinkedIn</strong> - Career Essentials in Cybersecurity; Cybersecurity Foundations; GRC and ISO 27001:2022 fundamentals, 2025.</p>
    <p><strong>Cybrary</strong> - Defensive Security Operations; Insider Threat Program; Security+ domain training; AWS CCP Fundamental Cloud Concepts, 2024-2025.</p>
  </section>
  <div class="footer">Jamie Ramsden de Frutos - Cybersecurity Analyst CV</div>
</section>

<section class="page page-two">
  <section class="section">
    <h2>Professional Experience</h2><div class="rule"></div>

    <article class="experience">
      <h3>Administrative Assistant &amp; IT Support Functions | Administración de Fincas Vil-la | 2025 - Present</h3>
      <ul>
        <li>Manage invoicing, customer service and administrative workflows in a property management environment.</li>
        <li>Use internal software and digital tools to process billing, records, documentation and client requests.</li>
        <li>Provide day-to-day IT support and troubleshooting for software, devices and office technical issues.</li>
        <li>Handle sensitive client and financial information with accuracy, confidentiality and follow-up discipline.</li>
      </ul>
    </article>

    <article class="experience">
      <h3>Administrative Assistant &amp; IT Support | Azulona | 2025</h3>
      <ul>
        <li>Managed booking administration, invoicing and customer support using company proprietary software.</li>
        <li>Provided basic IT support and troubleshooting for internal software workflows and day-to-day technical issues.</li>
      </ul>
    </article>

    <article class="experience">
      <h3>Customer Service - Administrative | Jet2.com | 2023 - 2025</h3>
      <ul>
        <li>Supported customers with bookings, flight changes, holiday packages and administrative processing.</li>
        <li>Worked in a high-volume environment requiring clear communication, escalation and issue resolution.</li>
      </ul>
    </article>

    <article class="experience">
      <h3>Auxiliary Services Agent | UTE Masa-Sagital | 2022 - 2023</h3>
      <ul><li>Provided support to passengers with special assistance needs in an operational airport setting.</li></ul>
    </article>

    <article class="experience">
      <h3>Senior Residential Support Worker &amp; Administrative Support | The Community of Saint Antony &amp; Saint Elias | 2016 - 2022</h3>
      <ul><li>Combined people support, documentation, administration and team coordination in a sensitive care environment.</li></ul>
    </article>
  </section>

  <section class="section tight education">
    <h2>Education</h2><div class="rule"></div>
    <p><strong>UpgradeHub</strong> - Cybersecurity, Ethical Hacking &amp; Cloud Bootcamp, 2024.</p>
    <p><strong>Universitat Ramon Llull</strong> - B.Sc. in Health Sciences / Physical Activity and Sports Sciences, 2011 - 2016.</p>
    <p><strong>IES Cap de Llevant</strong> - Advanced Technician in Physical and Sports Activities, 2011.</p>
  </section>

  <section class="section tight languages">
    <h2>Languages</h2><div class="rule"></div>
    <ul>
      <li>English: Native</li>
      <li>Spanish: Native</li>
      <li>Catalan: Level C</li>
    </ul>
  </section>
  <div class="footer">Jamie Ramsden de Frutos - Cybersecurity Analyst CV</div>
</section>
</body>
</html>`;

await mkdir(path.dirname(outputPath), { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 1600 } });
  await page.setContent(html, { waitUntil: 'load' });
  await page.emulateMedia({ media: 'print' });
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });
} finally {
  await browser.close();
}

const generated = await stat(outputPath);
if (generated.size < 20_000) {
  throw new Error(`Generated CV is unexpectedly small: ${generated.size} bytes`);
}
console.log(`Generated ${outputPath} (${generated.size} bytes)`);
