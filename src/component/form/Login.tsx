"use client";

import { LoginHandler } from "@/form/handler/submit/LoginHandler";
import Form from "@component/form/Form";
import LoginForm from "@form/Login";

export default function Login({}) {
  const submitHandler = new LoginHandler({});

  return <Form formConfig={LoginForm} submitHandler={submitHandler} />;
}
