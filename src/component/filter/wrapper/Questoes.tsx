"use client";

import SelectFilter from "@global/filter/ui/Select";
import BooleanFilter from "@global/filter/ui/Boolean";
import FilterWrapperBase from "@global/component/filter/wrapper/Base";
import Logo from "@/component/icon/Logo";

export function Questoes() {
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
      queryFieldEntity: "questoes",
      parentKeyEntity: "temas",
    }),
    new SelectFilter({
      entity: "instituicoes",
      label: "Instituição",
      queryField: "id_instituicao",
      idParamName: "instituicoes_id",
      labelParamName: "instituicoes_nome",
      queryFieldEntity: "provas",
    }),
    new SelectFilter({
      entity: "provas2",
      label: "Ano da prova",
      queryField: "ano",
      idParamName: "provas_ano",
      labelParamName: "provas_ano",
      queryFieldEntity: "provas",
    }),
    new SelectFilter({
      entity: "questoes",
      label: "Tipo de questão",
      queryField: "tipo_questao",
      idParamName: "questoes_id",
      labelParamName: "questoes_enunciado",
    }),
    new SelectFilter({
      entity: "instituicoes2",
      label: "Cidade / Estado",
      queryField: "id_cidade",
      idParamName: "instituicoes_id_cidade",
      labelParamName: "cidades_nome",
      parentKey: "id_estado",
      parentIdParamName: "cidades_id_estado",
      parentLabelParamName: "estados_nome",
      queryFieldEntity: "instituicoes",
      parentKeyEntity: "cidades",
    }),
    new SelectFilter({
      entity: "questoes-salvos",
      label: "Salvos",
      queryField: "id_questao",
      idParamName: "questoes_salvos_id_questao",
      labelParamName: "questoes_enunciado",
      queryFieldEntity: "questoes_salvos",
      connectionOperator: "or",
    }),
    new BooleanFilter({
      queryField: "anulada",
      label: "Excluir anuladas",
      denialOperator: true,
    }),
    new BooleanFilter({
      queryField: "desatualizada",
      label: "Excluir desatualizadas",
      denialOperator: true,
    }),
    new BooleanFilter({
      queryField: "com_comentario",
      label: "Excluir questões sem comentários",
    }),
    new BooleanFilter({
      queryField: "questoes_nao_resolvido",
      label: "Excluir já resolvidas",
      queryFieldEntity: "respostas_questoes",
    }),
    new BooleanFilter({
      queryField: "gabarito",
      label: "Excluir questões que acertei",
      denialOperator: true,
    }),
    new BooleanFilter({
      queryField: "gabarito2",
      label: "Excluir questões que errei",
      denialOperator: true,
    }),
    new BooleanFilter({
      queryField: "questoes_com_imagem",
      label: "Excluir questões sem imagem",
    }),
    new BooleanFilter({
      queryField: "questoes_com_imagem",
      label: "Excluir questões com imagem",
      denialOperator: true,
      activeValue: "0",
      key: "sem_imagem",
    }),
  ];

  return <FilterWrapperBase filterBtnIcon={<Logo size={14} className="logo" />} filterDefinitions={filterDefinitions} entity="questoes" gridColumns={3} />;
}
