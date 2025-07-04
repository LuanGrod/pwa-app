import GreetingsLogoStructure from "@component/structure/GreetingsLogo";
import { HotTopics as HotTopicsFiltersWrapper } from "@/component/filter/wrapper/HotTopics";

type Props = {};

export default function page({}: Props) {
  return (
    <GreetingsLogoStructure>
       <div className="page-filter">
        <div>
          <p className="quantity-selected">{300} hot topics selecionados</p>
          <h1 className="title">Bem-vindo aos <br/>hot topics!</h1>
          <h2 className="subtitle">Escolha seus filtros</h2>
        </div>
        <HotTopicsFiltersWrapper />
      </div>
    </GreetingsLogoStructure>
  );
}
