"use client";

import { useSearchParams } from "next/navigation";
import Flashcard from "@/component/flashcard/Flashcard";
import { Flashcard as FlashcardType } from "@/type/Entities";
import { useEffect, useState } from "react";
import useFlashcards from "@/store/FlashcardStore";
import Structure from "@/component/structure/Flashcard";
import { useGetRow } from "@global/hook/request/useGetRow";
import { AsyncRenderer } from "@global/component/data/AsyncRenderer";
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";

type Props = {};

type CustomFlashcard = {
  rows: {
    flashcard: FlashcardType;
    sessao_id: number;
    temas: number[];
  };
};

export default function page({ }: Props) {
  const filters = useSearchParams().get("filters") || "";

  const [isFlipped, setIsFlipped] = useState(false);
  const [isSlidding, setIsSlidding] = useState(false);
  const [title, setTitle] = useState("");

  const { initializeSession, current, next } = useFlashcards();

  const { data, loading, error } = useGetRow<CustomFlashcard>({
    entity: "flashcards",
    params: { filters: filters },
    needsAuthorization: true,
    needsId: false,
  });

  useEffect(() => {
    if (data) {
      initializeSession({
        temas: data.rows.temas,
        sessao_id: data.rows.sessao_id,
        flashcard: data.rows.flashcard
      });
    }
  }, [data]);

  useEffect(() => {
    setTitle(current ? `${current.areas_nome}: ${current.temas_nome}` : "");
  }, [current])

  return (
    <AsyncRenderer
      data={current}
      error={error}
      loadingComponent={<Loading2 loading overlay />}
      loading={loading}
      renderItem={(item) => (
        <>
          {item && (
            <Structure
              title={title}
              isFlipped={isFlipped}
              isSlidding={isSlidding}
              setTitle={setTitle}
              setIsFlipped={setIsFlipped}
              setIsSlidding={setIsSlidding}
            >
              <Flashcard
                data={item}
                isFlipped={isFlipped}
                onFlip={!setIsSlidding ? () => setIsFlipped(!isFlipped) : () => { }}
              />
              {next && isSlidding && (
                <Flashcard
                  data={next}
                  isFlipped={false}
                  onFlip={() => { }}
                  className="card-enter"
                />
              )}
            </Structure>
          )}
        </>
      )}
    />
  );
}
