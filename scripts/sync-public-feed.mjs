import { mkdir, readFile, writeFile } from "node:fs/promises";
import { isCyberDailySnapshot, publicSnapshot } from "../lib/feed.ts";

const target = "public/data/cyberdailylog.json";
try {
  const response = await fetch("https://raw.githubusercontent.com/JimBLogic/CyberDailyLog/main/reports/portfolio-feed.json", {
    headers: { accept: "application/json" }, signal: AbortSignal.timeout(10000), redirect: "error",
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const text = await response.text();
  if (text.length > 32768) throw new Error("Snapshot exceeds size limit");
  const data = JSON.parse(text);
  if (!isCyberDailySnapshot(data)) throw new Error("Invalid snapshot schema or date");
  await mkdir("public/data", { recursive: true });
  await writeFile(target, JSON.stringify(publicSnapshot(data), null, 2) + "\n");
  console.log(`Public snapshot: ${data.generated_at}`);
} catch (error) {
  const fallback = JSON.parse(await readFile(target, "utf8"));
  if (!isCyberDailySnapshot(fallback)) throw new Error("Feed unavailable and fallback invalid", { cause: error });
  console.warn(`Kept validated snapshot dated ${fallback.generated_at}: ${error.message}`);
}
