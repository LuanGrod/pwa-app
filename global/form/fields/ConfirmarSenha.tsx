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
//
export default function ConfirmarSenha({ last }: Props) {
  const [firstValue, setFirstValue] = useState<string>("");
  const [firstError, setFirstError] = useState<string>("");
  const [firstIsVisible, setFirstIsVisible] = useState<boolean>(false);
  const [secondValue, setSecondValue] = useState<string>("");
  const [secondError, setSecondError] = useState<string>("");
  const [secondIsVisible, setSecondIsVisible] = useState<boolean>(false);

  const notEmptyValidator = new NotEmpty("Message");
  const betweenLengthValidator = new BetweenLength("Message", 5, 20);

  const validateFirstField = (e: ChangeEvent<HTMLInputElement>) => {
    const current = e.target.value;
    const isValid = betweenLengthValidator.validate(current) && notEmptyValidator.validate(current);
    isValid ? setFirstError("") : setFirstError("A Senha informada é inválida.");
    setFirstValue(current);
  };

  const validateSecondField = (e: ChangeEvent<HTMLInputElement>) => {
    const current = e.target.value;
    const isValid = current === firstValue;
    isValid ? setSecondError("") : setSecondError("As duas senhas devem ser iguais.");
    setSecondValue(current);
  };

  return (
    <>
      <div className={`${last ? styles.last : ""} ${styles.container}`}>
        <label htmlFor="senha" className={styles.label}>
          Senha:
        </label>
        <input
          type={firstIsVisible ? "text" : "password"}
          id="senha"
          name="senha"
          value={firstValue}
          onChange={(e) => validateFirstField(e)}
          onBlur={(e) => validateFirstField(e)}
          className={`${styles.field} ${firstError ? styles.errorField : ""}`}
          placeholder="Digite aqui sua senha..."
        ></input>
        <div onClick={(e) => setFirstIsVisible(!firstIsVisible)} className={stylesSenha.toggleVisibility}>
          {firstIsVisible ? <OlhoAberto size={26} /> : <OlhoFechado size={26} />}
        </div>
        <span className={styles.error}>{firstError}</span>
      </div>
      <div className={`${last ? styles.last : ""} ${styles.container}`}>
        <label htmlFor="confirmarSenha" className={styles.label}>
          Confirmar senha:
        </label>
        <input
          type={secondIsVisible ? "text" : "password"}
          id="confirmarSenha"
          name="confirmarSenha"
          value={secondValue}
          onChange={(e) => validateSecondField(e)}
          onBlur={(e) => validateSecondField(e)}
          className={`${styles.field} ${secondError ? styles.errorField : ""}`}
          placeholder="Digite aqui sua senha..."
        ></input>
        <div onClick={(e) => setSecondIsVisible(!secondIsVisible)} className={stylesSenha.toggleVisibility}>
          {secondIsVisible ? <OlhoAberto size={26} /> : <OlhoFechado size={26} />}
        </div>
        <span className={styles.error}>{secondError}</span>
      </div>
    </>
  );
}
