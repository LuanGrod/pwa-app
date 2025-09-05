import clsx from "clsx";
import { useMemo } from "react";

type TemaFilterItemProps = {
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

export default function TemaFilterItem({
  child,
  parent,
  selected,
  filterKey,
  optionId,
  optionLabel,
  parentOptionId,
  parentKey,
  onToggleChild,
}: TemaFilterItemProps) {

  // Pega o domain diretamente do child - otimizado com useMemo para consistência arquitetural
  const temaDomain = useMemo(() => {
    return Number(child.domain) || 0;
  }, [child.domain]);

  if (!filterKey || !optionId || !optionLabel || !parentOptionId || !parentKey) {
    return null;
  }

  const isSelected =
    selected[filterKey].includes(child[optionId]) || selected[parentKey].includes(parent[parentOptionId]);

  return (
    <div className="custom-checkbox has-domain child-checkbox">
      <div className="left-section">
        <label>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() =>
              onToggleChild(
                filterKey,
                child[optionId],
                parentKey,
                parent[parentOptionId],
                parent.children.map((c: any) => c[optionId])
              )
            }
          />
          <span className={clsx("checkmark", isSelected && "checked")}></span>
        </label>
        <span className="label">{child[optionLabel]}</span>
      </div>
      <div className="domain-indicator">{temaDomain}%</div>
    </div>
  );
} 