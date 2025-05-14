import IconFrameContainer from "../components/IconFrameContainer";
import HomeStructure from "../components/structure/Home";
import styles from "./page.module.css";

export default function Home() {
  return (
    <HomeStructure>
      <div className={styles.container}>
        <h1 className={styles.title}>medRQE</h1>
        <IconFrameContainer
          links={[
            { href: "/hot-topics", image: "/project/assets/HotTopics2.webp", label: "Hot topics" },
            { href: "/mapas-mentais", image: "/project/assets/HotTopics2.webp", label: "Mapas mentais" },
            { href: "/flashcards", image: "/project/assets/HotTopics2.webp", label: "Flashcards" },
            { href: "/questoes", image: "/project/assets/HotTopics2.webp", label: "Questões" },
            { href: "/extensivo", image: "/project/assets/HotTopics2.webp", label: "Extensivo" },
            { href: "/simulado", image: "/project/assets/HotTopics2.webp", label: "Simulado" },
          ]}
        />
        <div></div>
      </div>
    </HomeStructure>
  );
}
