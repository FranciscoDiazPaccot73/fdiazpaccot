export async function post({ request }: { request: Request }) {
  const data = await request.json();
  const email = data.email;

  if (email && !email.includes("@")) {
    return new Response(JSON.stringify({ error: "Invalid email" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = {
    name: data.name,
    feedback: data.message,
  };

  if (email) {
    // @ts-expect-error
    body.email = email;
  }

  await fetch("https://api.franciscodiazpaccot.dev/email/fran", {
    body: JSON.stringify(body),
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  return new Response(
    JSON.stringify({ message: "Email received successfully!" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
