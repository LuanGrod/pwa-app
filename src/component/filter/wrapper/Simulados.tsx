"use client";

import SelectFilter from "@global/filter/ui/Select";
import FilterWrapperBase from "@global/component/filter/wrapper/Base";
import Logo from "@/component/icon/Logo";
import { SelectionMode } from "@global/filter/ui/FilterInterface";

export function Simulados() {
  const filterDefinitions = [
    new SelectFilter({
      entity: "provas",
      label: "Prova na Íntegra",
      queryField: "questoes_id_prova",
      idParamName: "provas_id",
      labelFields: ["estados_uf", "instituicoes_nome", "provas_ano"],
      customOptionComponent: "ProvaFilterItem",
      selectionMode: "single" as SelectionMode,
      conditionalOperator: "eq",
      hasClearFilter: false
    }),
  ];

  return <FilterWrapperBase filterBtnIcon={<Logo size={26} className="logo" />} filterDefinitions={filterDefinitions} entity="questoes" gridColumns={2} />;
}
