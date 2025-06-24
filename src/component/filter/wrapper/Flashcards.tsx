"use client";

import { useFilters } from "@hook/filter/useFilters";
import { useEstudar } from "@hook/useEstudar";
import { useKeyDrawer } from "@hook/useKeyDrawer";
import MultiSelectFilter from "@filter/ui/MultiSelect";
import BooleanFilter from "@filter/ui/Boolean";
import { Grid as FiltersGrid } from "@component/filter/grid/grid";
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

  const {
    values,
    options,
    loadingOptions,
    openDrawer,
    toggleChild,
    toggleParent,
    toggleBoolean,
    buildFilterString,
    definitions,
  } = useFilters(filterDefinitions);

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
      {JSON.stringify(values, null, 2)}
      <ShadowBtn onClick={handleEstudar}>ESTUDAR</ShadowBtn>
      <Filtros
        open={!!drawerKey}
        title={drawerKey ? definitions.find((d) => d.getKey() === drawerKey)?.getLabel() : ""}
        options={drawerKey ? options[drawerKey] || [] : []}
        selected={drawerKey ? values || [] : []}
        onClose={() => setDrawerKey(null)}
        onToggleParent={(filterKey: any, parentKey: any, parentId: any, childrenIds: any[]) =>
          drawerKey && toggleParent(filterKey, parentKey, parentId, childrenIds)
        }
        onToggleChild={(filterKey: any, childId: any, parentKey?: any, parentId?: any, allChildrenIds?: any[]) =>
          drawerKey && toggleChild(filterKey, childId, parentKey, parentId, allChildrenIds)
        }
        loading={drawerKey ? loadingOptions[drawerKey] : false}
        optionLabel={drawerKey ? definitions.find((d) => d.getKey() === drawerKey)?.getLabelParamName() : ""}
        optionId={drawerKey ? definitions.find((d) => d.getKey() === drawerKey)?.getIdParamName() : ""}
        parentOptionLabel={
          drawerKey ? definitions.find((d) => d.getKey() === drawerKey)?.getParentLabelParamName() : ""
        }
        parentOptionId={drawerKey ? definitions.find((d) => d.getKey() === drawerKey)?.getParentIdParamName() : ""}
        filterKey={drawerKey ? definitions.find((d) => d.getKey() === drawerKey)?.getKey() : ""}
        parentKey={drawerKey ? definitions.find((d) => d.getKey() === drawerKey)?.getParentKey() : ""}
      />
    </div>
  );
}
