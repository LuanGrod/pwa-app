"use client";

import useFlashcards from "@/store/FlashcardStore";
import { useGetRow } from "@global/hook/request/useGetRow";
import { useEffect } from "react";
import { Flashcard as FlashcardType } from "@/type/Entities";
import FlashcardStructure from "@/component/structure/Flashcard";
import Flashcard from "@/component/atomic/Flashcard";
import { Viewing } from "@global/component/viewing/Viewing";
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";

type Props = {
  id: string;
}

export default function FlashcardItem({ id }: Props) {

  const { setFlashcardsList, getCurrentFlashcard } = useFlashcards();

  const { data, loading, error } = useGetRow<FlashcardType>({
    entity: "flashcards",
    id: id,
    needsAuthorization: true,
  });

  const currentTitle = getCurrentFlashcard() ? `${getCurrentFlashcard()?.areas_nome}: ${getCurrentFlashcard()?.temas_nome}` : "";

  useEffect(() => {
    if (data) {
      setFlashcardsList([data]);
    }
  }, [data])

  return (
    <FlashcardStructure title={currentTitle}>
      <Viewing
        data={getCurrentFlashcard()}
        loading={loading}
        error={error}
        loadingComponent={<Loading2 loading />}
        renderItem={(item: FlashcardType) => <Flashcard data={item} />}
      />
    </FlashcardStructure>
  )
}