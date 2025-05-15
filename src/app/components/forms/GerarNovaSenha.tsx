"use client";

import styles from "./GerarNovaSenha.module.css";
import SubmitButton from "../buttons/Submit";
import ConfirmarSenha from "@global/form/fields/ConfirmarSenha";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Notification from "./Notification";

export default function GerarNovaSenha({}) {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: NotificationType }>({
    message: "",
    type: "danger",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setNotification({ message: "", type: "danger" });

    const formData = new FormData(e.currentTarget);
    const senha = formData.get("senha");
    const confirmarSenha = formData.get("confirmarSenha");

    setTimeout(() => {
      if (senha && confirmarSenha && senha.toString().length >= 5 && senha == confirmarSenha) {
        setNotification({ message: "Senha alterada com sucesso", type: "success" });
      } else {
        setNotification({
          message: "Não foi possível alterar a senha, verifique os campos e tente novamente",
          type: "danger",
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <ConfirmarSenha />
      <SubmitButton label="SALVAR" loading={loading} />
      <Notification type={notification.type} message={notification.message} />
    </form>
  );
}
