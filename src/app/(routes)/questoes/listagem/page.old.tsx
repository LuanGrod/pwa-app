"use client";

import QuestaoStructure from "@/component/structure/Questao";
import { useListing } from "@/hook/request/useListing";
import Loading2 from "@global/overlay/popup/dialog/Loading2";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Viewing } from "@/component/viewing/Viewing";
import { Questao as QuestaoType } from "@/type/Entities";
import Questao from "@/component/Questao";
import { useToggle } from "@/hook/useToggle";

type Props = {};

export default function page({}: Props) {
  const filters = useSearchParams().get("filters") || "";
  const [current, setCurrent] = useState<QuestaoType | null>(null);
  const { status, toggle } = useToggle();
  const [index, setIndex] = useState(0);

  const { data, setData, loading, error } = useListing<QuestaoType>({
    entity: "questoes",
    params: { filters: filters },
    needsAuthorization: true,
  });

  useEffect(() => {
    if (data && data.rows.length > 0) {
      setCurrent(data.rows[index]);
    } else {
      setCurrent(null);
    }
  }, [data, index]);

  const handleNext = () => {
    if (data && data.rows.length > 0 && index < data.rows.length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
    } else {
      alert("mostrar tela de estatisticas");
    }
  };

  return (
    <QuestaoStructure
      handleNext={handleNext}
      questaoId={current ? current.questoes_id : ""}
      elementsClassNames={["enunciado", "area-tema", "ano", "conteudo"]}
      data={current!}
      setData={setData}
    >
      <Viewing
        data={current}
        loading={loading}
        error={error}
        loadingComponent={<Loading2 loading />}
        renderItem={(item: QuestaoType) => <Questao data={item} setData={setData} showingAnswer={status} />}
      />
    </QuestaoStructure>
  );
}
