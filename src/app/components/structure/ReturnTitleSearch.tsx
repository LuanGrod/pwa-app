import { ReactNode } from "react";
import Footer from "../footer/Footer";
import Header from "../../../../global/header/ReturnTitleSearch";
import styles from "./Structure.module.css";
import { unstable_ViewTransition as ViewTransition } from "react";

type Props = {
  children: ReactNode;
  title: string;
  handleSearch: (e?: unknown) => unknown;
};

export default function ReturnTitleSearchStructure({ children, title, handleSearch }: Props) {
  return (
    <>
       <ViewTransition default="handle">
      {/* <div style={{ display: "flex", height: "100vh", viewTransitionName: "handle" }}> */}
        <Header title={title} handleSearch={handleSearch} />
        <main className={styles.content}>{children}</main>
       </ViewTransition>
      <Footer />
    </>
  );
}
