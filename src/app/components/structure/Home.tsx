import { ReactNode } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Home";
import styles from "./Structure.module.css";

type Props = {
  children: ReactNode;
};

export default function HomeStructure({ children }: Props) {
  return (
    <>
      <Header />
      <main className={styles.content}>{children}</main>
      <Footer />
    </>
  );
}
