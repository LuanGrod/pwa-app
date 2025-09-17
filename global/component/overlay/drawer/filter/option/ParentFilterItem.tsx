import Seta from "@global/component/icon/Seta";
import clsx from "clsx/lite";
import ChildFilterItem from "./ChildFilterItem";

type ParentFilterItemProps = {
  opt: any;
  selected: any;
  parentOpen: string;
  setParentOpen: (id: string) => void;
  parentOptionId?: string;
  parentOptionLabel?: string;
  parentKey?: string;
  filterKey?: string;
  optionId?: string;
  optionLabel?: string;
  onToggleParent: (filterKey: any, parentKey: any, parentId: any, childrenIds: any[]) => any;
  onToggleChild: (filterKey: any, childId: any, parentKey?: any, parentId?: any, allChildrenIds?: any[]) => any;
};

export default function ParentFilterItem({
  opt,
  selected,
  parentOpen,
  setParentOpen,
  parentOptionId,
  parentOptionLabel,
  parentKey,
  filterKey,
  optionId,
  optionLabel,
  onToggleParent,
  onToggleChild,
}: ParentFilterItemProps) {
  if (!parentOptionId || !parentOptionLabel || !parentKey || !filterKey || !optionId || !optionLabel) {
    return null;
  }

  return (
    <div>
      <div className="custom-checkbox">
        <label>
          <input
            type="checkbox"
            checked={selected[parentKey].includes(opt[parentOptionId])}
            onChange={() =>
              onToggleParent(
                filterKey,
                parentKey,
                opt[parentOptionId],
                opt.children.map((c: any) => c[optionId])
              )
            }
          />
          <span className={clsx("checkmark", selected[parentKey].includes(opt[parentOptionId]) && "checked")}></span>
        </label>
        <button
          className={`expand-icon ${parentOpen === opt[parentOptionId] ? "open" : "closed"}`}
          onClick={() => setParentOpen(parentOpen === opt[parentOptionId] ? "" : opt[parentOptionId])}
        >
          <span className="label">{opt[parentOptionLabel]}</span>
          <Seta size={17} />
        </button>
      </div>
      <div className={`children ${parentOpen === opt[parentOptionId] ? "open" : "closed"}`}>
        {opt.children.map((child: any) => (
          <ChildFilterItem
            key={`${child[optionId]}_${child[optionLabel]}`}
            child={child}
            parent={opt}
            selected={selected}
            filterKey={filterKey}
            optionId={optionId}
            optionLabel={optionLabel}
            parentOptionId={parentOptionId}
            parentKey={parentKey}
            onToggleChild={onToggleChild}
          />
        ))}
      </div>
    </div>
  );
}
