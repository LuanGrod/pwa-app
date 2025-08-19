import Pie from "@global/component/chart/Pie";

type Props = {
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unansweredQuestions: number;
  correctPercentageOverRespondedQuestions: number;
}

export default function CardSimulado({
  totalQuestions,
  answeredQuestions,
  correctAnswers,
  incorrectAnswers,
  unansweredQuestions,
  correctPercentageOverRespondedQuestions
}: Props) {
  return (
    <div className="stat-card general">
      <div className="card-item-name">Número de questões da prova: {totalQuestions}</div>
      <div className="card-item-name">Número de questões respondidas: {answeredQuestions}</div>
      <div className="card-item-name right">Número de acertos: {correctAnswers}</div>
      <div className="card-item-name wrong">Número de erros: {incorrectAnswers}</div>

      <div className="card-chart">
        <Pie
          data={[
            { title: 'Acertos', value: correctAnswers, color: '#33FF66' },
            { title: 'Erros', value: incorrectAnswers, color: '#FF1AC6' },
            { title: 'Não Respondidas', value: unansweredQuestions, color: '#FFFFFF' },
          ]}
          title={`${correctPercentageOverRespondedQuestions}% de acerto`}
          subtitle="sobre as questões respondidas"
        />
      </div>
    </div>
  )
}