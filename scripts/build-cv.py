"""Build the preserved photo CV and separate cover letter. Requires PyMuPDF and reportlab."""
from pathlib import Path
import fitz
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
pdfmetrics.registerFont(TTFont("DocSans", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("DocSansBold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
pdfmetrics.registerFontFamily("DocSans",normal="DocSans",bold="DocSansBold",italic="DocSans",boldItalic="DocSansBold")
ROOT=Path(__file__).resolve().parents[1]
out=ROOT/'public/documents'
pdf=fitz.open(ROOT/'scripts/assets/cv-photo-template.pdf')
def put(page,rect,text,size=9,font='helv',color=(0,0,0)):
 fontfile='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf' if font=='hebo' else '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
 font='EmbeddedBold' if font=='hebo' else 'EmbeddedSans'
 pdf[page].insert_font(fontname=font,fontfile=fontfile)
 remaining=pdf[page].insert_textbox(fitz.Rect(rect),text,fontsize=size,fontname=font,color=color,lineheight=1.22)
 assert remaining>=0,(text,remaining)
# Preserve the original photograph, header, section layout and employment detail.
pdf[0].draw_rect(fitz.Rect(42,95,300,130),color=None,fill=(18/255,53/255,59/255),overlay=True)
put(0,(42.5,98,295,132),'Junior SOC / Blue Team candidate\nThreat intelligence and cloud foundations',10.5,'hebo',(1,1,1))
put(0,(35.5,274,562,344),'Seeking my first professional SOC / Blue Team role. I combine hands-on defensive training in Splunk/SPL, TryHackMe and Security Blue Team with administration, IT support and customer operations. My public projects demonstrate source-backed CTI, Linux, containers, reproducibility and clear technical documentation. CyberDailyLog is my main defensive project; homelab operational validation is still in progress. Projects and guided labs are not professional SOC employment. Native English and Spanish communicator, used to careful records and operational pressure.',9)
put(0,(37,400,563,415),'- TryHackMe profile JimBLogic: public hands-on learning evidence; ranking and activity change over time.',9)
put(0,(37,509,563,540),'- AWS AIF-C01: first attempt completed 29 September 2026; targeted study before a retake. CLF-C02: preparing. Neither AWS certification is earned; Skill Builder / SimuLearn badges are training evidence.',9)
put(1,(35.5,94,562,109),'Administrative Assistant & IT Support Functions | Administración de Fincas Vil-la | 2026',9)
for i in range(2):put(i,(195,819,435,832),'Jamie Ramsden de Frutos - Junior SOC / Blue Team candidate',7,color=(.35,.35,.35))
pdf.set_metadata({'title':'Jamie Ramsden de Frutos - Junior SOC / Blue Team CV','author':'Jamie Ramsden de Frutos'})
pdf.subset_fonts()
pdf.save(out/'Jaime-Ramsden-de-Frutos-CV.pdf',garbage=4,deflate=True)
# A genuine cover letter, based on the project-focused document, not a relabelled CV.
styles={
 'name':ParagraphStyle('name',fontName='DocSansBold',fontSize=21,leading=26,textColor=HexColor('#12353b'),spaceAfter=9),
 'meta':ParagraphStyle('meta',fontName='DocSans',fontSize=10,leading=15,spaceAfter=18),
 'body':ParagraphStyle('body',fontName='DocSans',fontSize=10,leading=14.5,spaceAfter=13),
 'subject':ParagraphStyle('subject',fontName='DocSansBold',fontSize=12,leading=17,textColor=HexColor('#12353b'),spaceAfter=22),
}
story=[]
def p(s,k='body'):story.append(Paragraph(s,styles[k]))
p('Jamie Ramsden de Frutos','name')
p('Menorca, Spain | English / Spanish / Catalan<br/><link href="mailto:jrf91@pm.me">jrf91@pm.me</link> | <link href="https://jimblogic.github.io/">jimblogic.github.io</link>','meta')
p('Application for a Junior SOC / Blue Team opportunity','subject')
p('Dear Hiring Team,')
p('I am seeking my first professional role in SOC / Blue Team, bringing practical defensive learning and a background in administration, IT support and customer-facing operations. I am interested in remote or hybrid opportunities in Spain and the EU, and I also have the right to work in the UK.')
p('My strongest evidence is CyberDailyLog, a personal defensive threat-intelligence and automation project. It brings together CISA KEV, NVD and FIRST EPSS, tracks CVE state changes, and produces source-backed reports. Source-health checks, explicit degradation and publication timing records make its limitations and failures visible. It is a learning and research project, not a claim of enterprise SOC operation.')
p('I also maintain a reproducible defensive homelab baseline built around Linux and containers. Deployment configuration and documentation are available for review; operational validation is still in progress. My next deliverables are documented service health, authentication triage, telemetry, a SIEM query, an incident note and detection tuning. I distinguish clearly between planned evidence and completed work.')
p('My previous roles have taught me to prioritise competing requests, troubleshoot everyday systems, protect sensitive information and leave clear handovers. Residential support work at The Community of Saint Antony & Saint Elias (2016-2022), airport customer operations and property administration in 2026 provide that operational background. They are not cybersecurity incident-response employment.')
p('Training supports this practical work. I completed preparation and my first AWS AI Practitioner AIF-C01 exam attempt on 29 September 2026 and am reinforcing the areas identified before a future retake. Cloud Practitioner CLF-C02 remains in preparation; neither is an earned AWS certification. My portfolio separates training badges, guided labs and original projects.')
p('I would welcome the opportunity to discuss my repositories, explain my technical decisions and contribute under the guidance of an experienced security team. I offer careful documentation, curiosity and a willingness to make my work reproducible and reviewable.')
p('Kind regards,<br/><b>Jamie Ramsden de Frutos</b>')
SimpleDocTemplate(str(out/'Jaime-Ramsden-de-Frutos-Cover-Letter.pdf'),pagesize=(595,842),leftMargin=48,rightMargin=48,topMargin=42,bottomMargin=40,title='Jamie Ramsden de Frutos - Junior SOC / Blue Team cover letter',author='Jamie Ramsden de Frutos').build(story)
