import { ReactNode } from "react";
import Header from "../header/ComoEstudar";
import Footer from "../footer/Footer";
import styles from "./Structure.module.css";

type Props = {
  children: ReactNode;
};

export default function ComoEstudar({children}: Props) {
  return (
    <>
    <Header />
    <main className={styles.content}>{children}</main>
    <Footer />
  </>
  )
}