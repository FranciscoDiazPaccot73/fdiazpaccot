const UPSTREAM = "https://api.franciscodiazpaccot.dev/contact";

/**
 * Vercel Serverless (Node). Replaces `src/pages/api` so the site can stay
 * a static `astro build` and avoid the Astro+adapter _render/entry.mjs deploy bug.
 * @param {import("http").IncomingMessage} req
 * @param {import("http").ServerResponse} res
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Method Not Allowed");
    return;
  }

  let data;
  try {
    const raw = await readBody(req);
    data = raw ? JSON.parse(raw) : {};
  } catch {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Invalid JSON" }));
    return;
  }

  const email = data.email;
  if (email && !String(email).includes("@")) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Invalid email" }));
    return;
  }

  const r = await fetch(UPSTREAM, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: data.email,
      name: data.name,
      message: data.message,
    }),
  });

  const text = await r.text();
  const contentType = r.headers.get("Content-Type") || "application/json";
  res.writeHead(r.status, { "Content-Type": contentType });
  res.end(text);
}

/**
 * @param {import("http").IncomingMessage} req
 * @returns {Promise<string>}
 */
function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      if (!chunks.length) {
        resolve("");
        return;
      }
      resolve(Buffer.concat(chunks).toString("utf8"));
    });
    req.on("error", reject);
  });
}
