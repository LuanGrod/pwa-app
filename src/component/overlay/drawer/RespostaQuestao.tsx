"use client";

import { BottomDrawer } from "@global/component/overlay/drawer/Bottom";
import { Questao as QuestaoType } from "@/type/Entities";
import UploadImage from "@global/component/atomic/UploadImage";

type Props = {
  open?: boolean;
  onClose?: () => void;
  data: QuestaoType | null;
};

export default function RespostaQuestao({ onClose, open, data }: Props) {
  return (
    <BottomDrawer open={open} onClose={onClose} customClass="questoes-drawer" overlay={false}>
      <h1 className="gabarito">Gabarito: {data?.questoes_gabarito}</h1>
      <h2 className="alternativa">{
        data && data[
        `questoes_alternativa_${data.questoes_gabarito.toLowerCase()}` as keyof QuestaoType
        ]
      }</h2>
      {
        data && data.questoes_comentario_resposta_url_imagem && (
          <UploadImage
            alt={data.questoes_comentario_resposta}
            src={data.questoes_comentario_resposta_url_imagem}
            height={200}
            width={200}
            className="imagem"
          />
        )
      }
      <p className="comentario">{data?.questoes_comentario_resposta}</p>
      {
        data && data.questoes_referencia_comentario && (
          <>
            <p className="titulo-referencia">Referência principal:</p>
            <p className="referencia">{data.questoes_referencia_comentario}</p>
          </>
        )
      }
    </BottomDrawer>
  );
}
