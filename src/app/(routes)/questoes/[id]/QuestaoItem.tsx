"use client";

import { useGetRow } from "@global/hook/request/useGetRow";
import { useEffect } from "react";
import { Questao as QuestaoType } from "@/type/Entities";
import { Viewing } from "@global/component/viewing/Viewing";
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";
import useQuestoes from "@/store/QuestaoStore";
import Questao from "@/component/atomic/Questao";
import AlertaQuestao from "@/component/overlay/drawer/AlertaQuestao";
import RespostaQuestao from "@/component/overlay/drawer/RespostaQuestao";
import QuestaoStructure from "@/component/structure/Questao";

type Props = {
  id: string;
}

export default function QuestaoItem({ id }: Props) {

  const {
    getCurrentQuestao,
    isShowingAnswer,
    toggleIsShowingAnswer,
    setQuestoesList,
    isShowingAlert,
  } = useQuestoes();

  const { data, loading, error } = useGetRow<QuestaoType>({
    entity: "questoes",
    id: id,
    needsAuthorization: true,
  });

  useEffect(() => {
    if (data) {
      setQuestoesList([data]);
    } else {
      setQuestoesList([]);
    }
  }, [data])

  return (
    <QuestaoStructure >
      <Viewing
        data={getCurrentQuestao()}
        loading={loading}
        error={error}
        loadingComponent={<Loading2 loading />}
        renderItem={(item: QuestaoType) => <Questao data={item} />}
      />
      <AlertaQuestao open={isShowingAlert} />
      <RespostaQuestao data={getCurrentQuestao()} open={isShowingAnswer} onClose={toggleIsShowingAnswer} />
    </QuestaoStructure>
  )
}