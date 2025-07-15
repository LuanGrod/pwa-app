import { ReactNode, unstable_ViewTransition as ViewTransition } from "react";
import Header from "@global/component/header/ReturnLogo";
import Footer from "@/component/footer/Footer";

type Props = {
  children: ReactNode;
};

export default function ReturnLogo({ children }: Props) {
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
