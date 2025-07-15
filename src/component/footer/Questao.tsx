"use client";

import SetaDireita from "@global/component/icons/SetaDireita";
import SetaEsquerda from "@global/component/icons/SetaEsquerda";
import useQuestoes from "@/store/QuestaoStore";
import { useUser } from "@global/hook/auth/useUser";

type Props = {};

export default function Questao({ }: Props) {
  const { previousIndex, index, registerAnswer, nextIndex, countQuestoes } = useQuestoes();
  const { id: userId } = useUser();
  
  return (
    <footer className="questoes-footer">
      <div className="buttons">
        <button className="navigation" onClick={previousIndex} disabled={index === 0}>
          <SetaEsquerda size={23} changeOnTheme className="inverted" />
        </button>
        <div className="enviar-wrapper">
          <button className="enviar" onClick={() => registerAnswer(userId)}>
            VER RESPOSTA
          </button>
        </div>
        <button className="navigation" onClick={nextIndex} disabled={index + 1 >= countQuestoes()}>
          <SetaDireita size={23} changeOnTheme className="inverted" />
        </button>
      </div>
      <p className="summary">Q{index + 1} de {countQuestoes()}</p>
    </footer>
  );
}
