import type { Metadata } from "next";
import LabPage from "../LabPage";

export const metadata: Metadata = {
  title: "CyberDailyLog Live Lab",
  description:
    "Explore the live CyberDailyLog intelligence dashboard from the JimBLogic portfolio.",
  openGraph: { title: "CyberDailyLog Live Lab", url: "https://jimblogic.github.io/labs/cyberdailylog/", type: "website" },
  alternates: { canonical: "/labs/cyberdailylog/" },
};

export default function CyberDailyLogLab() {
  return <LabPage lab="cyberdailylog" />;
}
