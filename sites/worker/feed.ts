import { isCyberDailySnapshot, publicSnapshot } from "../lib/feed";

let cached: { text: string; until: number } | null = null;
let pending: Promise<string | null> | null = null;

async function getPublicFeed(): Promise<string | null> {
  if (cached && cached.until > Date.now()) return cached.text;
  if (pending) return pending;
  pending = (async () => {
    try {
      // Fixed public URL. Never forward the visitor's request, headers or cookies.
      const response = await fetch("https://jimblogic.github.io/data/cyberdailylog.json", {
        headers: { accept: "application/json" }, signal: AbortSignal.timeout(5000), redirect: "error",
      });
      if (!response.ok) return null;
      const text = await response.text();
      if (text.length > 32768) return null;
      const data = JSON.parse(text);
      if (!isCyberDailySnapshot(data)) return null;
      const clean = JSON.stringify(publicSnapshot(data));
      cached = { text: clean, until: Date.now() + 15 * 60 * 1000 };
      return clean;
    } catch { return null; }
    finally { pending = null; }
  })();
  return pending;
}

export async function servePublicFeed(request: Request, assets: Fetcher): Promise<Response> {
  if (request.method !== "GET" && request.method !== "HEAD") return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
  const text = await getPublicFeed();
  if (text) return new Response(request.method === "HEAD" ? null : text, {
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "public, max-age=300" },
  });
  return assets.fetch(new Request(new URL("/data/cyberdailylog.json", request.url), { method: request.method }));
}
