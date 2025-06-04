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
            { href: "/hot-topics-salvos", image: "/project/assets/HotTopics.svg", label: "Hot topics" },
            { href: "/mapas-mentais-salvos", image: "/project/assets/MapasMentais.svg", label: "Mapas mentais" },
            { href: "/flashcards-salvos", image: "/project/assets/Flashcards.svg", label: "Flashcards" },
            { href: "/questoes-salvos", image: "/project/assets/Questoes.svg", label: "Questões" },
          ]}
        />
        <div></div>
      </div>
    </GreetingsLogoStructure>
  );
}
