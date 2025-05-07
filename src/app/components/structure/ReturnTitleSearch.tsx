import { ReactNode } from "react";
import Footer from "../footer/Footer";
import Header from "../header/ReturnTitleSearch";
import styles from "./Structure.module.css";

type Props = {
  children: ReactNode;
  title: string;
};

export default function ReturnTitleSearchStructure({ children, title }: Props) {
  return (
    <>
      <Header title={title} />
      <main className={styles.content}>{children}</main>
      <Footer />
    </>
  );
}
