"use client";

import { useSearchParams } from "next/navigation";
import Flashcard from "@/component/atomic/Flashcard";
import { Flashcard as FlashcardType } from "@/type/Entities";
import { useEffect, useState } from "react";
import useFlashcards from "@/store/FlashcardStore";
import Structure from "@/component/structure/Flashcard";
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";
import { ErrorMessage } from "@global/component/listing/message/error";
import { EmptyMessage } from "@global/component/listing/message/empty";
import { useGetRow } from "@global/hook/request/useGetRow";
import { AnimatePresence, motion } from "motion/react";
import { Viewing } from "@global/component/viewing/Viewing";

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
    <Viewing
      data={current}
      error={error}
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
                  customClass="card-enter"
                />
              )}
            </Structure>
          )}
        </>
      )}
    >
    </Viewing>
  );
}
