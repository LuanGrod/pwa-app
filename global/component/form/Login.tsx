"use client";

import { LoginHandler } from "@global/form/handler/submit/api/LoginHandler";
import { useEstudante } from "@/store/EstudanteStore";
import Form from "@global/component/form/Form";
import LoginForm from "@global/form/Login";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login({ }) {
  const router = useRouter();
  const { setEstudante } = useEstudante();
  let userSettings = new Map();

  useEffect(() => {
    router.prefetch("/");
    userSettings.set("setUser", setEstudante);
    userSettings.set("entity", "estudantes");
    userSettings.set("params", [
      ["nomeCompleto", "estudantes_nome_completo"],
      ["urlImagem", "estudantes_url_imagem"],
      ["periodosPlanosId", "periodos_planos_id"],
    ])
  }, []);

  const submitHandler = new LoginHandler({ props: userSettings });


  return <Form formConfig={LoginForm} submitHandler={submitHandler} />;
}
