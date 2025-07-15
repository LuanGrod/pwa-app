import { ReactNode } from "react";
import Header from "@global/component/header/Questao";
import Footer from "../footer/Questao";

type Props = {
  children: ReactNode;
};

export default function Questao({ children }: Props) {

  return (
    <>
      <Header />
      <main className="content-wrapper questoes">{children}</main>
      <Footer />
    </>
  );
}
