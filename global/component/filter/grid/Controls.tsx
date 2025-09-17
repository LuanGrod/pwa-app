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
  beforeComponent?: ReactNode;
  afterComponent?: ReactNode;
}

export default function Controls({ filters, definitions, onOpenDrawer, onToggleBoolean, gridColumns = 3, filterBtnIcon, beforeComponent, afterComponent }: FiltrosGridProps) {
  const flatDefinitions = definitions.flatMap(def => def.getFlatChildren());
  const selectFIlters = flatDefinitions.filter((def) => def.getType() === "select");
  const booleanFilters = flatDefinitions.filter((def) => def.getType() === "boolean");

  return (
    <div>
      {beforeComponent && (
        <div className="custom-component-wrapper">
          {beforeComponent}
        </div>
      )}
      {
        selectFIlters.length > 0 && (
          <div className={`select-wrapper grid-${gridColumns}`}>
            {selectFIlters.map((def) => (
              <FilterBtn icon={filterBtnIcon} key={def.getKey()} onClick={() => onOpenDrawer(def.getKey())} label={def.getLabel()} />
            ))}
          </div>
        )
      }
      {
        booleanFilters.length > 0 && (
          <div className="boolean-wrapper">
            {booleanFilters.map((def) => (
              <SwitchBtn
                key={def.getKey() + def.getActiveValue()}
                active={filters[def.getKey()] === def.getActiveValue()}
                onClick={() =>
                  onToggleBoolean(
                    def.getKey(),
                    filters[def.getKey()] === def.getActiveValue() ? "" : def.getActiveValue()
                  )
                }
              >
                {def.getLabel()}
              </SwitchBtn>
            ))}
          </div>
        )
      }
      {afterComponent && (
        <div className="custom-component-wrapper">
          {afterComponent}
        </div>
      )}
    </div>
  );
}
