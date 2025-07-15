import { Filter as FilterBtn } from "@global/component/button/Filter";
import { Switch as SwitchBtn } from "@global/component/button/Switch";
import FilterInterface from "@global/filter/ui/FilterInterface";
import { ReactNode } from "react";

interface FiltrosGridProps {
  filters: Record<string, any>;
  definitions: FilterInterface[];
  onOpenDrawer: (key: string) => void;
  onToggleBoolean: (key: string, value: any) => void;
  big?: boolean;
  filterBtnIcon: ReactNode;
}

export function Grid({ filters, definitions, onOpenDrawer, onToggleBoolean, big = false, filterBtnIcon }: FiltrosGridProps) {
  const multiSelectFIlters = definitions.filter((def) => def.getType() === "multi-select");
  const booleanFilters = definitions.filter((def) => def.getType() === "boolean");

  return (
    <div>
      <div className="multi-select-wrapper">
        {multiSelectFIlters.map((def) => (
          <FilterBtn icon={filterBtnIcon} big={big} key={def.getKey()} onClick={() => onOpenDrawer(def.getKey())} label={def.getLabel()} />
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
      </div>
    </div>
  );
}
