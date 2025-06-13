export async function POST(request: Request) {
  const { email, senha } = await request.json();

  const mockResponseValid = {
    userNotFound: false,
    id: 1,
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6ImNhcmxvc0BnbWFpbC5jb20iLCJleHAiOjE3NDkxMzAyOTN9.Ti5hIhCfUaJ3rkOO9BQqcJz0QLkIGJdeieFAddV1RkE",
    msg: [],
  };

  const mockResponseInvalid = {
    userNotFound: true,
    id: null,
    token: null,
    msg: {
      userNotFound: ["Usuário não encontrado"],
    },
  };

  if (email == "email@email.com" && senha == "Senha123!") {
    return new Response(JSON.stringify(mockResponseValid), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new Response(JSON.stringify(mockResponseInvalid), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
}
