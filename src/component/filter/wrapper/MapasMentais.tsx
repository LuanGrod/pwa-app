"use client";

import SelectFilter from "@global/filter/ui/Select";
import BooleanFilter from "@global/filter/ui/Boolean";
import FilterWrapperBase from "@global/component/filter/wrapper/Base";
import Logo from "@/component/icon/Logo";

export function MapasMentais() {
  const filterDefinitions = [
    new SelectFilter({
      entity: "temas",
      label: "Área / Tema",
      queryField: "id_tema",
      idParamName: "temas_id",
      labelParamName: "temas_nome",
      parentKey: "id_area",
      parentIdParamName: "temas_id_area",
      parentLabelParamName: "areas_nome",
      queryFieldEntity: "mapas_mentais",
      parentKeyEntity: "temas",
    }),
    new SelectFilter({
      entity: "mapas-mentais-salvos",
      label: "Salvos",
      queryField: "id_mapa_mental",
      idParamName: "mapas_mentais_salvos_id_mapa_mental",
      labelParamName: "mapas_mentais_nome",
      queryFieldEntity: "mapas_mentais_salvos",
      connectionOperator: "or",
    }),
    new BooleanFilter({
      queryField: "nao_visto",
      label: "Excluir já visualizados",
      denialOperator: true,
    }),
  ];

  return <FilterWrapperBase filterBtnIcon={<Logo size={26} className="logo" />} filterDefinitions={filterDefinitions} entity="mapas-mentais" gridColumns={2} />;
}
