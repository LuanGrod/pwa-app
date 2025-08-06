"use client";

import SetaDireita from "@global/component/icons/SetaDireita";
import SetaEsquerda from "@global/component/icons/SetaEsquerda";
import useQuestoes from "@/store/QuestaoStore";
import useDialog from "@global/hook/overlay/useDialog";
import Confirmation from "@global/component/overlay/popup/dialog/Confirmation";
import { useRouter } from "next/navigation";

type Props = {};

export default function Simulado({ }: Props) {
  const { previousIndex, index, finishExam, nextIndex, count, answers, testFinished } = useQuestoes();
  const { isOpen, toggleDialog } = useDialog();
  const router = useRouter();

  return (
    <footer className="questoes-footer">
      <div className="buttons">
        <button className="navigation" onClick={previousIndex} disabled={index === 0}>
          <SetaEsquerda size={23} changeOnTheme className="inverted" />
        </button>
        <div className="enviar-wrapper">
          <button className="enviar" onClick={() => toggleDialog()} disabled={count() === 0 || testFinished}>
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
        open={isOpen}
        onClose={toggleDialog}
        onConfirm={() => finishExam(router)}
        onCancel={toggleDialog}
      />
    </footer>
  );
}
