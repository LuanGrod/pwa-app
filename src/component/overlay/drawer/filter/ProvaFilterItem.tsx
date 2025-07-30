import { BrazilianStateFormatter } from "@global/formatter/states/Brazilian";
import clsx from "clsx/lite";

type ProvaFilterItemProps = {
  opt: any;
  selected: any;
  filterKey?: string;
  optionId?: string;
  onToggleChild: (filterKey: any, childId: any) => any;
  selectionMode?: "multi" | "single";
};

export default function ProvaFilterItem({
  opt,
  selected,
  filterKey,
  optionId,
  onToggleChild,
  selectionMode = "multi",
}: ProvaFilterItemProps) {

  if (!filterKey || !optionId) {
    return null;
  }

  const isSelected = selected[filterKey].includes(opt[optionId]);


  return (
    <div className="custom-checkbox">
      <label>
        <input
          type={selectionMode === "single" ? "radio" : "checkbox"}
          name={selectionMode === "single" ? filterKey : undefined}
          checked={isSelected}
          onChange={() => onToggleChild(filterKey, opt[optionId])}
        />
        <span className={clsx("checkmark", isSelected && "checked")}></span>
      </label>

      <div className="prova-label">
        <p className="institution">
          {opt.estados_uf}: {opt.instituicoes_nome}
        </p>
        <p className="year">
          Prova de {opt.provas_ano}
        </p>
      </div>
    </div>
  );
} 