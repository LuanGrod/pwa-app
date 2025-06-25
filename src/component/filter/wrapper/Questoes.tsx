"use client";

import { useFilters } from "@hook/filter/useFilters";
import { Grid as FiltersGrid } from "@component/filter/grid/grid";
import { useEstudar } from "@hook/useEstudar";
import { useKeyDrawer } from "@hook/useKeyDrawer";
import MultiSelectFilter from "@filter/ui/MultiSelect";
import BooleanFilter from "@filter/ui/Boolean";
import Filtros from "@/component/overlay/drawer/Filtros";
import { Shadow as ShadowBtn } from "@global/button/Shadow";
import FilterWrapperBase from "./Base";

type Tipo = { id: string | number; title: string };

export function Questoes() {
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
      "instituicoes",
      "Instituição",
      "id_instituicao",
      "instituicoes_id",
      "instituicoes_nome"
    ),
    new MultiSelectFilter(
      "provas2",
      "Ano da prova",
      "provas_ano",
      "provas_ano",
      "provas_ano"
    ),
    new MultiSelectFilter(
      "instituicoes2",
      "Cidade / Estado",
      "id_cidade",
      "instituicoes_id_cidade",
      "cidades_nome",
      "id_estado",
      "cidades_id_estado",
      "estados_nome"
    ),
    new MultiSelectFilter(
      "questoes-salvos",
      "Salvos",
      "id_salvo",
      "questoes_salvos_id_questao",
      "questoes_enunciado"
    ),
    new BooleanFilter("anulada", "Excluir anuladas ou desatualizadas"),
    new BooleanFilter("sem_comentario", "Excluir questões sem comentários"),
    new BooleanFilter("resolvida", "Excluir já resolvidas"),
    new BooleanFilter("acerto", "Excluir questões que acertei"),
    new BooleanFilter("erro", "Excluir questões que errei"),
  ];

  return <FilterWrapperBase filterDefinitions={filterDefinitions} entity="questoes" />;
}
