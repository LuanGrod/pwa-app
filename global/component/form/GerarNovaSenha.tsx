"use client";

import Form from "@global/component/form/Form";
import GeracaoNovaSenhaForm from "@global/form/GeracaoNovaSenha";
import { GeracaoNovaSenhaHandler } from "@global/form/handler/submit/api/GeracaoNovaSenhaHandler";

export default function GeracaoNovaSenha({}) {
  const submitHandler = new GeracaoNovaSenhaHandler({entity: "estudantes"});

  return <Form formConfig={GeracaoNovaSenhaForm} submitHandler={submitHandler} submitLabel="SALVAR" />;
}
