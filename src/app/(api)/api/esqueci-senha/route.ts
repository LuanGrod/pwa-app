export async function POST(request: Request) {
  const { email } = await request.json();

  if (email == "moisesnovaes5@yahoo.com.br") {
    return new Response(
      JSON.stringify({ message: "E-mail enviado com sucesso. Verifique sua caixa de entrada ou spam" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } else {
    return new Response(
      JSON.stringify({ error: "Invalid credentials", defaultEmail: "moisesnovaes5@yahoo.com.br", senha: "senha123" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
