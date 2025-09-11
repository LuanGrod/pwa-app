"use client";

import SessionEndStatistics from "@/component/atomic/SessionEndStatistics";
import { useGetRow } from "@global/hook/request/useGetRow";
import { Estatisticas as EstatisticasType } from "@/type/Entities";
import { Viewing } from "@global/component/viewing/Viewing";
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";
import useQuestoes from "@/store/QuestaoStore";

type Props = {
}

export default function page({ }: Props) {
  const { answers } = useQuestoes();

  const { data, loading, error } = useGetRow<EstatisticasType>({
    entity: "estatisticas",
    needsAuthorization: true,
  });

  const rightAnswers = answers?.filter((answer) => answer.confirmed && answer.answer === answer.correct).length || 0;
  const wrongAnswers = answers?.filter((answer) => answer.confirmed && answer.answer && answer.answer !== answer.correct).length || 0;

  return (
    <Viewing
      data={data}
      error={error}
      loading={loading}
      loadingComponent={<Loading2 loading />}
      renderItem={(item) => (
        <SessionEndStatistics
          entity="questões"
          rightAnswers={rightAnswers}
          wrongAnswers={wrongAnswers}
          chartLabel="nas questões respondidas na sessão"
          cardTitle1="Número de questões feitas na sessão:"
          cardTitle2="Número total de questões já feitas:"
          count={item.general.questions.total}
          accuracyByArea={item.accuracyByArea || []}
          href="/questoes"
        />
      )}
    />
  )
}