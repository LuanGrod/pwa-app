import { ReactNode } from "react";
import Footer from "../footer/Footer";
import Header from "../../../../global/header/ReturnTitleSearch";
import styles from "./Structure.module.css";

type Props = {
  children: ReactNode;
  title: string;
  handleSearch: (e?: unknown) => unknown;
};

export default function ReturnTitleSearchStructure({ children, title, handleSearch }: Props) {
  return (
    <>
      <Header title={title} handleSearch={handleSearch} />
      <main className={styles.content}>{children}</main>
      <Footer />
    </>
  );
}
