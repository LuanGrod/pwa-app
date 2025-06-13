import { Filter as FilterBtn } from "@/component/button/Filter";
import { Switch as SwitchBtn } from "@/component/button/Switch";
import FilterInterface from "@filter/ui/FilterInterface";

interface FiltrosGridProps {
  filters: Record<string, any>;
  definitions: FilterInterface[];
  onOpenDrawer: (key: string) => void;
  onToggleBoolean: (key: string) => void;
}

export function Grid({ filters, definitions, onOpenDrawer, onToggleBoolean }: FiltrosGridProps) {
  const multiSelectFIlters = definitions.filter((def) => def.getType() === "multi-select");
  const booleanFilters = definitions.filter((def) => def.getType() === "boolean");

  return (
    <div>
      <div className="multi-select-wrapper">
        {multiSelectFIlters.map((def) => (
          <FilterBtn key={def.getKey()} onClick={() => onOpenDrawer(def.getKey())} label={def.getLabel()} />
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
