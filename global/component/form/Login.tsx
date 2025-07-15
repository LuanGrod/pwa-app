"use client";

import { LoginHandler } from "@global/form/handler/submit/LoginHandler";
import { useEstudante } from "@/store/EstudanteStore";
import Form from "@global/component/form/Form";
import LoginForm from "@global/form/Login";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login({ }) {
  const router = useRouter();
  const { setEstudante } = useEstudante();
  const submitHandler = new LoginHandler({ props: new Map([["setEstudante", setEstudante]]) });

  useEffect(() => {
    router.prefetch("/");
  }, []);

  return <Form formConfig={LoginForm} submitHandler={submitHandler} />;
}
