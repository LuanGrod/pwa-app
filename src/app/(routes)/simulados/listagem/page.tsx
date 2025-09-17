"use client";

import Loading2 from "@global/component/overlay/popup/dialog/Loading2";
import { useRouter, useSearchParams } from "next/navigation";
import { AsyncRenderer } from "@global/component/data/AsyncRenderer";
import { Questao as QuestaoType } from "@/type/Entities";
import Questao from "@/component/questao/Questao";
import useQuestoes from "@/store/QuestaoStore";
import { startTransition, useEffect } from "react";
import { useListing } from "@global/hook/request/useListing";
import Structure from "@/component/structure/Simulado";
import { FilterParser } from "@global/filter/FilterParser";
import AlertaQuestao from "@/component/overlay/drawer/AlertaQuestao";
import RespostaQuestao from "@/component/overlay/drawer/RespostaQuestao";

type Props = {};

export default function page({ }: Props) {
  const filters = useSearchParams().get("filters") || "";
  const router = useRouter();
  const provaId = FilterParser.extractFilterValue(filters, "id_prova", "questoes");

  const {
    getCurrent,
    setPack,
    _hasHydrated,
    examEndTime
  } = useQuestoes();

  useEffect(() => {
    if (!!examEndTime) {
      startTransition(() => {
        router.push("/simulados");
      });
    }
  }, [])

  const { data, loading, error } = useListing<QuestaoType>({
    entity: "questoes2",
    params: { filters: filters },
    needsAuthorization: true,
  });

  useEffect(() => {
    if (data.rows && data.rows.length > 0) {
      setPack(data.rows);
    }
  }, [data, provaId])

  return (
    <AsyncRenderer
      data={getCurrent()}
      loading={loading}
      error={error}
      loadingComponent={<Loading2 loading overlay />}
      renderItem={(item: QuestaoType) => (
        <Structure>
          <Questao data={item} />
        </Structure>
      )}
    />
  );
}
