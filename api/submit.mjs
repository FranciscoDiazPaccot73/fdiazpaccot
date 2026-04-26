const UPSTREAM = "https://api.franciscodiazpaccot.dev/email/fran";

/**
 * Vercel Serverless (Node).
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

  const body = {
    name: data.name,
    feedback: data.message,
  };
  if (email) {
    body.email = email;
  }

  await fetch(UPSTREAM, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Email received successfully!" }));
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
