import useQuestoes from "@/store/QuestaoStore";
import { BrazilianStateFormatter } from "@global/formatter/states/Brazilian";
import useCheckSelected from "@global/hook/filter/useCheckSelected";
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

  const { setTest } = useQuestoes();

  const isSelected = useCheckSelected({ selected, filterKey, opt, optionId });

  const handleChange = () => {
    onToggleChild(filterKey, opt[optionId]);
    setTest(opt);
  }

  return (
    <div className="custom-checkbox">
      <label>
        <input
          type={selectionMode === "single" ? "radio" : "checkbox"}
          name={selectionMode === "single" ? filterKey : undefined}
          checked={isSelected}
          onClick={handleChange}
          readOnly
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