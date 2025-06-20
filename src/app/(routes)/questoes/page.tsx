import { Questoes as QuestoesFiltersWrapper } from "@/component/filter/wrapper/Questoes";
import GreetingsLogoStructure from "@/component/structure/GreetingsLogo";

type Props = {};

export default function page({}: Props) {
  return (
    <GreetingsLogoStructure>
      <div className="page-filter">
        <div>
          <p className="quantity-selected">{25045} questões selecionadas</p>
          <h1 className="title">Bem-vindo ao <br/>banco de questões!</h1>
          <h2 className="subtitle">Escolha seus filtros</h2>
        </div>
        <QuestoesFiltersWrapper />
      </div>
    </GreetingsLogoStructure>
  );
}
