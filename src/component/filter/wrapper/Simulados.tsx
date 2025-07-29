"use client";

import SelectFilter from "@global/filter/ui/Select";
import BooleanFilter from "@global/filter/ui/Boolean";
import FilterWrapperBase from "@global/component/filter/wrapper/Base";
import Logo from "@/component/icon/Logo";

export function Simulados() {
  const filterDefinitions = [
    new SelectFilter({
      entity: "provas",
      label: "Prova na Íntegra",
      queryField: "questoes_id_prova",
      idParamName: "provas_id",
      labelFields: ["estados_nome", "instituicoes_nome", "provas_ano"],
      customComponent: "ProvaFilterItem",
      selectionMode: "single",
      conditionalOperator: "eq"
    }),
  ];

  return <FilterWrapperBase filterBtnIcon={<Logo size={26} className="logo" />} filterDefinitions={filterDefinitions} entity="questoes" gridColumns={2} />;
}
