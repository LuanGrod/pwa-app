import { ReactNode } from "react";
import Header from "@global/component/header/Simulado";
import Footer from "@/component/footer/Simulado";

type Props = {
  children: ReactNode;
};

export default function Simulado({ children }: Props) {

  return (
    <>
      <Header />
      <main className="content-wrapper questoes">{children}</main>
      <Footer />
    </>
  );
}
