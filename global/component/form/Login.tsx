"use client";

import { LoginHandler } from "@global/form/handler/submit/api/LoginHandler";
import { useEstudante } from "@/store/EstudanteStore";
import Form from "@global/component/form/Form";
import LoginForm from "@global/form/Login";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function Login({ }) {
  const router = useRouter();
  const { setEstudante } = useEstudante();

  const userSettings = useMemo(() => {
    const settings = new Map();
    settings.set("setUser", setEstudante);
    settings.set("entity", "estudantes");
    settings.set("router", router);
    settings.set("params", [
      ["nomeCompleto", "estudantes_nome_completo"],
      ["urlImagem", "estudantes_url_imagem"],
      ["periodosPlanosId", "periodos_planos_id"],
    ]);
    return settings;
  }, [router, setEstudante]);

  useEffect(() => {
    router.prefetch("/");
  }, [router]);

  const submitHandler = new LoginHandler({ data: userSettings });

  return <Form formConfig={LoginForm} submitHandler={submitHandler} />;
}
