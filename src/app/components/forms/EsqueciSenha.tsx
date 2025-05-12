"use client";

import Email from "@global/form/fields/Email";
import styles from "./EsqueciSenha.module.css";
import SubmitButton from "../buttons/Submit";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function EsqueciSenha({}) {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");

    const url = "/api/esqueci-senha";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    };

    const response = await fetch(url, options);

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <Email />
      <SubmitButton label="ENVIAR" />
    </form>
  );
}
