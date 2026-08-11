import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "JimBLogic — Cybersecurity Portfolio",
    short_name: "JimBLogic",
    description:
      "Auditable SOC, Blue Team and cybersecurity proof of work by Jaime Ramsden de Frutos.",
    start_url: "/",
    display: "standalone",
    background_color: "#181a1b",
    theme_color: "#f7931a",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
