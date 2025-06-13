export async function GET(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const cidades = [
    {
      cidades_id: "53",
      cidades_nome: "Acrelândia",
    },
    {
      cidades_id: "54",
      cidades_nome: "Assis Brasil",
    },
    {
      cidades_id: "55",
      cidades_nome: "Brasiléia",
    },
    {
      cidades_id: "56",
      cidades_nome: "Bujari",
    },
    {
      cidades_id: "57",
      cidades_nome: "Capixaba",
    },
    {
      cidades_id: "58",
      cidades_nome: "Cruzeiro do Sul",
    },
    {
      cidades_id: "59",
      cidades_nome: "Epitaciolândia",
    },
    {
      cidades_id: "60",
      cidades_nome: "Feijó",
    },
    {
      cidades_id: "61",
      cidades_nome: "Jordão",
    },
    {
      cidades_id: "62",
      cidades_nome: "Mâncio Lima",
    },
    {
      cidades_id: "63",
      cidades_nome: "Manoel Urbano",
    },
    {
      cidades_id: "64",
      cidades_nome: "Marechal Thaumaturgo",
    },
    {
      cidades_id: "65",
      cidades_nome: "Plácido de Castro",
    },
    {
      cidades_id: "66",
      cidades_nome: "Porto Walter",
    },
    {
      cidades_id: "67",
      cidades_nome: "Rio Branco",
    },
    {
      cidades_id: "68",
      cidades_nome: "Rodrigues Alves",
    },
    {
      cidades_id: "69",
      cidades_nome: "Santa Rosa do Purus",
    },
    {
      cidades_id: "70",
      cidades_nome: "Senador Guiomard",
    },
    {
      cidades_id: "71",
      cidades_nome: "Sena Madureira",
    },
    {
      cidades_id: "72",
      cidades_nome: "Tarauacá",
    },
    {
      cidades_id: "73",
      cidades_nome: "Xapuri",
    },
    {
      cidades_id: "74",
      cidades_nome: "Porto Acre",
    },
  ];

  return new Response(JSON.stringify(cidades), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
