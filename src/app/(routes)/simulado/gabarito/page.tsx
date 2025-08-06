"use client";

import useQuestoes from "@/store/QuestaoStore";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { PieChart } from "react-minimal-pie-chart";

type Props = {}

export default function page({ }: Props) {
  const { answers, test, getFormattedElapsedTime } = useQuestoes();
  const router = useRouter()

  // verifica se as respostas ja foram confirmadas, se nao, redireciona para o /simulado
  if (answers && answers.length > 0 && !answers.some(answer => answer.confirmed)) {
    startTransition(() => {
      router.push("/simulado");
    });
    return null;
  }

  const totalQuestions = answers?.length || 0;
  const correctAnswers = 60;
  const incorrectAnswers = 22;
  const unansweredQuestions = 20;
  // const correctAnswers = answers?.filter(answer => answer.answer === answer.correct).length || 0;
  // const incorrectAnswers = answers?.filter(answer => answer.answer && answer.answer !== answer.correct).length || 0;
  // const unansweredQuestions = totalQuestions - correctAnswers - incorrectAnswers;

  const elapsedTime = getFormattedElapsedTime("detailed");

  return (
    <div>
      <h1>Gabarito da prova</h1>
      <h2>{test?.estados_uf} {test?.instituicoes_nome}</h2>
      <h3>Prova de {test?.provas_ano}</h3>

      <div>
        <p>Número de questões da prova: {answers?.length}</p>
        <p>Número de questões respondidas: {answers?.filter(answer => answer.answer).length}</p>
        <p>Número de acertos: {correctAnswers}</p>
        <p>Número de erros: {incorrectAnswers}</p>
        <p><strong>Tempo gasto na prova: {elapsedTime}</strong></p>
        <PieChart
          data={[
            { title: 'Acertos', value: correctAnswers, color: '#33FF66' },
            { title: 'Erros', value: incorrectAnswers, color: '#FF1AC6' },
            { title: 'Não Respondidas', value: unansweredQuestions, color: '#FFFFFF' },
          ]}
          lineWidth={13}
          startAngle={180}
          animate
          segmentsStyle={{
            filter: 'drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.5))',
          }}
          viewBoxSize={[152, 152]}
          center={[76, 76]}
        />
      </div>
    </div>
  )
}