export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (email == "dev@email.com" && password == "123") {
    return new Response(JSON.stringify({ token: "0000000000000000000" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new Response(JSON.stringify({ error: "Invalid credentials", defaultEmail: "dev@email.com", password: "123" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
}
