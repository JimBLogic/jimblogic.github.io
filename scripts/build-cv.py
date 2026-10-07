"""Generate the portfolio CV from reviewed professional claims; requires reportlab."""
from pathlib import Path
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
pdfmetrics.registerFont(TTFont("CVSans", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("CVSans-Bold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
pdfmetrics.registerFontFamily("CVSans",normal="CVSans",bold="CVSans-Bold",italic="CVSans",boldItalic="CVSans-Bold")
ROOT=Path(__file__).resolve().parents[1]
styles=getSampleStyleSheet()
styles.add(ParagraphStyle(name='NameCV',fontName='CVSans-Bold',fontSize=22,leading=26,textColor=HexColor('#193a47'),spaceAfter=8))
styles.add(ParagraphStyle(name='SectionCV',fontName='CVSans-Bold',fontSize=11,leading=14,textColor=HexColor('#193a47'),spaceBefore=13,spaceAfter=6))
styles.add(ParagraphStyle(name='BodyCV',fontName='CVSans',fontSize=10,leading=14,spaceAfter=6))
story=[]
def p(text,style='BodyCV'):story.append(Paragraph(text,styles[style]))
def h(text):p(text,'SectionCV')
def bullet(text):p('• '+text)
p('Jaime Ramsden de Frutos','NameCV')
p('Junior SOC / Blue Team candidate | CTI and automation | Cloud foundations')
p('Menorca, Spain | English / Spanish / Catalan | Remote / hybrid Spain and EU; UK eligible')
p('<link href="mailto:jrf91@pm.me">jrf91@pm.me</link> | <link href="https://jimblogic.github.io/">jimblogic.github.io</link> | <link href="https://github.com/JimBLogic">github.com/JimBLogic</link>')
h('PROFILE')
p('Seeking my first professional SOC / Blue Team role. I combine administration, customer operations and practical IT support with public defensive projects and guided cybersecurity training. My focus is source-backed vulnerability intelligence, Linux and containers, reproducibility, troubleshooting, trust boundaries and clear technical documentation. Project and lab experience is not presented as paid SOC employment.')
h('ORIGINAL PROJECTS / PROOF OF WORK')
bullet('<b>CyberDailyLog - flagship defensive project.</b> Python automation using CISA KEV, NVD and FIRST EPSS; stateful CVE tracking, state transitions, correlation and prioritisation. Public reports, source-health checks, explicit degradation and publication SLO records. A CTI learning project, not a SIEM or enterprise SOC service. <link href="https://github.com/JimBLogic/CyberDailyLog">Repository and evidence</link>.')
bullet('<b>Defensive Homelab.</b> Reproducible Raspberry Pi 4 baseline with LITE / FULL Docker configurations, service-health tooling and documented trust boundaries. Deployment-ready baseline; operational validation in progress. Next evidence: service health, authentication triage, Windows/Sysmon or equivalent telemetry, a SIEM query, sanitised incident note and detection tuning. These exercises are pending. <link href="https://github.com/JimBLogic/defensive-homelab-blue-team">Repository</link>.')
bullet('<b>Austrian Business Cycle Monitor.</b> Educational macro-data project with source provenance, freshness and failure states; not investment advice. <link href="https://github.com/JimBLogic/AustrianBusinessCycleMonitor">Repository</link>.')
bullet('<b>Portfolio.</b> EN/ES/CA content, privacy controls, security headers, route validation and GitHub Pages / Sites delivery. <link href="https://github.com/JimBLogic/jimblogic.github.io">Source and CI</link>.')
h('AWS LEARNING STATUS')
p('AWS AI Practitioner (AIF-C01): preparation and first exam attempt completed on 29 September 2026; continuing targeted study before a future retake. AWS Cloud Practitioner (CLF-C02): preparing. Neither certification has been earned. AWS SimuLearn / Skill Builder badges are training evidence, not professional AWS certification.')
story.append(PageBreak())
p('Experience and supporting learning','NameCV')
h('PROFESSIONAL BACKGROUND - OUTSIDE SOC')
bullet('<b>Administration and practical IT support - property operations, Menorca (2026).</b> Administrative workflows, supplier coordination, sensitive records, everyday systems troubleshooting, written follow-up and escalation.')
bullet('<b>Administrative / IT support - Azulona (2025).</b> Booking administration, invoicing, customer support and everyday software troubleshooting.')
bullet('<b>Customer operations - Jet2.com (2023-2025).</b> Time-sensitive passenger support, accurate information, multilingual communication and escalation.')
bullet('<b>Auxiliary services - UTE Masa-Sagital (2022-2023).</b> Support for passengers needing assistance in an airport environment.')
bullet('<b>Previous senior residential support - United Kingdom.</b> People support, confidential records, shift handovers and coordination. This was a care-services role, not cybersecurity incident response.')
h('LEARNING / GUIDED LABS')
p('TryHackMe, Security Blue Team and Splunk / Hack The Box learning exercises support junior foundations in log analysis, network analysis, OSINT, forensics and incident-handling discipline. Public profile: <link href="https://tryhackme.com/p/JimBLogic">tryhackme.com/p/JimBLogic</link>. Rankings and room counts are not treated as permanent credentials.')
h('SELECTED TRAINING & CREDENTIALS')
bullet('UpgradeHub: Cybersecurity, Ethical Hacking & Cloud bootcamp, 350 hours (2024).')
bullet('Security Blue Team: Blue Team Junior Analyst Pathway and introductory defensive courses.')
bullet('Cisco: Cyber Threat Management and Introduction to Cybersecurity; arcX: Threat Intelligence Foundation.')
bullet('Cybrary, IBM and AWS Skill Builder: supporting cybersecurity, Python and cloud learning records. Verify individual records at <link href="https://jimblogic.github.io/certifications/">jimblogic.github.io/certifications</link>.')
h('FORKS / UPSTREAM EXPERIMENTS')
p('Third-party repositories and upstream experiments are separate from my original projects. Fork ownership alone does not establish a contribution; review the upstream and commit history.')
h('EDUCATION & LANGUAGES')
p('Sports Science academic background, Universitat Ramon Llull; Advanced Technician in Physical and Sports Activities, IES Cap de Llevant. English and Spanish: native; Catalan: professional (Level C).')
def footer(canvas,doc):
 canvas.setFont('CVSans',8);canvas.setFillColor(HexColor('#555555'));canvas.drawString(42,27,'Jaime Ramsden de Frutos | Professional content reviewed 7 October 2026');canvas.drawRightString(553,27,str(doc.page))
SimpleDocTemplate(str(ROOT/'public/documents/Jaime-Ramsden-de-Frutos-CV.pdf'),pagesize=(595,842),rightMargin=42,leftMargin=42,topMargin=38,bottomMargin=43,title='Jaime Ramsden de Frutos - Junior SOC / Blue Team candidate',author='Jaime Ramsden de Frutos').build(story,onFirstPage=footer,onLaterPages=footer)
