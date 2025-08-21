"use client";

import SessionEndStatistics from "@/component/atomic/SessionEndStatistics";
import useFlashcards from "@/store/FlashcardStore";
import { useGetRow } from "@global/hook/request/useGetRow";
import { Estatisticas as EstatisticasType } from "@/type/Entities";
import { Viewing } from "@global/component/viewing/Viewing";
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";

type Props = {
}

export default function page({ }: Props) {
  const { answers } = useFlashcards();

  const { data, setData, loading, error } = useGetRow<EstatisticasType>({
    entity: "estatisticas",
    needsAuthorization: true,
  });

  const rightAnswers = answers.filter((answer) => answer.answer !== "Erro").length;
  const wrongAnswers = answers.filter((answer) => answer.answer === "Erro").length;

  return (
    <Viewing
      data={data}
      error={error}
      loading={loading}
      loadingComponent={<Loading2 loading/>}
      renderItem={(item) => (
        <SessionEndStatistics
          entity="flashcards"
          rightAnswers={rightAnswers}
          wrongAnswers={wrongAnswers}
          chartLabel="nos flashcards respondidos na sessão"
          cardTitle1="Número de flashcards feitos na sessão:"
          cardTitle2="Número total de flashcards já feitos:"
          count={item.general.flashcards.total}
          accuracyByArea={item.accuracyByArea || []}
          href="/flashcards"
        />
      )}
    />
  )
}