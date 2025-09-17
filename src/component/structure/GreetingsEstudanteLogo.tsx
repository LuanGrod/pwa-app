import { ReactNode } from "react";
import Header from "@/component/header/GreetingsEstudanteLogo";
import { unstable_ViewTransition as ViewTransition } from "react";
import Footer from "@/component/footer/Footer";

type Props = {
  children: ReactNode;
  customClass?: string;
};

export default function GreetingsEstudanteLogoStructure({ children, customClass = "" }: Props) {
  return (
    <>
      <ViewTransition default="handle">
        <Header />
        <main className={`content-wrapper ${customClass}`}>{children}</main>
      </ViewTransition>
      <Footer />
    </>
  );
}
