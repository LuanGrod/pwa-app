"use client";

import MultiSelectFilter from "@global/filter/ui/MultiSelect";
import BooleanFilter from "@global/filter/ui/Boolean";
import FilterWrapperBase from "@global/component/filter/wrapper/Base";
import Logo from "@/component/icon/Logo";

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
      queryFieldEntity: "flashcards",
      parentKeyEntity: "temas",
    }),
    new MultiSelectFilter({
      entity: "flashcards-salvos",
      label: "Salvos",
      queryField: "id_flashcard",
      idParamName: "flashcards_salvos_id_flashcard",
      labelParamName: "flashcards_pergunta",
      queryFieldEntity: "flashcards_salvos",
      connectionOperator: "or",
    }),
    new BooleanFilter({
      queryField: "resolvido",
      label: "Excluir já resolvidos",
    }),
    new BooleanFilter({
      queryField: "resolvido",
      label: "Excluir não resolvidos",
      activeValue: "0",
      key: "nao_resolvido",
    }),
  ];

  return <FilterWrapperBase filterBtnIcon={<Logo size={26} className="logo" />} filterDefinitions={filterDefinitions} entity="flashcards" bigButton />;
}
