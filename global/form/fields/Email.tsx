"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import styles from "./Field.module.css";
import { Email as EmailVal } from "@public/global/js/validator/String/Email/Email";
import { NotEmpty as NotEmptyVal } from "@public/global/js/validator/NotEmpty/NotEmpty";

type Props = {
  last?: boolean;
};

export default function Email({ last }: Props) {
  const [value, setValue] = useState<string>("moisesnovaes5@yahoo.com.br");
  const [error, setError] = useState<string>("");
  const emailValidator = new EmailVal("Message");
  const notEmptyValidator = new NotEmptyVal("Message");

  const validateField = (e: ChangeEvent<HTMLInputElement>) => {
    const current = e.target.value;

    const isValid = emailValidator.validate(current) && notEmptyValidator.validate(current);
    isValid ? setError("") : setError("O E-mail informado é inválido.");

    setValue(current);
  };

  return (
    <div className={`${last ? styles.last : ""} ${styles.container}`}>
      <label htmlFor="email" className={styles.label}>
        E-mail:
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={value}
        onChange={(e) => validateField(e)}
        onBlur={(e) => validateField(e)}
        className={`${styles.field} ${error ? styles.errorField : ""}`}
        placeholder="Digite aqui seu e-mail..."
      />
      <span className={styles.error}>{error}</span>
    </div>
  );
}
