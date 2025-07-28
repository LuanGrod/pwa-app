import ReturnTitleStructure from "@/component/structure/ReturnTitle";
import styles from "./page.module.css";
import IconFrameContainer from "@/component/atomic/IconFrameContainer";
import { use } from "react";

type Props = {};

export default function page({
  params,
}: {
  params: Promise<{ id: string, name: string }>
}) {
  const { id, name } = use(params);

  return (
    <ReturnTitleStructure title={decodeURIComponent(name)}>
      <div className={styles.container}>
        <IconFrameContainer
          links={[
            { href: "/salvos/hot-topics", image: "/project/assets/HotTopics.svg", label: "Hot topics" },
            { href: "/salvos/mapas-mentais", image: "/project/assets/MapasMentais.svg", label: "Mapas Mentais" },
            { href: "/salvos/flashcards", image: "/project/assets/Flashcards.svg", label: "Flashcards" },
            { href: "/salvos/questoes", image: "/project/assets/Questoes.svg", label: "Questões" },
          ]}
        />
      </div>
    </ReturnTitleStructure>
  );
}
