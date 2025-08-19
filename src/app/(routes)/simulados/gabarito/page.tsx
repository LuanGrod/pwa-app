"use client";

import QuestoesErradas from "@/component/overlay/drawer/QuestoesErradas";
import useQuestoes from "@/store/QuestaoStore";
import { Shadow as ShadowBtn } from "@global/component/button/Shadow";
import { Switch as SwitchBtn } from "@global/component/button/Switch";
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";
import useDialog from "@global/hook/overlay/useDialog";
import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";
import CardList from "@global/component/stat/CardList";
import SimpleLine from "@global/component/stat/SimpleLine";
import CardSimulado from "@/component/stat/CardSimulado";

type Props = {}

export default function page({ }: Props) {
  const {
    _hasHydrated,
    test,
    getFormattedTime,
    getGeneralStatistics,
    getAccuracyByArea,
    answers,
    isSaving,
    saveExam
  } = useQuestoes();
  const router = useRouter()
  const { isOpen, toggleDialog } = useDialog();

  const {
    totalQuestions,
    answeredQuestions,
    correctAnswers,
    incorrectAnswers,
    unansweredQuestions,
    correctPercentageOverRespondedQuestions
  } = getGeneralStatistics();

  const accuracyByArea = getAccuracyByArea();

  const elapsedTime = getFormattedTime("detailed");

  useEffect(() => {
    router.prefetch("/simulados");
    router.prefetch("/");

    function validateGabarito() {
      if (_hasHydrated && (!answers || answers.length === 0)) {
        startTransition(() => {
          router.push("/simulados");
        });
      }
    }

    validateGabarito();
  }, [_hasHydrated, answers])

  if (!_hasHydrated || isSaving || (_hasHydrated && (!answers || answers.length === 0))) return <Loading2 loading overlay />;

  return (
    <main className="content-wrapper statistics-wrapper">
      <div className="section">
        <h1 className="title">Gabarito da prova</h1>
        <p className="exam">{test?.estados_uf} {test?.instituicoes_nome}</p>
        <p className="year">Prova de {test?.provas_ano}</p>

        <CardSimulado
          totalQuestions={totalQuestions}
          answeredQuestions={answeredQuestions}
          correctAnswers={correctAnswers}
          incorrectAnswers={incorrectAnswers}
          unansweredQuestions={unansweredQuestions}
          correctPercentageOverRespondedQuestions={correctPercentageOverRespondedQuestions}
        />

        <SimpleLine name="Tempo gasto na prova" value={elapsedTime} />

        <CardList
          title="Porcentagem de acerto por área:"
          items={accuracyByArea.map(item => ({
            name: item.area,
            value: `${item.accuracy.toString()}%`
          }))}
          className="accuracy"
        />
      </div>

      <div className="section">
        <ShadowBtn className="view-wrong" onClick={toggleDialog}>Ver questões erradas</ShadowBtn>
        <SwitchBtn className="save-exit" onClick={() => saveExam(router)}>Sair e salvar</SwitchBtn>
        <QuestoesErradas open={isOpen} onClose={toggleDialog} answers={answers?.filter(answer => answer.answer !== answer.correct).map(answer => ({ id: answer.id, ordem: answer.ordem }))} />
      </div>
    </main>
  )
}