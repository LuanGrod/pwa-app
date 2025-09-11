import { Questao as QuestaoType } from "@/type/Entities";
import UploadImage from "@global/component/atomic/UploadImage";
import QuestaoAlternativa from "./QuestaoAlternativa";
import useQuestoes from "@/store/QuestaoStore";

type Props = {
  data: QuestaoType;
};

export default function Questao({ data }: Props) {

  const {getQuestionType} = useQuestoes();

  const alternativas = [
    data.questoes_alternativa_a || data.questoes_alternativa_a_url_imagem,
    data.questoes_alternativa_b || data.questoes_alternativa_b_url_imagem,
    data.questoes_alternativa_c || data.questoes_alternativa_c_url_imagem,
    data.questoes_alternativa_d || data.questoes_alternativa_d_url_imagem,
    data.questoes_alternativa_e || data.questoes_alternativa_e_url_imagem,
  ];

  return (
    <div className="questao-wrapper">
      <p className="area-tema">{`${data.areas_nome}:${` `}${data.temas_nome}`}</p>
      <p className="ano">{`Prova de ${data.provas_ano}`}</p>
      <p className="enunciado">{data.questoes_enunciado}</p>
      {data.questoes_url_imagem && (
        <UploadImage
          alt={data.questoes_enunciado}
          src={data.questoes_url_imagem}
          height={300}
          width={300}
          className="imagem"
          priority
        />
      )}
      <div className="alternativas-wrapper">
        <QuestaoAlternativa tipo={getQuestionType()} alternativa="A" conteudo={alternativas[0]} />
        <QuestaoAlternativa tipo={getQuestionType()} alternativa="B" conteudo={alternativas[1]} />
        <QuestaoAlternativa tipo={getQuestionType()} alternativa="C" conteudo={alternativas[2]} />
        <QuestaoAlternativa tipo={getQuestionType()} alternativa="D" conteudo={alternativas[3]} />
        <QuestaoAlternativa tipo={getQuestionType()} alternativa="E" conteudo={alternativas[4]} />
      </div>
    </div>
  );
}
