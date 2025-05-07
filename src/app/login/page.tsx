import Logo from "../components/icons/Logo";
import styles from "./page.module.css";

type Props = {};

export default function page({}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <h1 className={styles.title}>MedRQE</h1>
        <Logo size={139} />
      </div>
      <div className=""></div>
      <form action="" className={styles.form}>
        <div className={styles.inputContainer}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required placeholder="Digite aqui seu e-mail..." />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="password">Senha</label>
          <input type="password" id="password" name="password" required placeholder="Digite aqui sua senha..." />
        </div>

        <div className={styles.linkContainer}>
          <a href="/recuperar-senha">Esqueci a senha</a>
        </div>

        <button type="submit" className={styles.button}>
          ENTRAR
        </button>
      </form>
    </div>
  );
}
