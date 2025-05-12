"use client";

import Email from "@global/form/fields/Email";
import Senha from "@global/form/fields/Senha";
import styles from "./Login.module.css";
import Link from "next/link";
import SubmitButton from "../buttons/Submit";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Login({}) {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const senha = formData.get("senha");

    const url = "/api/login";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        senha,
      }),
    };

    const response = await fetch(url, options);

    const data = await response.json();

    if (response.ok) {
      document.cookie = `token=${data.token}; path=/; max-age=3600`;
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <Email />
      <Senha last />
      <div className={styles.forgetPasswordContainer}>
        <Link href="/recuperacao-senha" className={styles.forgetPassword}>
          Esqueci a senha
        </Link>
      </div>
      <SubmitButton />
    </form>
  );
}
