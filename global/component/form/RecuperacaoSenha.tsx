"use client";

import { RecuperacaoSenhaHandler } from "@global/form/handler/submit/api/RecuperacaoSenhaHandler";
import Form from "@global/component/form/Form";
import RecuperacaoSenhaForm from "@global/form/RecuperacaoSenha";

export default function RecuperacaoSenha({}) {
  const submitHandler = new RecuperacaoSenhaHandler({entity: "estudantes"});

  return <Form formConfig={RecuperacaoSenhaForm} submitHandler={submitHandler} submitLabel="ENVIAR" />;
}
