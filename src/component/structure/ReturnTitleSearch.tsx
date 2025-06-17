import { ReactNode, unstable_ViewTransition as ViewTransition } from "react";
import Footer from "@component/footer/Footer";
import Header from "@global/header/ReturnTitleSearch";

type Props = {
  children: ReactNode;
  title: string;
  handleSearch?: (e?: unknown) => unknown;
};

export default function ReturnTitleSearchStructure({ children, title, handleSearch }: Props) {
  const handleSearchFunction =
    handleSearch ||
    async function (e: any) {
      "use server";
      console.log("No search function provided");
    };

  return (
    <>
      <ViewTransition default="handle">
        <Header title={title} handleSearch={handleSearchFunction} />
        <main className="content-wrapper header footer">{children}</main>
      </ViewTransition>
      <Footer />
    </>
  );
}
