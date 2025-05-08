"use client";

import { useRouter } from "next/navigation";
import Voltar from "./icons/Voltar";
import styles from "./ReturnRoute.module.css";

type Props = {};

export default function ReturnRoute({}: Props) {
  const router = useRouter();

  return (
    <div onClick={() => router.back()} className={styles.container}>
      <Voltar size={29} changeOnTheme />
    </div>
  );
}
