"use client";

import useFlashcards from "@/store/FlashcardStore";
import { useGetRow } from "@global/hook/request/useGetRow";
import { useEffect, useState } from "react";
import { Flashcard as FlashcardType } from "@/type/Entities";
import FlashcardStructure from "@/component/structure/Flashcard";
import Flashcard from "@/component/atomic/Flashcard";
import { Viewing } from "@global/component/viewing/Viewing";
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";

type Props = {
  id: string;
}

export default function FlashcardItem({ id }: Props) {

  const { setDeck, getCurrent } = useFlashcards();

  const [isFlipped, setIsFlipped] = useState(false);

  const { data, loading, error } = useGetRow<FlashcardType>({
    entity: "flashcards",
    id: id,
    needsAuthorization: true,
  });

  const currentTitle = getCurrent() ? `${getCurrent()?.areas_nome}: ${getCurrent()?.temas_nome}` : "";

  useEffect(() => {
    if (data) {
      setDeck([data]);
    }
  }, [data])

  return (
    <FlashcardStructure title={currentTitle} isFlipped={isFlipped} setIsFlipped={setIsFlipped} isSlidding={false} setIsSlidding={() => { }}>
      <Viewing
        data={getCurrent()}
        loading={loading}
        error={error}
        loadingComponent={<Loading2 loading />}
        renderItem={(item: FlashcardType) =>
          <Flashcard
            data={item}
            isFlipped={isFlipped}
            onFlip={() => setIsFlipped(!isFlipped)}
          />}
      />
    </FlashcardStructure>
  )
}