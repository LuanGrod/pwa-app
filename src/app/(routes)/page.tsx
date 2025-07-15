import IconFrameContainer from "@/component/atomic/IconFrameContainer";
import HomeStructure from "@/component/structure/Home";
import styles from "./page.module.css";

export default function Home() {
  return (
    <HomeStructure>
      <div className={styles.container}>
        <h1 className={styles.title}>MedRQE</h1>
        <IconFrameContainer
          variation
          links={[
            { href: "/hot-topics", image: "/project/assets/HotTopics.svg", label: "Hot topics" },
            { href: "/mapas-mentais", image: "/project/assets/MapasMentais.svg", label: "Mapas mentais" },
            { href: "/flashcards", image: "/project/assets/Flashcards.svg", label: "Flashcards" },
            { href: "/questoes", image: "/project/assets/Questoes.svg", label: "Questões" },
            { href: "/extensivo", image: "/project/assets/Extensivo.svg", label: "Extensivo" },
            { href: "/simulado", image: "/project/assets/Simulado.svg", label: "Simulado" },
          ]}
        />
        <div></div>
      </div>
    </HomeStructure>
  );
}
