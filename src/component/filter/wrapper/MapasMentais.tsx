"use client";

import { useFilters } from "@hook/filter/useFilters";
import { Grid as FiltersGrid } from "@component/filter/grid/grid";
import { useEstudar } from "@hook/useEstudar";
import { useKeyDrawer } from "@hook/useKeyDrawer";
import MultiSelectFilter from "@filter/ui/MultiSelect";
import BooleanFilter from "@filter/ui/Boolean";
import Filtros from "@/component/overlay/drawer/Filtros";
import { Shadow as ShadowBtn } from "@global/button/Shadow";

type Tipo = { id: string | number; title: string };

export function MapasMentais() {
  const filterDefinitions = [
    new MultiSelectFilter("temas", "Área / Tema", "temas"),
    new MultiSelectFilter("salvos", "Salvos", "salvos"),
    new BooleanFilter("visualizado", "Excluir já visualizados"),
  ];

  const { values, options, loadingOptions, openDrawer, toggleOption, toggleBoolean, buildFilterString, definitions } =
    useFilters(filterDefinitions);

  const { drawerKey, setDrawerKey, handleOpenDrawer } = useKeyDrawer({ openDrawer });
  const handleEstudar = useEstudar({ buildFilterString: buildFilterString, entity: "mapas-mentais" });

  return (
    <div className="filter-wrapper">
      <FiltersGrid
        filters={values}
        definitions={definitions}
        onOpenDrawer={handleOpenDrawer}
        onToggleBoolean={toggleBoolean}
        big
      />
      <ShadowBtn onClick={handleEstudar}>ESTUDAR</ShadowBtn>
      <Filtros<Tipo>
        open={!!drawerKey}
        title={drawerKey ? definitions.find((d) => d.getKey() === drawerKey)?.getLabel() : ""}
        options={drawerKey ? options[drawerKey] || [] : []}
        selected={drawerKey ? (values[drawerKey] as Tipo[]) || [] : []}
        onClose={() => setDrawerKey(null)}
        onToggle={(opt) => drawerKey && toggleOption(drawerKey, opt)}
        loading={drawerKey ? loadingOptions[drawerKey] : false}
        getOptionLabel={(opt) => opt.title}
        getOptionKey={(opt) => opt.id}
      />
    </div>
  );
}
