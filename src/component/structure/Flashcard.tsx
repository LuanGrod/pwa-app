import { ReactNode } from "react";
import Header from "@global/header/Flashcard";
import FlashcardFooter from "../footer/FlashcardFooter";

type Props = {
  children: ReactNode;
  title: string;
  status: boolean;
  toggle: () => void;
  flashcardId: string;
  handleNext: () => void;
};

export default function Flashcard({ children, title, status, toggle, flashcardId, handleNext }: Props) {
  return (
    <>
      <Header title={title} />
      <main className="content-wrapper flashcards">{children}</main>
      <FlashcardFooter showAnswer={status} toggleAnswer={toggle} flashcardId={flashcardId} handleNext={handleNext} />
    </>
  );
}
