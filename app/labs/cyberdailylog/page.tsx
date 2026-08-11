import type { Metadata } from "next";
import LabPage from "../LabPage";

export const metadata: Metadata = {
  title: "CyberDailyLog Live Lab",
  description:
    "Explore the live CyberDailyLog intelligence dashboard from the JimBLogic portfolio.",
  alternates: { canonical: "/labs/cyberdailylog" },
};

export default function CyberDailyLogLab() {
  return <LabPage lab="cyberdailylog" />;
}
