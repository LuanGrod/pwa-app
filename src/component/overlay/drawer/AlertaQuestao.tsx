"use client";

import useQuestoes from "@/store/QuestaoStore";
import { TopDrawer } from "@global/component/overlay/drawer/Top";

type Props = {
  open?: boolean;
  onClose?: () => void;
};

export default function AlertaQuestao({ onClose, open }: Props) {
  const { getCurrentAnswer } = useQuestoes();

  const isCorrect = getCurrentAnswer()?.answer === getCurrentAnswer()?.correct;

  return (
    <TopDrawer open={open} onClose={onClose} className={`questoes-alerta ${isCorrect ? "correto" : "incorreto"}`}>
      <h1>{isCorrect ? "Parabéns! Resposta correta." : "Resposta incorreta!"}</h1>
    </TopDrawer>
  );
}
