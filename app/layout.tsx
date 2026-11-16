import type { Metadata, Viewport } from "next";
import "./globals.css";
import { contentSecurityPolicy } from "@/lib/security";

const siteUrl = "https://jimblogic.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "JimBLogic Portfolio",
  title: {
    default: "JimBLogic | Cybersecurity & Ethical Hacking Portfolio",
    template: "%s | JimBLogic",
  },
  description:
    "Cybersecurity and ethical hacking portfolio by Jaime Ramsden de Frutos: UpgradeHub graduate, junior pentesting candidate, practical labs, threat intelligence and cloud foundations.",
  keywords: [
    "Junior Pentester",
    "Ethical Hacking",
    "Blue Team",
    "Security Operations",
    "Cybersecurity",
    "Threat Intelligence",
    "Incident Response",
    "Linux",
    "AWS",
    "Cloud Security",
    "Security Automation",
    "Menorca",
  ],
  authors: [{ name: "Jaime Ramsden de Frutos" }],
  creator: "Jaime Ramsden de Frutos",
  publisher: "Jaime Ramsden de Frutos",
  category: "technology",
  classification: "Cybersecurity portfolio",
  referrer: "no-referrer",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: `${siteUrl}/`,
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
    title: "JimBLogic | Cybersecurity & Ethical Hacking",
    description:
      "UpgradeHub ethical hacking training, a locally tested WSL2 homelab and CyberDailyLog threat intelligence.",
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
    title: "JimBLogic | Cybersecurity & Ethical Hacking Portfolio",
    description:
      "Cybersecurity practice: ethical hacking training, WSL2 lab evidence and threat intelligence.",
    images: ["/images/generic-sbc-homelab.webp"],
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
      description: "Cybersecurity and junior pentesting candidate. UpgradeHub Cybersecurity, Ethical Hacking and Cloud bootcamp graduate (350 hours); practical labs and CTI automation projects.",
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
        "Ethical hacking foundations",
        "Blue Team operations",
        "Threat intelligence",
        "Linux",
        "Docker",
        "Network monitoring",
        "Digital forensics foundations",
        "Incident response foundations",
        "AWS cloud foundations",
        "Security automation",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "JimBLogic Portfolio",
      description:
        "Auditable cybersecurity proof of work by cybersecurity and junior pentesting candidate Jaime Ramsden de Frutos.",
      inLanguage: ["en", "es", "ca"],
      author: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "ProfilePage",
      dateModified: "2026-11-16",
      "@id": `${siteUrl}/#profile-page`,
      url: siteUrl,
      name: "JimBLogic — Cybersecurity & Ethical Hacking Portfolio",
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
        "Original CTI automation project using CISA KEV, NVD and FIRST EPSS, stateful CVE tracking, source health and publication SLO evidence.",
      codeRepository: "https://github.com/JimBLogic/CyberDailyLog",
      programmingLanguage: "Python",
      author: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": "https://github.com/JimBLogic/defensive-homelab-blue-team#software",
      name: "Defensive Homelab",
      description:
        "WSL2 / Docker Desktop LITE pilot observed on 4–5 November 2026: four services running and two Prometheus targets UP; operational validation in progress with filesystem and manual-review gaps. Raspberry Pi NOT TESTED.",
      codeRepository:
        "https://github.com/JimBLogic/defensive-homelab-blue-team",
      programmingLanguage: ["Shell", "Dockerfile"],
      author: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": "https://github.com/JimBLogic/AustrianBusinessCycleMonitor#software",
      name: "Austrian Business Cycle Monitor",
      description: "Original educational macro-data project with source provenance and explicit freshness and failure states; not investment advice.",
      codeRepository: "https://github.com/JimBLogic/AustrianBusinessCycleMonitor",
      author: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": "https://github.com/JimBLogic/jimblogic.github.io#software",
      name: "JimBLogic Portfolio",
      description: "Original multilingual portfolio with shared professional content across GitHub Pages and Sites, privacy controls and CI checks.",
      codeRepository: "https://github.com/JimBLogic/jimblogic.github.io",
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
      <head>{process.env.NODE_ENV === "production" ? <meta httpEquiv="Content-Security-Policy" content={contentSecurityPolicy} /> : null}</head>
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
