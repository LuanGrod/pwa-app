export async function GET(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const instituicoes = [
    { instituicoes_id: 1, instituicoes_nome: "Instituição Exemplo 1" },
    { instituicoes_id: 2, instituicoes_nome: "Instituição Exemplo 2" },
    { instituicoes_id: 3, instituicoes_nome: "Instituição Exemplo 3" },
    { instituicoes_id: 4, instituicoes_nome: "Instituição Exemplo 4" },
    { instituicoes_id: 5, instituicoes_nome: "Instituição Exemplo 5" },
    { instituicoes_id: 6, instituicoes_nome: "Instituição Exemplo 6" },
    { instituicoes_id: 7, instituicoes_nome: "Instituição Exemplo 7" },
    { instituicoes_id: 8, instituicoes_nome: "Instituição Exemplo 8" },
    { instituicoes_id: 9, instituicoes_nome: "Instituição Exemplo 9" },
    { instituicoes_id: 10, instituicoes_nome: "Instituição Exemplo 10" },
    { instituicoes_id: 11, instituicoes_nome: "Instituição Exemplo 11" },
    { instituicoes_id: 12, instituicoes_nome: "Instituição Exemplo 12" },
    { instituicoes_id: 13, instituicoes_nome: "Instituição Exemplo 13" },
    { instituicoes_id: 14, instituicoes_nome: "Instituição Exemplo 14" },
    { instituicoes_id: 15, instituicoes_nome: "Instituição Exemplo 15" },
    { instituicoes_id: 16, instituicoes_nome: "Instituição Exemplo 16" },
    { instituicoes_id: 17, instituicoes_nome: "Instituição Exemplo 17" },
    { instituicoes_id: 18, instituicoes_nome: "Instituição Exemplo 18" },
    { instituicoes_id: 19, instituicoes_nome: "Instituição Exemplo 19" },
    { instituicoes_id: 20, instituicoes_nome: "Instituição Exemplo 20" },
    { instituicoes_id: 21, instituicoes_nome: "Instituição Exemplo 21" },
    { instituicoes_id: 22, instituicoes_nome: "Instituição Exemplo 22" },
    { instituicoes_id: 23, instituicoes_nome: "Instituição Exemplo 23" },
    { instituicoes_id: 24, instituicoes_nome: "Instituição Exemplo 24" },
    { instituicoes_id: 25, instituicoes_nome: "Instituição Exemplo 25" },
    { instituicoes_id: 26, instituicoes_nome: "Instituição Exemplo 26" },
    { instituicoes_id: 27, instituicoes_nome: "Instituição Exemplo 27" },
    { instituicoes_id: 28, instituicoes_nome: "Instituição Exemplo 28" },
    { instituicoes_id: 29, instituicoes_nome: "Instituição Exemplo 29" },
    { instituicoes_id: 30, instituicoes_nome: "Instituição Exemplo 30" },
    { instituicoes_id: 31, instituicoes_nome: "Instituição Exemplo 31" },
    { instituicoes_id: 32, instituicoes_nome: "Instituição Exemplo 32" },
    { instituicoes_id: 33, instituicoes_nome: "Instituição Exemplo 33" },
    { instituicoes_id: 34, instituicoes_nome: "Instituição Exemplo 34" },
    { instituicoes_id: 35, instituicoes_nome: "Instituição Exemplo 35" },
    { instituicoes_id: 36, instituicoes_nome: "Instituição Exemplo 36" },
    { instituicoes_id: 37, instituicoes_nome: "Instituição Exemplo 37" },
    { instituicoes_id: 38, instituicoes_nome: "Instituição Exemplo 38" },
    { instituicoes_id: 39, instituicoes_nome: "Instituição Exemplo 39" },
    { instituicoes_id: 40, instituicoes_nome: "Instituição Exemplo 40" },
    { instituicoes_id: 41, instituicoes_nome: "Instituição Exemplo 41" },
    { instituicoes_id: 42, instituicoes_nome: "Instituição Exemplo 42" },
    { instituicoes_id: 43, instituicoes_nome: "Instituição Exemplo 43" },
    { instituicoes_id: 44, instituicoes_nome: "Instituição Exemplo 44" },
    { instituicoes_id: 45, instituicoes_nome: "Instituição Exemplo 45" },
    { instituicoes_id: 46, instituicoes_nome: "Instituição Exemplo 46" },
    { instituicoes_id: 47, instituicoes_nome: "Instituição Exemplo 47" },
    { instituicoes_id: 48, instituicoes_nome: "Instituição Exemplo 48" },
    { instituicoes_id: 49, instituicoes_nome: "Instituição Exemplo 49" },
    { instituicoes_id: 50, instituicoes_nome: "Instituição Exemplo 50" },
  ];

  return new Response(JSON.stringify(instituicoes), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
