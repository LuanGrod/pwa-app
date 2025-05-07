"use client";

import { useRouter } from "next/navigation";
import Lupa from "../global/icons/Lupa";
import Voltar from "../global/icons/Voltar";
import styles from "./ReturnTitleSearch.module.css";

type Props = {
  title: string;
};

export default function ReturnTitleSearch({ title }: Props) {
  const router = useRouter();

  return (
    <header className={styles.container}>
      <div onClick={() => router.back()} className={styles.icon_container}>
        <Voltar size={29} changeOnTheme />
      </div>
      <p className={styles.title}>{title}</p>
      <div onClick={() => alert("not implemented yet")} className={styles.icon_container}>
        <Lupa size={23} changeOnTheme />
      </div>
    </header>
  );
}
