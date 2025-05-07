"use client";

import { useRouter } from "next/navigation";
import Voltar from "../global/icons/Voltar";
import styles from "./ReturnTitle.module.css";

type Props = {
  title: string;
};

export default function ReturnTitle({title}: Props) {
  const router = useRouter();

  return (
    <header className={styles.container}>
      <div onClick={() => router.back()} className={styles.icon_container}>
        <Voltar size={29} changeOnTheme />
      </div>
      <p className={styles.title}>{title}</p>
      <div className={styles.icon_container}></div>
    </header>
  );
}
