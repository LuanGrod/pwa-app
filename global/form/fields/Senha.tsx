"use client";

import OlhoAberto from "@global/icons/OlhoAberto";
import OlhoFechado from "@global/icons/OlhoFechado";
import { NotEmpty } from "@public/global/js/validator/NotEmpty/NotEmpty";
import { BetweenLength } from "@public/global/js/validator/String/BetweenLength/BetweenLength";
import { ChangeEvent, useState } from "react";
import styles from "./Field.module.css";
import stylesSenha from "./Senha.module.css";

type Props = {
  last?: boolean;
};

export default function Senha({ last }: Props) {
  const [value, setValue] = useState<string>("senha123");
  const [error, setError] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const notEmptyValidator = new NotEmpty("Message");
  const betweenLengthValidator = new BetweenLength("Message", 5, 20);

  const validateField = (e: ChangeEvent<HTMLInputElement>) => {
    const current = e.target.value;

    const isValid = betweenLengthValidator.validate(current) && notEmptyValidator.validate(current);
    isValid ? setError("") : setError("A Senha informada é inválida.");

    setValue(current);
  };

  return (
    <div className={`${last ? styles.last : ""} ${styles.container}`}>
      <label htmlFor="password" className={styles.label}>
        Senha:
      </label>
      <input
        type={isVisible ? "text" : "password"}
        id="password"
        name="senha"
        value={value}
        onChange={(e) => validateField(e)}
        onBlur={(e) => validateField(e)}
        className={`${styles.field} ${error ? styles.errorField : ""}`}
        placeholder="Digite aqui sua senha..."
      ></input>
      <div onClick={() => setIsVisible(!isVisible)} className={stylesSenha.toggleVisibility}>
        {isVisible ? <OlhoAberto size={26} /> : <OlhoFechado size={26} />}
      </div>
      <span className={styles.error}>{error}</span>
    </div>
  );
}
