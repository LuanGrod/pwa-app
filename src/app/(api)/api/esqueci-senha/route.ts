export async function POST(request: Request) {
  const { email } = await request.json();

  await new Promise((resolve) => setTimeout(resolve, 500));

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
      JSON.stringify({ error: "Invalid credentials", message: "Usuário não encontrado" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
