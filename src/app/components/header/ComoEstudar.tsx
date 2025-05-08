"use client";

import Logo from "../icons/Logo";
import styles from "./ComoEstudar.module.css";
import { useRouter } from "next/navigation";
import Voltar from "../global/icons/Voltar";

type Props = {};

export default function ComoEstudar({}: Props) {
  const router = useRouter();

  return (
    <header className={styles.container}>
      <div onClick={() => router.back()} className={styles.icon_container}>
        <Voltar size={29} changeOnTheme />
      </div>
      <div className={styles.icon_overlay}>
        <Logo size={29} />
      </div>
      <div className={styles.icon_container}></div>
    </header>
  );
}
