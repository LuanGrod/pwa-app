"use client";

import styles from "./GerarNovaSenha.module.css";
import SubmitButton from "../buttons/Submit";
import ConfirmarSenha from "@global/form/fields/ConfirmarSenha";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function GerarNovaSenha({}) {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Not Implemented!");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <ConfirmarSenha />
      <SubmitButton label="SALVAR" />
    </form>
  );
}
