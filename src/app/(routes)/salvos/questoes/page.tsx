import ReturnTitleSearchStructure from "@/component/structure/ReturnTitleSearch";
import styles from "./page.module.css";
import Questoes from "@/component/listing/Questoes";

type Props = {};

export default async function page({}: Props) {
  return (
    <ReturnTitleSearchStructure title="Salvos">
      <div className={styles.container}>
        <Questoes/>
      </div>
    </ReturnTitleSearchStructure>
  );
}
