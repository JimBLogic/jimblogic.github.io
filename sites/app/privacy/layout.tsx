import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy & Local Storage",
  description: "JimBLogic portfolio privacy: visitor-selected language, deletion controls, same-domain resources and hosting-provider information.",
  alternates: { canonical: "https://jimblogic.github.io/privacy/" },
  openGraph: { title: "Privacy & local storage | JimBLogic", url: "https://jimblogic.github.io/privacy/", type: "website" },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) { return children; }
