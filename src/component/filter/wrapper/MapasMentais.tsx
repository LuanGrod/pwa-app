"use client";

import MultiSelectFilter from "@filter/ui/MultiSelect";
import BooleanFilter from "@filter/ui/Boolean";
import FilterWrapperBase from "./Base";

export function MapasMentais() {
  const filterDefinitions = [
    new MultiSelectFilter(
      "temas",
      "Área / Tema",
      "id_tema",
      "temas_id",
      "temas_nome",
      "id_area",
      "temas_id_area",
      "areas_nome"
    ),
    new MultiSelectFilter(
      "mapas-mentais-salvos",
      "Salvos",
      "id_salvo",
      "mapas_mentais_salvos_id_mapa_mental",
      "mapas_mentais_nome"
    ),
    new BooleanFilter("visualizado", "Excluir já visualizados"),
  ];

  return <FilterWrapperBase filterDefinitions={filterDefinitions} entity="mapas-mentais" bigButton />;
}
