import styles from "./page.module.css";
import GerarNovaSenha from "@/app/components/forms/GerarNovaSenha";

type Props = {};

export default function page({}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.descriptionContainer}>
        <h1 className={styles.title}>Defina uma nova senha</h1>
        <h2 className={styles.subtitle}>
          Crie uma nova senha. Para sua segurança, certifique-se de que ela seja diferente das anteriores.
        </h2>
      </div>
      <GerarNovaSenha />
    </div>
  );
}
