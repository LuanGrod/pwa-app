import ReturnTitleSearchStructure from "@/component/structure/ReturnTitleSearch";
import styles from "./page.module.css";
import Questoes2 from "@/component/listing/Questoes2";

type Props = {};

export default async function page({}: Props) {
  return (
    <ReturnTitleSearchStructure title="Salvos">
      <div className={styles.container}>
        <Questoes2/>
      </div>
    </ReturnTitleSearchStructure>
  );
}
