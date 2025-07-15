import { ReactNode } from "react";
import Header from "@global/component/header/Flashcard";
import Footer from "../footer/Flashcard";

type Props = {
  children: ReactNode;
  title: string;
};

export default function Flashcard({ children, title }: Props) {
  return (
    <>
      <Header title={title} />
      <main className="content-wrapper flashcards">{children}</main>
      <Footer />
    </>
  );
}
