import clsx from "clsx/lite";

type SimpleFilterItemProps = {
  opt: any;
  selected: any;
  filterKey?: string;
  optionId?: string;
  optionLabel?: string;
  onToggleChild: (filterKey: any, childId: any) => any;
  selectionMode?: "multi" | "single";
};

export default function SimpleFilterItem({
  opt,
  selected,
  filterKey,
  optionId,
  optionLabel,
  onToggleChild,
  selectionMode = "multi",
}: SimpleFilterItemProps) {

  if(!filterKey || !optionId || !optionLabel) {
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
      <span className="label">{opt[optionLabel]}</span>
    </div>
  );
}
