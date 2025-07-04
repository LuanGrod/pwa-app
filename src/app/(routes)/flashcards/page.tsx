import { Flashcards as FlashcardsFiltersWrapper } from "@/component/filter/wrapper/Flashcards";
import GreetingsLogoStructure from "@/component/structure/GreetingsLogo";

type Props = {};

export default function page({}: Props) {
  return (
    <GreetingsLogoStructure>
      <div className="page-filter">
        <div>
          <p className="quantity-selected">{25045} flashcards selecionadas</p>
          <h1 className="title">Bem-vindo ao <br/>banco de flashcards!</h1>
          <h2 className="subtitle">Escolha seus filtros</h2>
        </div>
        <FlashcardsFiltersWrapper />
      </div>
    </GreetingsLogoStructure>
  );
}