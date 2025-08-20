"use client";

import SelectFilter from "@global/filter/ui/Select";
import BooleanFilter from "@global/filter/ui/Boolean";
import GroupFilter from "@global/filter/ui/Group";
import FilterWrapperBase from "@global/component/filter/wrapper/Base";
import Logo from "@/component/icon/Logo";

export function Flashcards() {
  const filterDefinitions = [
    new GroupFilter({
      children: [
        new SelectFilter({
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
          connectionOperator: "or",
        }),
      ],
      connectionOperator: "or",
    }),
    new SelectFilter({
      entity: "flashcards-salvos",
      label: "Salvos",
      queryField: "id_flashcard",
      idParamName: "flashcards_salvos_id_flashcard",
      labelParamName: "flashcards_pergunta",
      queryFieldEntity: "flashcards_salvos",
      connectionOperator: "or",
    }),
    new BooleanFilter({
      queryField: "nao_resolvido",
      label: "Excluir já resolvidos",
      key: "resolvido",
      activeValue: "0"
    }),
    new BooleanFilter({
      queryField: "resolvido",
      label: "Excluir não resolvidos",
    }),
  ];

  return <FilterWrapperBase filterBtnIcon={<Logo size={26} className="logo" />} filterDefinitions={filterDefinitions} entity="flashcards" gridColumns={2} />;
}
