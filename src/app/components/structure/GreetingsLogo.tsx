import { ReactNode } from "react";
import Footer from "../footer/Footer";
import Header from "../../../../global/header/GreetingsLogo";
import styles from "./Structure.module.css";

type Props = {
  children: ReactNode;
};

export default function GreetingsLogoStructure({ children }: Props) {
  return (
    <>
      <Header />
      <main className={styles.content}>{children}</main>
      <Footer />
    </>
  );
}
