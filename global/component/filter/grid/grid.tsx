import { Filter as FilterBtn } from "@global/component/button/Filter";
import { Switch as SwitchBtn } from "@global/component/button/Switch";
import FilterInterface from "@global/filter/ui/FilterInterface";
import { ReactNode } from "react";

interface FiltrosGridProps {
  filters: Record<string, any>;
  definitions: FilterInterface[];
  onOpenDrawer: (key: string) => void;
  onToggleBoolean: (key: string, value: any) => void;
  gridColumns?: 2 | 3;
  filterBtnIcon: ReactNode;
  customBtn?: ReactNode;
}

// Helper to flatten definitions, extracting children from groups
function flattenDefinitions(definitions: FilterInterface[]): FilterInterface[] {
  return definitions.flatMap((def) =>
    typeof def.isGroup === "function" && def.isGroup()
      ? flattenDefinitions(def.getChildren())
      : [def]
  );
}

export function Grid({ filters, definitions, onOpenDrawer, onToggleBoolean, gridColumns = 3, filterBtnIcon, customBtn }: FiltrosGridProps) {
  const flatDefinitions = flattenDefinitions(definitions);
  const selectFIlters = flatDefinitions.filter((def) => def.getType() === "select");
  const booleanFilters = flatDefinitions.filter((def) => def.getType() === "boolean");

  return (
    <div>
      <div className={`select-wrapper grid-${gridColumns}`}>
        {selectFIlters.map((def) => (
          <FilterBtn icon={filterBtnIcon} key={def.getKey()} onClick={() => onOpenDrawer(def.getKey())} label={def.getLabel()} />
        ))}
      </div>
      <div className="boolean-wrapper">
        {booleanFilters.map((def) => (
          <SwitchBtn
            key={def.getKey()}
            active={filters[def.getQueryField()] === def.getActiveValue()}
            onClick={() =>
              onToggleBoolean(
                def.getQueryField(),
                filters[def.getQueryField()] === def.getActiveValue() ? "" : def.getActiveValue()
              )
            }
          >
            {def.getLabel()}
          </SwitchBtn>
        ))}
        {customBtn}
      </div>
    </div>
  );
}
