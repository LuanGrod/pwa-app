"use client";

import MultiSelectFilter from "@filter/ui/MultiSelect";
import BooleanFilter from "@filter/ui/Boolean";
import FilterWrapperBase from "./Base";

export function Flashcards() {
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
      "flashcards-salvos",
      "Salvos",
      "id_salvo",
      "flashcards_salvos_id_flashcard",
      "flashcards_pergunta"
    ),
    new BooleanFilter("resolvido", "Excluir já resolvidos"),
    new BooleanFilter("resolvido", "Excluir não resolvidos", "0", "nao_resolvido"),
  ];

  return <FilterWrapperBase filterDefinitions={filterDefinitions} entity="flashcards" bigButton />;
}
