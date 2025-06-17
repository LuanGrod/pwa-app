import { ReactNode, unstable_ViewTransition as ViewTransition } from "react";
import Footer from "@component/footer/Footer";
import Header from "@global/header/ReturnTitle";

type Props = {
  children: ReactNode;
  title: string;
};

export default function ReturnTitleStructure({ children, title }: Props) {
  return (
    <>
      <ViewTransition default="handle">
        <Header title={title} />
        <main className="content-wrapper header footer">{children}</main>
      </ViewTransition>
      <Footer />
    </>
  );
}
