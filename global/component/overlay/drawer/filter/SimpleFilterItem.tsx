import clsx from "clsx/lite";

type SimpleFilterItemProps = {
  opt: any;
  selected: any;
  filterKey?: string;
  optionId?: string;
  optionLabel?: string;
  onToggleChild: (filterKey: any, childId: any) => any;
};

export default function SimpleFilterItem({
  opt,
  selected,
  filterKey,
  optionId,
  optionLabel,
  onToggleChild,
}: SimpleFilterItemProps) {

  if(!filterKey || !optionId || !optionLabel) {
    return null;
  }

  return (
    <div className="custom-checkbox">
      <label>
        <input
          type="checkbox"
          checked={selected[filterKey].includes(opt[optionId])}
          onChange={() => onToggleChild(filterKey, opt[optionId])}
        />
        <span className={clsx("checkmark", selected[filterKey].includes(opt[optionId]) && "checked")}></span>
      </label>
      <span className="label">{opt[optionLabel]}</span>
    </div>
  );
}
