"use client";

import MultiSelectFilter from "@filter/ui/MultiSelect";
import BooleanFilter from "@filter/ui/Boolean";
import FilterWrapperBase from "./Base";

export function HotTopics() {
  const filterDefinitions = [
    new MultiSelectFilter(
      "temas",
      "Área / Tema",
      "id_tema",
      "temas_id",
      "temas_nome",
      "id_area",
      "temas_id_area",
      "areas_nome",
      "",
      "temas"
    ),
    new MultiSelectFilter(
      "hot-topics-salvos",
      "Salvos",
      "id_salvo",
      "hot_topics_salvos_id_hot_topic",
      "hot_topics_nome"
    ),
    new BooleanFilter("visualizado", "Excluir já visualizados"),
  ];

  return <FilterWrapperBase filterDefinitions={filterDefinitions} entity="hot-topics" bigButton />;
}
