import Image from "next/image";
import IconFrame from "./components/IconFrame";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start">
      <h1 className={`text-center text-emphasis font-comfortaa text-[32px] font-bold`}>medRQE</h1>
      <h1 className={`text-center text-foreground font-sf-pro-display text-xl font-semibold mb-[51px]`}>
        Como deseja estudar?
      </h1>

      <div className="w-[300px] h-fit grid grid-cols-2 gap-x-4 gap-y-[40px]">
        <IconFrame href="/hot-topics" image="/assets/HotTopics.svg" label="Hot topics" />
        <IconFrame href="/mapas-mentais" image="/assets/MapasMentais.svg" label="Mapas mentais" />
        <IconFrame href="/flashcards" image="/assets/Flashcards.svg" label="Flashcards" />
        <IconFrame href="/questoes" image="/assets/Questoes.svg" label="Questões" />
        <IconFrame href="/extensivo" image="/assets/Extensivo.svg" label="Extensivo" />
        <IconFrame href="/simulado" image="/assets/Simulado.svg" label="Simulado" />
      </div>
    </div>
  );
}
