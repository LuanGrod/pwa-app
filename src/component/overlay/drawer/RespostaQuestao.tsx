"use client";

import { BottomDrawer } from "@global/component/overlay/drawer/Bottom";
import { Questao as QuestaoType } from "@/type/Entities";
import UploadImage from "@global/component/image/UploadImage";
import useQuestoes from "@/store/QuestaoStore";

type Props = {
  open?: boolean;
  onClose?: () => void;
  data?: QuestaoType;
};

export default function RespostaQuestao({ onClose, open, data }: Props) {
  const { getQuestionType } = useQuestoes();

  return (
    <BottomDrawer open={open} onClose={onClose} className="questoes-drawer" overlay={false}>

      <h1 className="gabarito">Gabarito: {getQuestionType() !== "questao-aberta" && data?.questoes_gabarito}</h1>
      <h2 className="alternativa">
        {
          data && data[
          `questoes_alternativa_${data.questoes_gabarito.toLowerCase()}` as keyof QuestaoType
          ]
        }
      </h2>
      {
        data && data[
        `questoes_alternativa_${data.questoes_gabarito.toLowerCase()}_url_imagem` as keyof QuestaoType
        ] && (
          <UploadImage
            alt={data.questoes_enunciado}
            src={data[
              `questoes_alternativa_${data.questoes_gabarito.toLowerCase()}_url_imagem` as keyof QuestaoType
            ] as string}
            height={300}
            width={300}
            className="alternativa-imagem"
          />
        )
      }
      {
        data && data.questoes_comentario_resposta_url_imagem && (
          <UploadImage
            alt={data.questoes_comentario_resposta}
            src={data.questoes_comentario_resposta_url_imagem}
            height={300}
            width={300}
            className="imagem"
          />
        )
      }
      <p className="comentario">{data?.questoes_comentario_resposta}</p>
      {
        data && data.questoes_referencia_comentario && (
          <>
            <p className="titulo-referencia">Dica de prova:</p>
            <p className="referencia">{data.questoes_referencia_comentario}</p>
          </>
        )
      }
    </BottomDrawer>
  );
}
