"use client";

import MultiSelectFilter from "@filter/ui/MultiSelect";
import BooleanFilter from "@filter/ui/Boolean";
import FilterWrapperBase from "./Base";

export function MapasMentais() {
  const filterDefinitions = [
    new MultiSelectFilter({
      entity: "temas",
      label: "Área / Tema",
      queryField: "id_tema",
      idParamName: "temas_id",
      labelParamName: "temas_nome",
      parentKey: "id_area",
      parentIdParamName: "temas_id_area",
      parentLabelParamName: "areas_nome",
    }),
    new MultiSelectFilter({
      entity: "mapas-mentais-salvos",
      label: "Salvos",
      queryField: "id_mapa_mental",
      idParamName: "mapas_mentais_salvos_id_mapa_mental",
      labelParamName: "mapas_mentais_nome",
      queryFieldEntity: "mapas_mentais_salvos",
    }),
    new BooleanFilter({
      queryField: "nao_visto",
      label: "Excluir já visualizados",
      denialOperator: true,
      queryFieldEntity: "mapas_mentais_estudantes"
    }),
  ];

  return <FilterWrapperBase filterDefinitions={filterDefinitions} entity="mapas-mentais" bigButton />;
}
