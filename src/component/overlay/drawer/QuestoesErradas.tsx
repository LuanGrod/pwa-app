"use client";

import { Switch as SwitchBtn } from "@global/component/button/Switch";
import { BottomDrawer } from "@global/component/overlay/drawer/Bottom";

type Answers = {
  id: string;
  ordem: string;
}

type Props = {
  open?: boolean;
  onClose?: () => void;
  answers: Answers[] | undefined;
};

export default function QuestoesErradas({ onClose, open, answers = [] }: Props) {
  const halfLength = Math.ceil(answers.length / 2);
  const leftColumnQuestions = answers.slice(0, halfLength);
  const rightColumnQuestions = answers.slice(halfLength);

  const handleSavePDF = async () => {
    alert("Not Implemented Yet");
  }

  return (
    <BottomDrawer open={open} onClose={onClose} title="Questões erradas" className="simulado-drawer">
      {
        !answers || answers.length === 0 ? (
          <div className="no-questions">Nenhuma questão incorreta.</div>
        ) : (
          <>
            <SwitchBtn className="save-pdf" onClick={handleSavePDF}>Salvar em PDF</SwitchBtn>
            <div className="wrong-wrapper">
              <div className="column">
                {leftColumnQuestions.map((answer) => (
                  <div key={answer.id} className="item">
                    Questão {answer.ordem}
                  </div>
                ))}
              </div>

              <div className="wrong-separator"></div>

              <div className="column">
                {rightColumnQuestions.map((answer) => (
                  <div key={answer.id} className="item">
                    Questão {answer.ordem}
                  </div>
                ))}
              </div>
            </div>
          </>
        )
      }

    </BottomDrawer>
  );
}
