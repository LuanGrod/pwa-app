import GreetingsLogoStructure from "@/component/structure/GreetingsLogo";
import { MapasMentais as MapasMentaisFiltersWrapper } from "@/component/filter/wrapper/MapasMentais";

type Props = {};

export default function page({}: Props) {
  return (
    <GreetingsLogoStructure>
       <div className="page-filter">
        <div>
          <p className="quantity-selected">{300} mapas mentais selecionados</p>
          <h1 className="title">Bem-vindo aos <br/>mapas mentais!</h1>
          <h2 className="subtitle">Escolha seus filtros</h2>
        </div>
        <MapasMentaisFiltersWrapper />
      </div>
    </GreetingsLogoStructure>
  );
}
