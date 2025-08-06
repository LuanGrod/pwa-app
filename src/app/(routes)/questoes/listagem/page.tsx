"use client";

import Loading2 from "@global/component/overlay/popup/dialog/Loading2";
import { useSearchParams } from "next/navigation";
import { Viewing } from "@global/component/viewing/Viewing";
import { Questao as QuestaoType } from "@/type/Entities";
import Questao from "@/component/atomic/Questao";
import useQuestoes from "@/store/QuestaoStore";
import { useEffect } from "react";
import RespostaQuestao from "@/component/overlay/drawer/RespostaQuestao";
import AlertaQuestao from "@/component/overlay/drawer/AlertaQuestao";
import { useListing } from "@global/hook/request/useListing";
import QuestaoStructure from "@/component/structure/Questao";

type Props = {};

export default function page({ }: Props) {
  const filters = useSearchParams().get("filters") || "";

  const {
    getCurrent,
    isShowingAnswer,
    toggleIsShowingAnswer,
    setPack,
    isShowingAlert,
  } = useQuestoes();

  const { data, loading, error } = useListing<QuestaoType>({
    entity: "questoes",
    params: { filters: filters },
    needsAuthorization: true,
  });

  useEffect(() => {
    if (data.rows && data.rows.length > 0) {
      setPack(data.rows);
    }
  }, [data])

  return (
    <QuestaoStructure>
      <Viewing
        data={getCurrent()}
        loading={loading}
        error={error}
        loadingComponent={<Loading2 loading />}
        renderItem={(item: QuestaoType) => <Questao data={item} />}
      />
      <AlertaQuestao open={isShowingAlert} />
      <RespostaQuestao data={getCurrent()} open={isShowingAnswer} onClose={toggleIsShowingAnswer} />
    </QuestaoStructure>
  );
}
