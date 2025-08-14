"use client";

import useFlashcards from "@/store/FlashcardStore";
import { useGetRow } from "@global/hook/request/useGetRow";
import { useEffect, useState } from "react";
import { Flashcard as FlashcardType } from "@/type/Entities";
import Structure from "@/component/structure/Flashcard";
import Flashcard from "@/component/atomic/Flashcard";
import { Viewing } from "@global/component/viewing/Viewing";
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";

type Props = {
  id: string;
}

export default function FlashcardItem({ id }: Props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [title, setTitle] = useState("");

  const { setDeck, getCurrent } = useFlashcards();

  const { data, loading, error } = useGetRow<FlashcardType>({
    entity: "flashcards",
    id: id,
    needsAuthorization: true,
  });

  useEffect(() => {
    if (data) {
      setDeck([data]);
      setTitle(`${data.areas_nome}: ${data.temas_nome}`);
    }
  }, [data])

  return (
    <Structure title={title} setTitle={setTitle} isFlipped={isFlipped} setIsFlipped={setIsFlipped} isSlidding={false} setIsSlidding={() => { }}>
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
    </Structure>
  )
}