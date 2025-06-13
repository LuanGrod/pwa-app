import { Questoes as QuestoesFiltersWrapper } from "@/component/filter/wrapper/Questoes";
import GreetingsLogoStructure from "@/component/structure/GreetingsLogo";
import styles from "./page.module.css";

type Props = {};

export default function page({}: Props) {
  return (
    <GreetingsLogoStructure>
      <div className={styles.container}>
        <div>
          <p className={styles.info}>{25045} questões selecionadas</p>
          <h1 className={styles.title}>Bem-vindo ao banco de questões!</h1>
          <h2 className={styles.subtitle}>Escolha seus filtros</h2>
        </div>
        <QuestoesFiltersWrapper />
      </div>
    </GreetingsLogoStructure>
  );
}
