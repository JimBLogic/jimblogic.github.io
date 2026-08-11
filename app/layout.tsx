import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://jimblogic.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "JimBLogic Portfolio",
  title: {
    default: "JimBLogic | Junior SOC Analyst & Blue Team Portfolio",
    template: "%s | JimBLogic",
  },
  description:
    "Jaime Ramsden de Frutos — Junior SOC Analyst and Blue Team candidate. Auditable proof of work in threat intelligence automation, defensive homelabs, Linux, monitoring, incident response and AWS foundations.",
  keywords: [
    "Junior SOC Analyst",
    "Blue Team",
    "Cybersecurity",
    "Threat Intelligence",
    "Incident Response",
    "Linux",
    "AWS",
    "Menorca",
  ],
  authors: [{ name: "Jaime Ramsden de Frutos" }],
  creator: "Jaime Ramsden de Frutos",
  publisher: "Jaime Ramsden de Frutos",
  category: "technology",
  classification: "Cybersecurity portfolio",
  referrer: "strict-origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "JimBLogic | Defensive proof of work",
    description:
      "CyberDailyLog, a defensive Raspberry Pi homelab and verifiable Blue Team learning.",
    type: "website",
    url: siteUrl,
    siteName: "JimBLogic Portfolio",
    locale: "en_GB",
    alternateLocale: ["es_ES", "ca_ES"],
    images: [
      {
        url: "/images/generic-sbc-homelab.webp",
        width: 1200,
        height: 800,
        alt: "Generic single-board computer used for a defensive cybersecurity homelab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JimBLogic | Junior SOC Analyst & Blue Team Portfolio",
    description:
      "Auditable defensive proof of work: CyberDailyLog, a Raspberry Pi homelab and verifiable Blue Team learning.",
    images: ["/images/generic-sbc-homelab.webp"],
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/favicon.svg",
    apple: { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#181a1b",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Jaime Ramsden de Frutos",
      alternateName: "JimBLogic",
      url: siteUrl,
      email: "mailto:jrf91@pm.me",
      jobTitle: "Junior SOC Analyst / Blue Team Candidate",
      knowsLanguage: ["English", "Spanish", "Catalan"],
      homeLocation: {
        "@type": "Place",
        name: "Menorca, Balearic Islands, Spain",
      },
      sameAs: [
        "https://github.com/JimBLogic",
        "https://www.linkedin.com/in/jimblogic/",
        "https://tryhackme.com/p/JimBLogic",
        "https://jimblogic.github.io/",
      ],
      knowsAbout: [
        "SOC analysis",
        "Blue Team operations",
        "Threat intelligence",
        "Linux",
        "Docker",
        "Network monitoring",
        "Digital forensics foundations",
        "Incident response foundations",
        "AWS cloud foundations",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "JimBLogic Portfolio",
      description:
        "Auditable cybersecurity proof of work by Junior SOC Analyst candidate Jaime Ramsden de Frutos.",
      inLanguage: ["en", "es", "ca"],
      author: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profile-page`,
      url: siteUrl,
      name: "JimBLogic — Junior SOC Analyst & Blue Team Portfolio",
      description:
        "Recruiter-first portfolio with auditable cybersecurity projects, operational experience and verifiable learning evidence.",
      inLanguage: ["en", "es", "ca"],
      mainEntity: { "@id": `${siteUrl}/#person` },
      isPartOf: { "@id": `${siteUrl}/#website` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/jaime-ramsden.webp`,
        width: 480,
        height: 480,
      },
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": "https://github.com/JimBLogic/CyberDailyLog#software",
      name: "CyberDailyLog",
      description:
        "Automated, source-backed daily Blue Team intelligence pipeline with auditable reports.",
      codeRepository: "https://github.com/JimBLogic/CyberDailyLog",
      programmingLanguage: "Python",
      author: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": "https://github.com/JimBLogic/defensive-homelab-blue-team#software",
      name: "Defensive Homelab",
      description:
        "Reproducible Raspberry Pi 4 Blue Team lab with LITE and FULL deployment modes.",
      codeRepository:
        "https://github.com/JimBLogic/defensive-homelab-blue-team",
      programmingLanguage: ["Shell", "Dockerfile"],
      author: { "@id": `${siteUrl}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
