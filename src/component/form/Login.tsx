"use client";

import { LoginHandler } from "@/form/handler/submit/LoginHandler";
import { useAuthStore } from "@/provider/AuthProvider";
import Form from "@component/form/Form";
import LoginForm from "@form/Login";

export default function Login({}) {
  const submitHandler = new LoginHandler({});
  const { user } = useAuthStore((state) => state);

  return (
    <>
    {JSON.stringify(user)}
      <Form formConfig={LoginForm} submitHandler={submitHandler} />
    </>
  );
}
