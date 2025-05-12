export async function POST(request: Request) {
  const { email, senha } = await request.json();

  if (email == "moisesnovaes5@yahoo.com.br" && senha == "senha123") {
    return new Response(JSON.stringify({ token: "0000000000000000000" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new Response(JSON.stringify({ error: "Invalid credentials", defaultEmail: "moisesnovaes5@yahoo.com.br", senha: "senha123" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
}
