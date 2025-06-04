"use client";

import Image from "next/image";
import styles from "./Submit.module.css";

type Props = {
  label?: string;
  loading?: boolean;
};

export default function SubmitButton({ label = "ENTRAR", loading = false }: Props) {

  return (
    <button type="submit" className={`${styles.container} ${loading ? styles.disabled : ""}`} disabled={loading}>
      {loading ? <Image className={styles.loading} src="/global/assets/images/loader4.webp" alt="carregando" width={30} height={50} /> : label}
    </button>
  );
}
