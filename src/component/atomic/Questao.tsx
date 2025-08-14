import { Questao as QuestaoType } from "@/type/Entities";
import UploadImage from "@global/component/atomic/UploadImage";
import QuestaoAlternativa from "./QuestaoAlternativa";

type Props = {
  data: QuestaoType;
};

export default function Questao({ data }: Props) {
  const alternativas = [
    data.questoes_alternativa_a,
    data.questoes_alternativa_b,
    data.questoes_alternativa_c,
    data.questoes_alternativa_d,
    // data.questoes_alternativa_e,
  ];
  const imageExtensions = [".jpg", ".png", ".jpeg"];
  const qtdAlternativas = alternativas.filter((item) => item && item.trim() !== "").length;
  const imagemAlternativa = alternativas.some(
    (item) => item && item.trim() !== "" && imageExtensions.some((ext) => item.toLowerCase().endsWith(ext))
  );
  const alternativaClassname = imagemAlternativa ? "imagem" : qtdAlternativas === 2 ? "verdadeiro" : "multiplo";

  return (
    <div className="questao-wrapper">
      <p className="area-tema">{`${data.areas_nome}:${` `}${data.temas_nome}`}</p>
      <p className="ano">{`Prova de ${data.provas_ano}`}</p>
      <p className="enunciado">{data.questoes_enunciado}</p>
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
      <div className="alternativas-wrapper">
        <QuestaoAlternativa tipo={alternativaClassname} alternativa="A" conteudo={data.questoes_alternativa_a} />
        <QuestaoAlternativa tipo={alternativaClassname} alternativa="B" conteudo={data.questoes_alternativa_b} />
        <QuestaoAlternativa tipo={alternativaClassname} alternativa="C" conteudo={data.questoes_alternativa_c} />
        <QuestaoAlternativa tipo={alternativaClassname} alternativa="D" conteudo={data.questoes_alternativa_d} />
        <QuestaoAlternativa tipo={alternativaClassname} alternativa="E" conteudo={data.questoes_alternativa_e} />
      </div>
    </div>
  );
}
