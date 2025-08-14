"use client";

import { useListing } from "@global/hook/request/useListing";
import { useSearchParams } from "next/navigation";
import Flashcard from "@/component/atomic/Flashcard";
import { Flashcard as FlashcardType } from "@/type/Entities";
import { useEffect, useState } from "react";
import useFlashcards from "@/store/FlashcardStore";
import Structure from "@/component/structure/Flashcard";
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";
import { ErrorMessage } from "@global/component/listing/message/error";
import { EmptyMessage } from "@global/component/listing/message/empty";


type Props = {};

export default function page({ }: Props) {
  const filters = useSearchParams().get("filters") || "";

  const [isFlipped, setIsFlipped] = useState(false);
  const [isSlidding, setIsSlidding] = useState(false);
  const [title, setTitle] = useState("");

  const { setDeck, getCurrent, getNext } = useFlashcards();

  const { data, loading, error } = useListing<FlashcardType>({
    entity: "flashcards",
    params: { filters: filters },
    needsAuthorization: true,
  });

  useEffect(() => {
    if (data.rows && data.rows.length > 0) {
      setDeck(data.rows);
      setTitle(`${data.rows[0].areas_nome}: ${data.rows[0].temas_nome}`);
    }
  }, [data])

  const currentFlashcard = getCurrent();
  const nextFlashcard = getNext();

  if (loading) return <Loading2 loading />
  if (error) return <ErrorMessage error={error} />
  if (!data.rows || data.rows.length === 0) return <EmptyMessage />

  return (
    <>
      {
        currentFlashcard && (
          <Structure title={title} setTitle={setTitle} isFlipped={isFlipped} setIsFlipped={setIsFlipped} isSlidding={isSlidding} setIsSlidding={setIsSlidding}>
            <Flashcard
              data={currentFlashcard}
              isFlipped={isFlipped}
              onFlip={!setIsSlidding ? () => setIsFlipped(!isFlipped) : () => { }}
            />
            {
              nextFlashcard && isSlidding && (
                <Flashcard
                  data={nextFlashcard}
                  isFlipped={false}
                  onFlip={() => { }}
                  customClass="card-enter"
                />
              )
            }
          </Structure>
        )
      }
    </>
  );
}
