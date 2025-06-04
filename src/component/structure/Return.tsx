import { ReactNode } from "react";
import Header from "../../../global/header/Return";
import styles from "./Structure.module.css";

type Props = {
  children: ReactNode;
};

export default function ReturnStructure({ children }: Props) {
  return (
    <>
      <Header />
      <main className={styles.content}>{children}</main>
    </>
  );
}
