import { ReactNode, unstable_ViewTransition as ViewTransition } from "react";
import Footer from "@/component/footer/Footer";
import Header from "@global/component/header/ReturnTitle";

type Props = {
  children: ReactNode;
  title: string;
  className?: string;
};

export default function ReturnTitleStructure({ children, title, className }: Props) {
  return (
    <>
      <ViewTransition default="handle">
        <Header title={title} />
        <main className={`content-wrapper ${className}`}>{children}</main>
      </ViewTransition>
      <Footer />
    </>
  );
}
