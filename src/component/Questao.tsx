import { Questao as QuestaoType } from "@/type/Entities";
import UploadImage from "@global/atomic/UploadImage";
import { Dispatch } from "react";

type Props = {
  data: QuestaoType;
  setData: Dispatch<any>;
  showingAnswer?: boolean;
};

export default function Questao({ data, setData, showingAnswer }: Props) {
  const alternativas = [
    data.questoes_alternativa_a,
    data.questoes_alternativa_b,
    data.questoes_alternativa_c,
    data.questoes_alternativa_d,
  ];
  const imageExtensions = [".jpg", ".png", ".jpeg"];
  const qtdAlternativas = alternativas.filter((item) => item.trim() !== "").length;
  const imagemAlternativa = alternativas.some(
    (item) => item.trim() !== "" && imageExtensions.some((ext) => item.toLowerCase().endsWith(ext))
  );
  const alternativaClassname = `alternativa ${qtdAlternativas === 2 ? "verdadeiro" : ""} ${
    imagemAlternativa ? "imagem" : ""
  }`;

  return (
    <div className="questao-wrapper">
      <p className="area-tema">{`${data.areas_nome}:${data.temas_nome}`}</p>
      <p className="ano">{`Prova de ${data.provas_ano}`}</p>
      <p className="enunciado" id="enunciado">{data.questoes_enunciado}</p>
      {data.questoes_url_imagem && (
        <UploadImage
          alt={data.questoes_enunciado}
          src={data.questoes_url_imagem}
          height={200}
          width={200}
          className="imagem"
          priority
        />
      )}
      <div>{qtdAlternativas}</div>
      <div>{imagemAlternativa ? "V" : "F"}</div>
      <div className="alternativas-wrapper">
        <div className={alternativaClassname}>{data.questoes_alternativa_a}</div>
        <div className={alternativaClassname}>{data.questoes_alternativa_b}</div>
        {data.questoes_alternativa_c && <div className={alternativaClassname}>{data.questoes_alternativa_c}</div>}
        {data.questoes_alternativa_d && <div className={alternativaClassname}>{data.questoes_alternativa_d}</div>}
        {data.questoes_alternativa_e && <div className={alternativaClassname}>{data.questoes_alternativa_e}</div>}
      </div>
    </div>
  );
}
