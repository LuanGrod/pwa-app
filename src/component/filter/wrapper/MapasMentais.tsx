"use client";

import SelectFilter from "@global/filter/ui/Select";
import BooleanFilter from "@global/filter/ui/Boolean";
import GroupFilter from "@global/filter/ui/Group";
import FilterWrapperBase from "@/component/filter/wrapper/Base";
import Logo from "@/component/icon/Logo";
import AreaFilterItem from "@/component/overlay/drawer/filter/option/AreaFilterItem";

export function MapasMentais() {
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
          queryFieldEntity: "mapas_mentais",
          parentKeyEntity: "temas",
          connectionOperator: "or",
          customOptionComponent: AreaFilterItem,
        }),
      ],
      connectionOperator: "or",
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
    }),
  ];

  return <FilterWrapperBase filterBtnIcon={<Logo size={26} className="logo" />} filterDefinitions={filterDefinitions} entity="mapas-mentais" gridColumns={2} />;
}
