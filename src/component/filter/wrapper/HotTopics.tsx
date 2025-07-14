"use client";

import MultiSelectFilter from "@filter/ui/MultiSelect";
import BooleanFilter from "@filter/ui/Boolean";
import FilterWrapperBase from "./Base";

export function HotTopics() {
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
      queryFieldEntity: "hot_topics",
      parentKeyEntity: "temas",
    }),
    new MultiSelectFilter({
      entity: "hot-topics-salvos",
      label: "Salvos",
      queryField: "id_hot_topic",
      idParamName: "hot_topics_salvos_id_hot_topic",
      labelParamName: "hot_topics_nome",
      queryFieldEntity: "hot_topics_salvos",
      connectionOperator: "or",
    }),
    new BooleanFilter({
      queryField: "nao_visto",
      label: "Excluir já visualizados",
      denialOperator: true
    }),
  ];

  return <FilterWrapperBase filterDefinitions={filterDefinitions} entity="hot-topics" bigButton />;
}
