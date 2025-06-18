import GreetingsLogoStructure from "@/component/structure/GreetingsLogo";
import styles from "./page.module.css";
import IconFrameContainer2 from "@/component/IconFrameContainer2";

type Props = {};

export default function page({}: Props) {
  return (
    <GreetingsLogoStructure>
      <div className={styles.container}>
        <h1 className={styles.title}>Salvos</h1>
        <IconFrameContainer2
          links={[
            { href: "/salvos/hot-topics", image: "/project/assets/HotTopics.svg", label: "Hot topics" },
            { href: "/salvos/mapas-mentais", image: "/project/assets/MapasMentais.svg", label: "Mapas mentais" },
            { href: "/salvos/questoes", image: "/project/assets/Flashcards.svg", label: "Flashcards" },
            { href: "/salvos/questoes2", image: "/project/assets/Questoes.svg", label: "Questões" },
          ]}
        />
        <div></div>
      </div>
    </GreetingsLogoStructure>
  );
}
