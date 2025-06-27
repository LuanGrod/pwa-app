"use client";

import FilterInterface from "@/filter/ui/FilterInterface";
import { useFilters } from "@/hook/filter/useFilters";
import { useEstudar } from "@/hook/useEstudar";
import { useKeyDrawer } from "@/hook/useKeyDrawer";
import { Grid as FiltersGrid } from "@component/filter/grid/grid";
import Filtros from "@/component/overlay/drawer/Filtros";
import { Shadow as ShadowBtn } from "@global/button/Shadow";
import useSearch from "@/hook/useSearch";

type Props = {
  filterDefinitions: FilterInterface[];
  entity: string;
  bigButton?: boolean;
};

export default function FilterWrapperBase({ filterDefinitions, entity, bigButton }: Props) {
  const {
    values,
    options,
    loadingOptions,
    openDrawer,
    toggleChild,
    toggleParent,
    toggleBoolean,
    buildFilterString,
    definitions,
    clearFilter,
  } = useFilters(filterDefinitions);

  const { drawerKey, setDrawerKey, handleOpenDrawer } = useKeyDrawer({ openDrawer });

  const handleEstudar = useEstudar({ buildFilterString: buildFilterString, entity: entity });

  const currentDefinition = drawerKey ? definitions.find((d) => d.getKey() === drawerKey) : null;

  return (
    <div className="filter-wrapper">
      <FiltersGrid
        filters={values}
        definitions={definitions}
        onOpenDrawer={handleOpenDrawer}
        onToggleBoolean={toggleBoolean}
        big={bigButton}
      />
      <ShadowBtn className="filter" onClick={handleEstudar}>
        ESTUDAR
      </ShadowBtn>
      <Filtros
        open={!!drawerKey}
        title={currentDefinition?.getLabel()}
        options={drawerKey ? options[drawerKey] || [] : []}
        selected={drawerKey ? values || [] : []}
        onClose={() => setDrawerKey(null)}
        onToggleParent={toggleParent}
        onToggleChild={toggleChild}
        loading={drawerKey ? loadingOptions[drawerKey] : false}
        optionLabel={currentDefinition?.getLabelParamName()}
        optionId={currentDefinition?.getIdParamName()}
        parentOptionLabel={currentDefinition?.getParentLabelParamName()}
        parentOptionId={currentDefinition?.getParentIdParamName()}
        filterKey={currentDefinition?.getKey()}
        parentKey={currentDefinition?.getParentKey()}
        onClearFilter={clearFilter}
        hasSearch
      />
    </div>
  );
}
