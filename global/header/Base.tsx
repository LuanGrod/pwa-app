import { ReactNode } from "react";
import styles from "./Base.module.css";

type Props = {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
};

export default function BaseHeader
({ center, left, right }: Props) {
  return (
    <header className={styles.container}>
      {left}
      {center}
      {right}
    </header>
  );
}
