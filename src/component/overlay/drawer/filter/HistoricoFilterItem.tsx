import { LinkView } from "@global/component/atomic/LinkView";
import { BrazilianDateFormatter } from "@global/formatter/date/Brazilian";

type HistoricoFilterItemProps = {
  opt: any;
  selected: any;
  filterKey?: string;
  optionId?: string;
  onToggleChild: (filterKey: any, childId: any) => any;
  selectionMode?: "multi" | "single";
};

export default function HistoricoFilterItem({
  opt,
  selected,
  filterKey,
  optionId,
  onToggleChild,
  selectionMode = "multi",
}: HistoricoFilterItemProps) {

  if (!filterKey || !optionId) {
    return null;
  }

  const dateFormatter = new BrazilianDateFormatter();

  return (
    <div className="custom-checkbox">
      <LinkView href={`/simulado/${opt.simulados_id_simulado3}`} className="prova-label">
        <p className="institution">
          {opt.instituicoes_nome} <span className="text-xs text-gray-500">({dateFormatter.format(opt.simulados_data_hora_cadastro)})</span>
        </p>
        <p className="year">
          Prova de {opt.provas_ano}
        </p>
      </LinkView>
    </div>
  );
} 