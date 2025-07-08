"use client";

import { GeracaoNovaSenhaHandler } from "@/form/handler/submit/GeracaoNovaSenhaHandler";
import Form from "@component/form/Form";
import GeracaoNovaSenhaForm from "@form/GeracaoNovaSenha";

export default function GeracaoNovaSenha({}) {
  const submitHandler = new GeracaoNovaSenhaHandler({entity: "estudantes"});

  return <Form formConfig={GeracaoNovaSenhaForm} submitHandler={submitHandler} />;
}
