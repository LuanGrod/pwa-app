import { ReactNode } from "react";
import Header from "@/component/header/Questao";
import Footer from "../footer/Questao";
import { unstable_ViewTransition as ViewTransition } from "react";

type Props = {
  children: ReactNode;
  href?: string;
};

export default function Questao({ children, href }: Props) {

  return (
    <>
      <ViewTransition default="handle">
        <Header href={href} />
        <main className="content-wrapper questoes">{children}</main>
      </ViewTransition>
      <Footer />
    </>
  );
}
