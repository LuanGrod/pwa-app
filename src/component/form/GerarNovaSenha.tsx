"use client";

import Form from "@global/component/form/Form";
import GeracaoNovaSenhaForm from "@/form/GeracaoNovaSenha";
import GeracaoNovaSenhaHandlerFactory from "@global/form/handler/submit/api/GeracaoNovaSenhaHandlerFactory";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { GeracaoNovaSenhaResponse } from "@global/type/request/response/handler/GeracaoNovaSenha";

export default function GeracaoNovaSenha({ }) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/");
  }, [router]);

  const submitHandler = GeracaoNovaSenhaHandlerFactory.create("estudantes", router);

  return <Form formConfig={GeracaoNovaSenhaForm} submitHandler={submitHandler} submitLabel="SALVAR" />;
}
