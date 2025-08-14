import Structure from "@/component/structure/Return";
import styles from "./page.module.css";
import RecuperacaoSenha from "@global/component/form/RecuperacaoSenha";

type Props = {};

export default function page({}: Props) {
  return (
    <Structure>
      <div className={styles.container}>
        <div className={styles.descriptionContainer}>
          <h1 className={styles.title}>Esqueci a senha</h1>
          <h2 className={styles.subtitle}>
            Entre com seu e-mail para alterar a senha. Enviaremos um link de recuperação.
          </h2>
        </div>
        <RecuperacaoSenha/>
      </div>
    </Structure>
  );
}
