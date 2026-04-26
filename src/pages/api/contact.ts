import type { APIRoute } from "astro";

export const prerender = false;

const UPSTREAM = "https://api.franciscodiazpaccot.dev/contact";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const email = data.email;

  if (email && !String(email).includes("@")) {
    return new Response(JSON.stringify({ error: "Invalid email" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const res = await fetch(UPSTREAM, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: data.email,
      name: data.name,
      content: data.message,
    }),
  });

  const text = await res.text();
  const type = res.headers.get("Content-Type") || "application/json";

  return new Response(text, {
    status: res.status,
    statusText: res.statusText,
    headers: { "Content-Type": type },
  });
};
