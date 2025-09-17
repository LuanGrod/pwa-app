import Seta from "@global/component/icon/Seta";
import clsx from "clsx";
import useAreaDomain from "@/hook/useAreaDomain";
import useCheckSelected from "@global/hook/filter/useCheckSelected";
import TemaFilterItem from "./TemaFilterItem";

type AreaFilterItemProps = {
  opt: any;
  selected: any;
  filterKey?: string;
  optionId?: string;
  selectionMode?: "multi" | "single";
  parentOpen: string;
  setParentOpen: (id: string) => void;
  parentOptionId?: string;
  parentOptionLabel?: string;
  parentKey?: string;
  optionLabel?: string;
  onToggleParent: (filterKey: any, parentKey: any, parentId: any, childrenIds: any[]) => any;
  onToggleChild: (filterKey: any, childId: any, parentKey?: any, parentId?: any, allChildrenIds?: any[]) => any;
};

export default function AreaFilterItem({
  opt,
  selected,
  filterKey,
  optionId,
  onToggleChild,
  selectionMode = "multi",
  onToggleParent,
  parentOpen,
  setParentOpen,
  optionLabel,
  parentKey,
  parentOptionId,
  parentOptionLabel
}: AreaFilterItemProps) {

  const areaDomain = useAreaDomain({ opt });

  if (!parentOptionId || !parentOptionLabel || !parentKey || !filterKey || !optionId || !optionLabel) {
    return null;
  }

  const isSelected = useCheckSelected({ selected, filterKey: parentKey, opt, optionId: parentOptionId })

  return (
    <>
      <div className="custom-checkbox has-domain">
        <div className="left-section">
          <label>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() =>
                onToggleParent(
                  filterKey,
                  parentKey,
                  opt[parentOptionId],
                  opt.children.map((c: any) => c[optionId])
                )
              }
            />
            <span className={clsx("checkmark", isSelected && "checked")}></span>
          </label>
          <button
            className={`expand-icon ${parentOpen === opt[parentOptionId] ? "open" : "closed"}`}
            onClick={() => setParentOpen(parentOpen === opt[parentOptionId] ? "" : opt[parentOptionId])}
          >
            <span className="label">{opt[parentOptionLabel]}</span>
            <Seta size={17} />
          </button>
        </div>
        <div className="domain-indicator">{areaDomain}%</div>
      </div>
      <div className={`children ${parentOpen === opt[parentOptionId] ? "open" : "closed"}`}>
        {opt.children.map((child: any) => (
          <TemaFilterItem
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
    </>
  );
} 