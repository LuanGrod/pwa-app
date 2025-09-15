"use client";

import { useEstudante } from "@/store/EstudanteStore";
import Form from "@global/component/form/Form";
import LoginForm from "@global/form/Login";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoginHandlerFactory from "@global/form/handler/submit/api/LoginHandlerFactory";

export default function Login({ }) {
  const router = useRouter();
  const { setEstudante } = useEstudante();
  const params: Array<[string, string]> = [
    ["nomeCompleto", "estudantes_nome_completo"],
    ["urlImagem", "estudantes_url_imagem"],
    ["periodosPlanosId", "periodos_planos_id"],
  ]

  useEffect(() => {
    router.prefetch("/");
  }, [router]);

  const submitHandler = LoginHandlerFactory.create("estudantes", params, setEstudante, router);

  return <Form formConfig={LoginForm} submitHandler={submitHandler} />;
}
