import catalogData from "@/public/agent-resources/catalog.json";
import qaData from "@/public/agent-resources/qa-cases.json";

// Authored static data only. Build-time checks validate the public JSON and its
// references; importing this module never fetches a publisher or runs an agent.
export const catalog = catalogData;
export const qaCases = qaData;
export const sourceWorkflows = catalog.workflows;

export const sourceCategories = [
  {
    id: "security",
    heading: "Defensive security",
    note: "Separate observed exploitation, prediction, CVE enrichment, technique mapping and implementation guidance.",
  },
  {
    id: "identity",
    heading: "Identity and cloud permissions",
    note: "Identify the platform and access boundary before consulting the responsible vendor's guidance.",
  },
  {
    id: "web",
    heading: "Web standards and deployment behaviour",
    note: "Use specifications for semantics, explanatory references for context and vendor documentation for the deployed product.",
  },
  {
    id: "data",
    heading: "Official economic data",
    note: "Compare dataset definitions, periods and units before interpreting values; preserve revisions and missing observations.",
  },
] as const;

export type Source = (typeof catalog.sources)[number];
export type SourceWorkflow = (typeof sourceWorkflows)[number];
