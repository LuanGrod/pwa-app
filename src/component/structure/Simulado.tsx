import { ReactNode } from "react";
import Header from "@global/component/header/Simulado";
import Footer from "@/component/footer/Simulado";
import { unstable_ViewTransition as ViewTransition } from "react";

type Props = {
  children: ReactNode;
};

export default function Simulado({ children }: Props) {

  return (
    <>
      <ViewTransition default="handle">
        <Header />
        <main className="content-wrapper questoes">{children}</main>
      </ViewTransition>
      <Footer />
    </>
  );
}
