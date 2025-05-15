"use client";

import Email from "@global/form/fields/Email";
import styles from "./EsqueciSenha.module.css";
import SubmitButton from "../buttons/Submit";
import { FormEvent, useState } from "react";
import Notification from "./Notification";

export default function EsqueciSenha({}) {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: NotificationType }>({
    message: "",
    type: "danger",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setNotification({ message: "", type: "danger" });

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
      setNotification({ message: data.message, type: "success" });
    } else {
      setNotification({ message: data.message, type: "danger" });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <Email />
      <SubmitButton label="ENVIAR" loading={loading} />
      <Notification type={notification.type} message={notification.message} />
    </form>
  );
}
