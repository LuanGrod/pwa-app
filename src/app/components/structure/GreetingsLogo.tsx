import { ReactNode } from "react";
import Footer from "../footer/Footer";
import Header from "../../../../global/header/GreetingsLogo";
import styles from "./Structure.module.css";
import { unstable_ViewTransition as ViewTransition } from "react";

type Props = {
  children: ReactNode;
};

export default function GreetingsLogoStructure({ children }: Props) {
  return (
    <>
      <ViewTransition default="handle">
      {/* <div style={{ display: "flex", height: "100vh", viewTransitionName: "handle" }}> */}
        <Header />
        <main className={styles.content}>{children}</main>
      </ViewTransition>
      <Footer />
    </>
  );
}
