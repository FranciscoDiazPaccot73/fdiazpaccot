export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  const data = await request.json();
  const email = data.email;
  if (email && !email.includes("@")) {
    return new Response(JSON.stringify({ error: "Invalid email" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  const body = {
    name: data.name,
    feedback: data.message
  };
  if (email) {
    body.email = email;
  }
  await fetch("https://api.franciscodiazpaccot.dev/email/fran", {
    body: JSON.stringify(body),
    method: "POST",
    headers: { "Content-Type": "application/json" }
  });
  return new Response(
    JSON.stringify({ message: "Email received successfully!" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" }
    }
  );
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
