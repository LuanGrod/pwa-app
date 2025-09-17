import { Flashcards as FlashcardsFiltersWrapper } from "@/component/filter/wrapper/Flashcards";
import Structure from "@/component/structure/GreetingsEstudanteLogo";

type Props = {};

export default function page({}: Props) {
  return (
    <Structure>
      <div className="page-filter">
        <div>
          <p className="quantity-selected">{25045} flashcards selecionados</p>
          <h1 className="title">Bem-vindo ao <br/>banco de flashcards!</h1>
          <h2 className="subtitle">Escolha seus filtros</h2>
        </div>
        <FlashcardsFiltersWrapper />
      </div>
    </Structure>
  );
}