import { ReactNode } from "react";
import Header from "../global/header/ReturnLogo";
import Footer from "../footer/Footer";
import styles from "./Structure.module.css";

type Props = {
  children: ReactNode;
};

export default function ReturnLogo({children}: Props) {
  return (
    <>
    <Header />
    <main className={styles.content}>{children}</main>
    <Footer />
  </>
  )
}