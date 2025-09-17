import Structure from "@/component/structure/GreetingsEstudanteLogo"
import { Simulados as SimuladosFiltersWrapper } from "@/component/filter/wrapper/Simulados";

type Props = {}

export default function page({ }: Props) {
  return (
    <Structure>
      <div className="page-filter">
        <div>
          <p className="quantity-selected">{1} prova na integra feita</p>
          <h1 className="title">Bem-vindo ao <br />modo simulado!</h1>
          <h2 className="subtitle">Escolha sua prova na íntegra e o tempo desejado</h2>
        </div>
        <SimuladosFiltersWrapper />
      </div>
    </Structure>
  )
}