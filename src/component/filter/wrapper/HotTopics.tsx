"use client";

import SelectFilter from "@global/filter/ui/Select";
import BooleanFilter from "@global/filter/ui/Boolean";
import FilterWrapperBase from "@global/component/filter/wrapper/Base";
import Logo from "@/component/icon/Logo";

export function HotTopics() {
  const filterDefinitions = [
    new SelectFilter({
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
    new SelectFilter({
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

  return <FilterWrapperBase filterBtnIcon={<Logo size={26} className="logo" />} filterDefinitions={filterDefinitions} entity="hot-topics" gridColumns={2} />;
}
