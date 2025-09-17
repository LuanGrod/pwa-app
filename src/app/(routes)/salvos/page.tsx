import Structure from "@/component/structure/GreetingsEstudanteLogo";
import styles from "./page.module.css";
import IconFrameContainer from "@/component/iconFrame/IconFrameContainer";

type Props = {};

export default function page({}: Props) {
  return (
    <Structure>
      <div className="home-container">
        <h1 className="title-salvos">Salvos</h1>
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
