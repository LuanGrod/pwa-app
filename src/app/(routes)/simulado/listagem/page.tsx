"use client";

import Loading2 from "@global/component/overlay/popup/dialog/Loading2";
import { useRouter, useSearchParams } from "next/navigation";
import { Viewing } from "@global/component/viewing/Viewing";
import { Questao as QuestaoType } from "@/type/Entities";
import Questao from "@/component/atomic/Questao";
import useQuestoes from "@/store/QuestaoStore";
import { startTransition, useEffect } from "react";
import { useListing } from "@global/hook/request/useListing";
import Structure from "@/component/structure/Simulado";
import { FilterParser } from "@global/filter/FilterParser";

type Props = {};

export default function page({ }: Props) {
  const filters = useSearchParams().get("filters") || "";
  const router = useRouter();
  const provaId = FilterParser.extractFilterValue(filters, "id_prova", "questoes");

  const {
    getCurrent,
    setPack,
    _hasHydrated,
    testFinished
  } = useQuestoes();

  useEffect(() => {
    if (testFinished) {
      startTransition(() => {
        router.push("/simulado");
      });
    }
  }, [])

  const { data, loading, error } = useListing<QuestaoType>({
    entity: "questoes",
    params: { filters: filters },
    needsAuthorization: true,
  });

  useEffect(() => {
    if (data.rows && data.rows.length > 0) {
      setPack(data.rows);
    } else {
      setPack([]);
    }
  }, [data, filters, provaId])

  return (
    <Structure>
      <Viewing
        data={getCurrent()}
        loading={loading && !_hasHydrated}
        error={error}
        loadingComponent={<Loading2 loading />}
        renderItem={(item: QuestaoType) => <Questao data={item} />}
      />
    </Structure>
  );
}
