import ReturnStructure from "@/app/components/structure/Return";
import styles from "./page.module.css";
import EsqueciSenha from "@/app/components/forms/EsqueciSenha"

type Props = {};

export default function page({}: Props) {
  return (
    <ReturnStructure>
      <div className={styles.container}>
        <div className={styles.descriptionContainer}>
        <h1 className={styles.title}>Esqueci a senha</h1>
        <h2 className={styles.subtitle}>Entre com seu e-mail para alterar a senha. Enviaremos um link de recuperação.</h2>
        </div>
        <EsqueciSenha/>
      </div>
    </ReturnStructure>
  );
}
