"use client";

import SelectFilter from "@global/filter/ui/Select";
import FilterWrapperBase from "@global/component/filter/wrapper/Base";
import Logo from "@/component/icon/Logo";
import { SelectionMode } from "@global/filter/ui/FilterInterface";
import useQuestoes from "@/store/QuestaoStore";
import Menos from "@global/component/icons/Menos";
import Mais from "@global/component/icons/Mais";

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
      queryField: "not_used",
      idParamName: "not_used",
      labelFields: ["instituicoes_nome", "provas_ano", "simulados_data_hora_cadastro", "simulados_id_simulado3"],
      customOptionComponent: "HistoricoFilterItem",
      selectionMode: "single" as SelectionMode,
      conditionalOperator: "eq",
      hasClearFilter: false,
      hasSearch: false
    })
  ];

  const timerBtn = () => {
    const { examTimer, incrementTimer, decrementTimer, setTimer, getFormattedTimer } = useQuestoes();

    const canDecrement = examTimer > 60; // Min 1 hour
    const canIncrement = examTimer < 360; // Max 6 hours

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value);
      setTimer(value);
    };

    return (
      <div className="time-range">
        <button
          onClick={decrementTimer}
          disabled={!canDecrement}
          className={`action-btn ${canDecrement ? "" : "disabled"}`}
        >
          <Menos size={20} changeOnTheme className="inverted" />
        </button>

        <div className="input-wrapper">
          <label htmlFor="exam-timer" className="label">Tempo total da prova</label>
          <div className="value">{getFormattedTimer()}</div>
          <input
            type="range"
            min="60"
            max="360"
            step="30"
            id="exam-timer"
            value={examTimer}
            onChange={handleSliderChange}
            className=""
          />
        </div>

        <button
          onClick={incrementTimer}
          disabled={!canIncrement}
          className={`action-btn ${canIncrement ? "" : "disabled"}`}
        >
          <Mais size={20} changeOnTheme className="inverted" />
        </button>
      </div>
    );
  }

  return <FilterWrapperBase filterBtnIcon={<Logo size={26} className="logo" />} filterDefinitions={filterDefinitions} entity="questoes" gridColumns={2} customBtn={timerBtn()} />;
}
