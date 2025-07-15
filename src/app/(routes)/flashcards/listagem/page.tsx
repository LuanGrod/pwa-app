"use client";

import { useListing } from "@global/hook/request/useListing";
import { useSearchParams } from "next/navigation";
import { Viewing } from "@global/component/viewing/Viewing";
import Flashcard from "@/component/atomic/Flashcard";
import { Flashcard as FlashcardType } from "@/type/Entities";
import { useEffect } from "react";
import useFlashcards from "@/store/FlashcardStore";
import FlashcardStructure from "@/component/structure/Flashcard";
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";

type Props = {};

export default function page({ }: Props) {
  const filters = useSearchParams().get("filters") || "";

  const { setFlashcardsList, getCurrentFlashcard } = useFlashcards();

  const { data, loading, error } = useListing<FlashcardType>({
    entity: "flashcards",
    params: { filters: filters },
    needsAuthorization: true,
  });

  // const mock = [
  //   {
  //     "flashcards_id": "1",
  //     "flashcards_pergunta_titulo": "Exemplos de API REST?",
  //     "flashcards_pergunta": "Como é utilizado no desenvolvimento?",
  //     "flashcards_comentario_pergunta": "Informação extra para aprofundar.",
  //     "flashcards_resposta_titulo": "Resumo",
  //     "flashcards_resposta": "Define a estrutura do conteúdo HTML.",
  //     "flashcards_comentario_resposta": "Comentário para esclarecer a resposta.",
  //     "flashcards_url_imagem": "Screenshot%20from%202025-05-29%2010-51-32-47af7fca91dd663217384fadcd58c8ab.png",
  //     "temas_nome": "Banco de Dados",
  //     "areas_nome": "Infraestrutura",
  //     "respostas_flashcards_resposta": "",
  //     "flashcards_salvos_id": "2131",
  //   },
  //   {
  //     "flashcards_id": "2",
  //     "flashcards_pergunta_titulo": "O que é Git?",
  //     "flashcards_pergunta": "Qual a diferença para outras tecnologias?",
  //     "flashcards_comentario_pergunta": "Contexto relevante para a pergunta.",
  //     "flashcards_resposta_titulo": "Explicação",
  //     "flashcards_resposta": "Permite tipagem estática para JavaScript.",
  //     "flashcards_comentario_resposta": "Comentário para esclarecer a resposta.",
  //     "flashcards_url_imagem": "Screenshot%20from%202025-05-29%2010-51-32-47af7fca91dd663217384fadcd58c8ab.png",
  //     "temas_nome": "Programação",
  //     "areas_nome": "Engenharia de Software",
  //     "respostas_flashcards_resposta": "Acerto com Segurança",
  //     "flashcards_salvos_id": "",
  //   },
  //   {
  //     "flashcards_id": "3",
  //     "flashcards_pergunta_titulo": "Importância de JavaScript?",
  //     "flashcards_pergunta": "Quais são as principais características?",
  //     "flashcards_comentario_pergunta": "",
  //     "flashcards_resposta_titulo": "Conceito",
  //     "flashcards_resposta": "Armazena e gerencia dados em sistemas.",
  //     "flashcards_comentario_resposta": "Exemplo prático incluído.",
  //     "flashcards_url_imagem": "Screenshot%20from%202025-05-29%2010-51-32-47af7fca91dd663217384fadcd58c8ab.png",
  //     "temas_nome": "Programação",
  //     "areas_nome": "Infraestrutura",
  //     "respostas_flashcards_resposta": "Erro",
  //     "flashcards_salvos_id": "2131",
  //   },
  //   {
  //     "flashcards_id": "4",
  //     "flashcards_pergunta_titulo": "Exemplos de Docker?",
  //     "flashcards_pergunta": "Qual a diferença para outras tecnologias?",
  //     "flashcards_comentario_pergunta": "Contexto relevante para a pergunta.",
  //     "flashcards_resposta_titulo": "Resumo",
  //     "flashcards_resposta": "Define a estrutura do conteúdo HTML.",
  //     "flashcards_comentario_resposta": "Comentário para esclarecer a resposta.",
  //     "flashcards_url_imagem": "Screenshot%20from%202025-05-29%2010-51-32-47af7fca91dd663217384fadcd58c8ab.png",
  //     "temas_nome": "Versionamento",
  //     "areas_nome": "Qualidade",
  //     "respostas_flashcards_resposta": "Acerto Parcial",
  //     "flashcards_salvos_id": "",
  //   },
  //   {
  //     "flashcards_id": "5",
  //     "flashcards_pergunta_titulo": "Importância de Node.js?",
  //     "flashcards_pergunta": "Quais são as principais características?",
  //     "flashcards_comentario_pergunta": "Dica importante para lembrar.",
  //     "flashcards_resposta_titulo": "Conceito",
  //     "flashcards_resposta": "Armazena e gerencia dados em sistemas.",
  //     "flashcards_comentario_resposta": "Detalhes técnicos relevantes.",
  //     "flashcards_url_imagem": "Screenshot%20from%202025-05-29%2010-51-32-47af7fca91dd663217384fadcd58c8ab.png",
  //     "temas_nome": "Banco de Dados",
  //     "areas_nome": "Tecnologia",
  //     "respostas_flashcards_resposta": "Acerto Fácil",
  //     "flashcards_salvos_id": "2131",
  //   },
  //   {
  //     "flashcards_id": "6",
  //     "flashcards_pergunta_titulo": "Exemplos de CSS?",
  //     "flashcards_pergunta": "Como é utilizado no desenvolvimento?",
  //     "flashcards_comentario_pergunta": "Dica importante para lembrar.",
  //     "flashcards_resposta_titulo": "Resposta",
  //     "flashcards_resposta": "Permite tipagem estática para JavaScript.",
  //     "flashcards_comentario_resposta": "Exemplo prático incluído.",
  //     "flashcards_url_imagem": "Screenshot%20from%202025-05-29%2010-51-32-47af7fca91dd663217384fadcd58c8ab.png",
  //     "temas_nome": "Banco de Dados",
  //     "areas_nome": "Qualidade",
  //     "respostas_flashcards_resposta": "Acerto com Segurança",
  //     "flashcards_salvos_id": "",
  //   },
  //   {
  //     "flashcards_id": "7",
  //     "flashcards_pergunta_titulo": "Definição de JavaScript?",
  //     "flashcards_pergunta": "Quais são as vantagens?",
  //     "flashcards_comentario_pergunta": "Informação extra para aprofundar.",
  //     "flashcards_resposta_titulo": "Detalhes",
  //     "flashcards_resposta": "Controla versões de código fonte.",
  //     "flashcards_comentario_resposta": "Detalhes técnicos relevantes.",
  //     "flashcards_url_imagem": "Screenshot%20from%202025-05-29%2010-51-32-47af7fca91dd663217384fadcd58c8ab.png",
  //     "temas_nome": "DevOps",
  //     "areas_nome": "Infraestrutura",
  //     "respostas_flashcards_resposta": "Acerto Fácil",
  //     "flashcards_salvos_id": "2131",
  //   },
  //   {
  //     "flashcards_id": "8",
  //     "flashcards_pergunta_titulo": "Exemplos de Node.js?",
  //     "flashcards_pergunta": "Qual a diferença para outras tecnologias?",
  //     "flashcards_comentario_pergunta": "",
  //     "flashcards_resposta_titulo": "Explicação",
  //     "flashcards_resposta": "Estiliza páginas web com regras CSS.",
  //     "flashcards_comentario_resposta": "Comentário para esclarecer a resposta.",
  //     "flashcards_url_imagem": "Screenshot%20from%202025-05-29%2010-51-32-47af7fca91dd663217384fadcd58c8ab.png",
  //     "temas_nome": "Banco de Dados",
  //     "areas_nome": "Engenharia de Software",
  //     "respostas_flashcards_resposta": "Acerto Parcial",
  //     "flashcards_salvos_id": "",
  //   },
  //   {
  //     "flashcards_id": "9",
  //     "flashcards_pergunta_titulo": "Importância de Git?",
  //     "flashcards_pergunta": "Quais são as melhores práticas?",
  //     "flashcards_comentario_pergunta": "Informação extra para aprofundar.",
  //     "flashcards_resposta_titulo": "Explicação",
  //     "flashcards_resposta": "Serve para criar servidores e APIs.",
  //     "flashcards_comentario_resposta": "Informação adicional útil.",
  //     "flashcards_url_imagem": "Screenshot%20from%202025-05-29%2010-51-32-47af7fca91dd663217384fadcd58c8ab.png",
  //     "temas_nome": "DevOps",
  //     "areas_nome": "Engenharia de Software",
  //     "respostas_flashcards_resposta": "Erro",
  //     "flashcards_salvos_id": "2131",
  //   },
  //   {
  //     "flashcards_id": "10",
  //     "flashcards_pergunta_titulo": "Como funciona React?",
  //     "flashcards_pergunta": "Quais são as melhores práticas?",
  //     "flashcards_comentario_pergunta": "Dica importante para lembrar.",
  //     "flashcards_resposta_titulo": "Explicação",
  //     "flashcards_resposta": "Permite tipagem estática para JavaScript.",
  //     "flashcards_comentario_resposta": "Informação adicional útil.",
  //     "flashcards_url_imagem": "Screenshot%20from%202025-05-29%2010-51-32-47af7fca91dd663217384fadcd58c8ab.png",
  //     "temas_nome": "DevOps",
  //     "areas_nome": "Infraestrutura",
  //     "respostas_flashcards_resposta": "Acerto Parcial",
  //     "flashcards_salvos_id": "",
  //   }
  // ]

  useEffect(() => {
    if (data.rows && data.rows.length > 0) {
      setFlashcardsList(data.rows);
    }
  }, [data])

  const currentTitle = getCurrentFlashcard() ? `${getCurrentFlashcard()?.areas_nome}: ${getCurrentFlashcard()?.temas_nome}` : "";

  return (
    <FlashcardStructure title={currentTitle}>
      <Viewing
        data={getCurrentFlashcard()}
        loading={loading}
        error={error}
        loadingComponent={<Loading2 loading />}
        renderItem={(item: FlashcardType) => <Flashcard data={item} />}
      />
    </FlashcardStructure>

  );
}
