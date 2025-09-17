"use client";

import SetaDireita from "@global/component/icon/SetaDireita";
import SetaEsquerda from "@global/component/icon/SetaEsquerda";
import useQuestoes from "@/store/QuestaoStore";

type Props = {};

export default function Questao({ }: Props) {
  const { previousIndex, index, registerAnswer, nextIndex, count } = useQuestoes();
  
  return (
    <footer className="questoes-footer">
      <div className="buttons">
        <button className="navigation" onClick={previousIndex} disabled={index === 0}>
          <SetaEsquerda size={23} changeOnTheme className="inverted" />
        </button>
        <div className="enviar-wrapper">
          <button className="enviar" onClick={() => registerAnswer()}>
            VER RESPOSTA
          </button>
        </div>
        <button className="navigation" onClick={nextIndex} disabled={index + 1 >= count()}>
          <SetaDireita size={23} changeOnTheme className="inverted" />
        </button>
      </div>
      <p className="summary">Q{index + 1} de {count()}</p>
    </footer>
  );
}
