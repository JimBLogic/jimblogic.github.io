import type { Metadata } from "next";
import LabPage from "../LabPage";

export const metadata: Metadata = {
  title: "Austrian Business Cycle Monitor Live Lab",
  description:
    "Explore the live Austrian Business Cycle Monitor from the JimBLogic portfolio.",
  alternates: { canonical: "/labs/austrian-monitor" },
};

export default function AustrianMonitorLab() {
  return <LabPage lab="austrian-monitor" />;
}
