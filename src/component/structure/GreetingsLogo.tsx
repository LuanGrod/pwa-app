import { ReactNode } from "react";
import Header from "@global/header/GreetingsLogo";
import { unstable_ViewTransition as ViewTransition } from "react";
import Footer from "@component/footer/Footer";

type Props = {
  children: ReactNode;
};

export default function GreetingsLogoStructure({ children }: Props) {
  return (
    <>
      <ViewTransition default="handle">
        <Header />
        <main className="content-wrapper header footer">{children}</main>
      </ViewTransition>
      <Footer />
    </>
  );
}
