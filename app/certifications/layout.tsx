import type { Metadata } from "next";

const siteUrl = "https://jimblogic.github.io";

export const metadata: Metadata = {
  title: "Cybersecurity Certifications & Labs",
  description:
    "Search and verify Jaime Ramsden de Frutos' Blue Team, SOC, AWS, digital forensics, threat intelligence, Linux and cybersecurity learning evidence.",
  alternates: {
    canonical: `${siteUrl}/certifications`,
  },
  openGraph: {
    title: "Cybersecurity certifications and labs | JimBLogic",
    description:
      "A searchable record of verifiable Blue Team, AWS and cybersecurity learning evidence.",
    url: `${siteUrl}/certifications`,
    type: "website",
    images: [
      {
        url: "/images/generic-sbc-homelab.webp",
        width: 1200,
        height: 800,
        alt: "JimBLogic cybersecurity learning evidence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cybersecurity certifications and labs | JimBLogic",
    description:
      "Searchable, verifiable Blue Team, AWS and cybersecurity learning evidence.",
    images: ["/images/generic-sbc-homelab.webp"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${siteUrl}/certifications#collection`,
  url: `${siteUrl}/certifications`,
  name: "JimBLogic cybersecurity certifications and labs",
  description:
    "A searchable collection of 37 verifiable cybersecurity learning records from Security Blue Team, AWS, Cisco, Cybrary, IBM, UpgradeHub and other issuers.",
  inLanguage: "en",
  isPartOf: { "@id": `${siteUrl}/#website` },
  about: [
    "Blue Team",
    "SOC analysis",
    "Digital forensics",
    "Threat intelligence",
    "AWS cloud foundations",
  ],
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Portfolio",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Certifications and labs",
        item: `${siteUrl}/certifications`,
      },
    ],
  },
};

export default function CertificationsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}
