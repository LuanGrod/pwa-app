"use client";

import { RecuperacaoSenhaHandler } from "@/form/handler/submit/RecuperacaoSenhaHandler";
import Form from "@component/form/Form";
import RecuperacaoSenhaForm from "@form/RecuperacaoSenha";

export default function RecuperacaoSenha({}) {
  const submitHandler = new RecuperacaoSenhaHandler({});

  return <Form formConfig={RecuperacaoSenhaForm} submitHandler={submitHandler} />;
}
