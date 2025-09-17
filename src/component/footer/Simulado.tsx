"use client";

import SetaDireita from "@global/component/icon/SetaDireita";
import SetaEsquerda from "@global/component/icon/SetaEsquerda";
import useQuestoes from "@/store/QuestaoStore";
import useToggleStatus from "@global/hook/overlay/useToggleStatus";
import Confirmation from "@global/component/overlay/popup/dialog/Confirmation";
import { useRouter } from "next/navigation";

type Props = {};

export default function Simulado({ }: Props) {
  const { previousIndex, index, finishExam, nextIndex, count, examEndTime } = useQuestoes();
  const { isActive, toggle } = useToggleStatus();
  const router = useRouter();

  return (
    <footer className="questoes-footer">
      <div className="buttons">
        <button className="navigation" onClick={previousIndex} disabled={index === 0}>
          <SetaEsquerda size={23} changeOnTheme className="inverted" />
        </button>
        <div className="enviar-wrapper">
          <button className="enviar" onClick={toggle} disabled={count() === 0 || !!examEndTime}>
            FINALIZAR PROVA
          </button>
        </div>
        <button className="navigation" onClick={nextIndex} disabled={index + 1 >= count()}>
          <SetaDireita size={23} changeOnTheme className="inverted" />
        </button>
      </div>
      <p className="summary">Q{index + 1} de {count()}</p>
      <Confirmation
        title="Tem certeza que deseja sair?"
        open={isActive}
        onClose={toggle}
        onConfirm={() => finishExam(router)}
        onCancel={toggle}
      />
    </footer>
  );
}
