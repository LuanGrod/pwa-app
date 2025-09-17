import { Fatura as FaturaType } from "@/type/Entities";
import Download from "@global/component/icon/Download";
import { BrazilianDateFormatter } from "@global/formatter/date/Brazilian";

type Props = {
  item: FaturaType;
}

export default function Fatura({ item }: Props) {

  const dateFormatter = new BrazilianDateFormatter();

  return (
    <div className="fatura-item" key={item.faturas_id}>
      <div className="fatura-date">
        <span className="month">{dateFormatter.shortFormatMonth(item.faturas_data_hora_cadastro)}</span>
        <span className="year">{dateFormatter.shortFormatYear(item.faturas_data_hora_cadastro)}</span>
      </div>
      <div className="fatura-value">R$ {item.faturas_valor}</div>
      <button className="fatura-action" aria-label="Baixar fatura" onClick={() => alert("Not implemented yet")}>
        <Download size={35} changeOnTheme />
      </button>
    </div>
  )
}