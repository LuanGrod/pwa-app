"use client";

import { useFilters } from "@hook/filter/useFilters";
import { Grid as FiltersGrid } from "@component/filter/grid/grid";
import { useEstudar } from "@hook/useEstudar";
import { useKeyDrawer } from "@hook/useKeyDrawer";
import MultiSelectFilter from "@filter/ui/MultiSelect";
import BooleanFilter from "@filter/ui/Boolean";
import Filtros from "@/component/overlay/drawer/Filtros";
import { Shadow as ShadowBtn } from "@global/button/Shadow";

type AreasTemas = { temas_id_area: string; temas_id: string; areas_nome: string; temas_nome: string };
type FlashcardsSalvos = {
  flashcards_salvos_id_flashcard: string;
  temas_nome: string;
  flashcards_pergunta: string;
  areas_url_imagem: string;
};

export function Flashcards() {
  const filterDefinitions = [
    new MultiSelectFilter(
      "id_tema",
      "Área / Tema",
      "temas",
      "temas_id",
      "temas_nome",
      "id_area",
      "temas_id_area",
      "areas_nome"
    ),
    new MultiSelectFilter(
      "id_area",
      "Salvos",
      "flashcards-salvos",
      "flashcards_salvos_id_flashcard",
      "flashcards_pergunta"
    ),
    new BooleanFilter("resolvido", "Excluir já resolvidos"),
    new BooleanFilter("nao_resolvido", "Excluir não resolvidos"),
  ];

  const { values, options, loadingOptions, openDrawer, toggleOption, toggleBoolean, buildFilterString, definitions } =
    useFilters(filterDefinitions);

  const { drawerKey, setDrawerKey, handleOpenDrawer } = useKeyDrawer({ openDrawer });
  const handleEstudar = useEstudar({ buildFilterString: buildFilterString, entity: "flashcards" });

  return (
    <div className="filter-wrapper">
      <FiltersGrid
        filters={values}
        definitions={definitions}
        onOpenDrawer={handleOpenDrawer}
        onToggleBoolean={toggleBoolean}
        big
      />
      {JSON.stringify(values)}
      <ShadowBtn onClick={handleEstudar}>ESTUDAR</ShadowBtn>
      <Filtros
        open={!!drawerKey}
        title={drawerKey ? definitions.find((d) => d.getKey() === drawerKey)?.getLabel() : ""}
        options={drawerKey ? options[drawerKey] || [] : []}
        selected={drawerKey ? values[drawerKey] || [] : []}
        onClose={() => setDrawerKey(null)}
        onToggle={(opt) =>
          drawerKey &&
          toggleOption(drawerKey, opt[definitions.find((d) => d.getKey() === drawerKey)?.getIdParamName()!])
        }
        // onToggle={(opt) => drawerKey && toggleOption(drawerKey, opt)}
        loading={drawerKey ? loadingOptions[drawerKey] : false}
        optionLabel={drawerKey ? definitions.find((d) => d.getKey() === drawerKey)?.getLabelParamName() : ""}
        optionId={drawerKey ? definitions.find((d) => d.getKey() === drawerKey)?.getIdParamName() : ""}
      />
    </div>
  );
}
