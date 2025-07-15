"use client";

import { LoginHandler } from "@/form/handler/submit/LoginHandler";
import Form from "@component/form/Form";
import LoginForm from "@form/Login";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login({ }) {
  const router = useRouter();
  const submitHandler = new LoginHandler({ props: new Map([["router", router]]) });

  useEffect(() => {
    router.prefetch("/");
  }, []);

  return <Form formConfig={LoginForm} submitHandler={submitHandler} />;
}
