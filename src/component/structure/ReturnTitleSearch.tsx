import { ReactNode, unstable_ViewTransition as ViewTransition } from "react";
import Footer from "@/component/footer/Footer";
import Header from "@global/component/header/ReturnTitleSearch";

type Props = {
  children: ReactNode;
  title: string;
  handleSearch?: () => void;
  href?: string;
};

export default function ReturnTitleSearchStructure({ children, title, handleSearch, href }: Props) {
  return (
    <>
      <ViewTransition default="handle">
        <Header title={title} handleSearch={handleSearch} href={href} />
        <main className="content-wrapper">{children}</main>
      </ViewTransition>
      <Footer />
    </>
  );
}
