import { ReactNode } from "react";
import Footer from "../footer/Footer";
import Header from "../../../global/header/ReturnTitle";
import styles from "./Structure.module.css";

type Props = {
  children: ReactNode;
  title: string;
};

export default function ReturnTitleStructure({ children, title }: Props) {
  return (
    <>
      <Header title={title} />
      <main className={styles.content}>{children}</main>
      <Footer />
    </>
  );
}
