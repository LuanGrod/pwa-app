"use client";

import MultiSelectFilter from "@filter/ui/MultiSelect";
import BooleanFilter from "@filter/ui/Boolean";
import FilterWrapperBase from "./Base";

export function Flashcards() {
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
      entity: "flashcards-salvos",
      label: "Salvos",
      queryField: "id_flashcard",
      idParamName: "flashcards_salvos_id_flashcard",
      labelParamName: "flashcards_pergunta",
      queryFieldEntity: "flashcards_salvos",
    }),
    new BooleanFilter({
      queryField: "resolvido",
      label: "Excluir já resolvidos",
      denialOperator: true
    }),
    new BooleanFilter({
      queryField: "resolvido",
      label: "Excluir não resolvidos",
      denialOperator: true,
      activeValue: "0",
      key: "nao_resolvido",
    }),
  ];

  return <FilterWrapperBase filterDefinitions={filterDefinitions} entity="flashcards" bigButton />;
}
