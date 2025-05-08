import IconFrame from "./components/IconFrame";
import HomeStructure from "./components/structure/Home";
import styles from "./page.module.css";

export default function Home() {
  return (
    <HomeStructure>
      <div className={styles.container}>
        <h1 className={styles.title}>medRQE</h1>
        <div className={styles.links_container}>
          <IconFrame href="/hot-topics" image="/assets/HotTopics.svg" label="Hot topics" />
          <IconFrame href="/mapas-mentais" image="/assets/MapasMentais.svg" label="Mapas mentais" />
          <IconFrame href="/flashcards" image="/assets/Flashcards.svg" label="Flashcards" />
          <IconFrame href="/questoes" image="/assets/Questoes.svg" label="Questões" />
          <IconFrame href="/extensivo" image="/assets/Extensivo.svg" label="Extensivo" />
          <IconFrame href="/simulado" image="/assets/Simulado.svg" label="Simulado" />
        </div>
        <div></div>
      </div>
    </HomeStructure>
  );
}
