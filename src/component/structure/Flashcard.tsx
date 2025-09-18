import { ReactNode } from "react";
import Header from "@/component/header/Flashcard";
import Footer from "@/component/footer/Flashcard";
import { unstable_ViewTransition as ViewTransition } from "react";

type Props = {
  children: ReactNode;
  title: string;
  isFlipped: boolean;
  isSlidding: boolean;
  setTitle: (value: string) => void;
  setIsFlipped: (value: boolean) => void;
  setIsSlidding: (value: boolean) => void;
  href?: string;
};

export default function Flashcard({ children, title, isFlipped, setIsFlipped, isSlidding, setIsSlidding, setTitle, href }: Props) {
  return (
    <>
      <ViewTransition default="handle">
        <Header title={title} href={href} />
        <main className="content-wrapper flashcards">{children}</main>
      </ViewTransition>
      <Footer isFlipped={isFlipped} setIsFlipped={setIsFlipped} isSlidding={isSlidding} setIsSlidding={setIsSlidding} setTitle={setTitle} />
    </>
  );
}
