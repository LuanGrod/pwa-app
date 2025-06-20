import { Filter as FilterBtn } from "@global/button/Filter";
import { Switch as SwitchBtn } from "@global/button/Switch";
import FilterInterface from "@filter/ui/FilterInterface";

interface FiltrosGridProps {
  filters: Record<string, any>;
  definitions: FilterInterface[];
  onOpenDrawer: (key: string) => void;
  onToggleBoolean: (key: string) => void;
  big?: boolean;
}

export function Grid({ filters, definitions, onOpenDrawer, onToggleBoolean, big = false }: FiltrosGridProps) {
  const multiSelectFIlters = definitions.filter((def) => def.getType() === "multi-select");
  const booleanFilters = definitions.filter((def) => def.getType() === "boolean");

  return (
    <div>
      <div className="multi-select-wrapper">
        {multiSelectFIlters.map((def) => (
          <FilterBtn
            big={big}
            key={def.getKey()}
            onClick={() => onOpenDrawer(def.getKey())}
            label={def.getLabel()}
          />
        ))}
      </div>
      <div className="boolean-wrapper">
        {booleanFilters.map((def) => (
          <SwitchBtn key={def.getKey()} active={filters[def.getKey()]} onClick={() => onToggleBoolean(def.getKey())}>
            {def.getLabel()}
          </SwitchBtn>
        ))}
      </div>
    </div>
  );
}
