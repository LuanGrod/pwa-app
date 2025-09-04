import { ReactNode } from "react";
import Header from "@global/component/header/Flashcard";
import Footer from "../footer/Flashcard";

type Props = {
  children: ReactNode;
  title: string;
  isFlipped: boolean;
  isSlidding: boolean;
  setTitle: (value: string) => void;
  setIsFlipped: (value: boolean) => void;
  setIsSlidding: (value: boolean) => void;
};

export default function Flashcard({ children, title, isFlipped, setIsFlipped, isSlidding, setIsSlidding, setTitle }: Props) {
  return (
    <>
      <Header title={title} />
      <main className="content-wrapper flashcards">{children}</main>
      <Footer isFlipped={isFlipped} setIsFlipped={setIsFlipped} isSlidding={isSlidding} setIsSlidding={setIsSlidding} setTitle={setTitle} />
    </>
  );
}
