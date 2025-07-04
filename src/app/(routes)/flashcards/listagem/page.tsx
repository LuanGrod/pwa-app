"use client";

import FlashcardStructure from "@/component/structure/Flashcard";
import { useListing } from "@/hook/request/useListing";
import Loading2 from "@global/overlay/popup/dialog/Loading2";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Viewing } from "@/component/viewing/Viewing";
import Flashcard from "@/component/Flashcard";
import { useToggle } from "@/hook/useToggle";
import { Flashcard as FlashcardType } from "@/type/Entities";

type Props = {};

export default function page({}: Props) {
  const filters = useSearchParams().get("filters") || "";
  const { status, toggle } = useToggle();
  const [current, setCurrent] = useState<FlashcardType | null>(null);
  const [index, setIndex] = useState(0);

  const { data, setData, loading, error } = useListing<FlashcardType>({
    entity: "flashcards",
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
    <FlashcardStructure
      title={current ? `${current?.areas_nome}: ${current?.temas_nome}` : ""}
      status={status}
      toggle={toggle}
      handleNext={handleNext}
      flashcardId={current ? current.flashcards_id : ""}
    >
      <Viewing
        data={current}
        loading={loading}
        error={error}
        loadingComponent={<Loading2 loading />}
        renderItem={(item: FlashcardType) => <Flashcard data={item} setData={setData} showingAnswer={status} />}
      />
    </FlashcardStructure>
  );
}
