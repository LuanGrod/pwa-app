import clsx from "clsx/lite";

type ChildFilterItemProps = {
  child: any;
  parent: any;
  selected: any;
  filterKey?: string;
  optionId?: string;
  optionLabel?: string;
  parentOptionId?: string;
  parentKey?: string;
  onToggleChild: (filterKey: any, childId: any, parentKey?: any, parentId?: any, allChildrenIds?: any[]) => any;
};

export default function ChildFilterItem({
  child,
  parent,
  selected,
  filterKey,
  optionId,
  optionLabel,
  parentOptionId,
  parentKey,
  onToggleChild,
}: ChildFilterItemProps) {
  const isSelected =
    selected[filterKey!].includes(child[optionId!]) || selected[parentKey!].includes(parent[parentOptionId!]);

  return (
    <div className="custom-checkbox child-checkbox">
      <label>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() =>
            onToggleChild(
              filterKey!,
              child[optionId!],
              parentKey!,
              parent[parentOptionId!],
              parent.children.map((c: any) => c[optionId!])
            )
          }
        />
        <span className={clsx("checkmark", isSelected && "checked")}></span>
      </label>
      <span className="label">{child[optionLabel!]}</span>
    </div>
  );
}
