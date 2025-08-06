"use client";

import SelectFilter from "@global/filter/ui/Select";
import FilterWrapperBase from "@global/component/filter/wrapper/Base";
import Logo from "@/component/icon/Logo";
import { SelectionMode } from "@global/filter/ui/FilterInterface";
import useQuestoes from "@/store/QuestaoStore";
import RangeSelector from "@global/component/button/RangeSelector";
import { useEffect } from "react";
import { useUser } from "@global/hook/auth/useUser";

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
    new SelectFilter({
      entity: "simulados",
      label: "Histórico",
      queryField: "",
      idParamName: "",
      labelFields: ["instituicoes_nome", "provas_ano", "simulados_data_hora_cadastro", "simulados_id_simulado3"],
      customOptionComponent: "HistoricoFilterItem",
      selectionMode: "single" as SelectionMode,
      conditionalOperator: "eq",
      hasClearFilter: false,
      hasSearch: false
    })
  ];

  const { examDuration, setExamDuration, getFormattedRemainingTime, setUser, setIndex, clearAnswers, setTestFinished } = useQuestoes();
  const { id: userId } = useUser();

  useEffect(() => {
    setExamDuration(60); // Padrão: 1 hora
    setUser(userId);
    setIndex(0);
    clearAnswers();
    setTestFinished(false);
  }, [userId])

  return (
    <FilterWrapperBase
      filterBtnIcon={<Logo size={26} className="logo" />}
      filterDefinitions={filterDefinitions}
      entity="simulado"
      gridColumns={2}
      mustHaveFilters={true}
      afterComponent={
        <RangeSelector
          label="Tempo total da prova"
          value={examDuration}
          onIncrement={() => setExamDuration(examDuration + 30)}
          onDecrement={() => setExamDuration(examDuration - 30)}
          minValue={60}
          maxValue={360}
          step={30}
          renderedValue={getFormattedRemainingTime()}
        />
      }
    />
  );
}
