import Structure from "@/component/structure/GreetingsLogo";
import styles from "./page.module.css";
import IconFrameContainer from "@/component/atomic/IconFrameContainer";

type Props = {};

export default function page({}: Props) {
  return (
    <Structure>
      <div className={styles.container}>
        <h1 className={styles.title}>Salvos</h1>
        <IconFrameContainer
          links={[
            { href: "/salvos/hot-topics", image: "/project/assets/HotTopics.svg", label: "Hot topics" },
            { href: "/salvos/mapas-mentais", image: "/project/assets/MapasMentais.svg", label: "Mapas Mentais" },
            { href: "/salvos/flashcards", image: "/project/assets/Flashcards.svg", label: "Flashcards" },
            { href: "/salvos/questoes", image: "/project/assets/Questoes.svg", label: "Questões" },
          ]}
        />
        <div></div>
      </div>
    </Structure>
  );
}
