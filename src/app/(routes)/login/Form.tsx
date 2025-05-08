"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";

type Props = {};

export default function Form({}: Props) {
  const router = useRouter();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      document.cookie = `token=${result.token}; path=/; max-age=3600;`;
      router.push("/");
    } else {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={(e) => onSubmit(e)} className={styles.form}>
      <div className={styles.inputContainer}>
        <label htmlFor="email">Email:</label>
        <input value="dev@email.com" type="email" id="email" name="email" required placeholder="Digite aqui seu e-mail..." />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="password">Senha</label>
        <input value="123" type="password" id="password" name="password" required placeholder="Digite aqui sua senha..." />
      </div>

      <div className={styles.linkContainer}>
        <a href="/recuperar-senha">Esqueci a senha</a>
      </div>

      <button type="submit" className={styles.button}>
        ENTRAR
      </button>
    </form>
  );
}
