"use client";

import SelectFilter from "@global/filter/ui/Select";
import BooleanFilter from "@global/filter/ui/Boolean";
import GroupFilter from "@global/filter/ui/Group";
import FilterWrapperBase from "@global/component/filter/wrapper/Base";
import Logo from "@/component/icon/Logo";
import useQuestoes from "@/store/QuestaoStore";
import { useUser } from "@global/hook/auth/useUser";
import { useEffect } from "react";

export function Questoes() {
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
          queryFieldEntity: "questoes",
          parentKeyEntity: "temas",
          connectionOperator: "or",
          customOptionComponent: "AreaFilterItem",
        }),
      ],
      connectionOperator: "or",
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
      queryFieldEntity: "questoes",
      queryField: "com_comentario",
      label: "Excluir questões sem comentários",
    }),
    new BooleanFilter({
      queryField: "nao_resolvido",
      label: "Excluir já resolvidas",
    }),
    new BooleanFilter({
      queryField: "gabarito",
      label: "Excluir questões que acertei",
      denialOperator: true,
      key: "errei_ou_nao_respondi",
    }),
    new BooleanFilter({
      queryField: "gabarito_ou_sem_resposta",
      label: "Excluir questões que errei",
      key: "acertei_ou_nao_respondi",
    }),
    new BooleanFilter({
      queryField: "questoes_com_imagem",
      label: "Excluir questões sem imagem",
      key: "imagem"
    }),
    new BooleanFilter({
      queryField: "questoes_sem_imagem",
      label: "Excluir questões com imagem",
      key: "imagem",
      activeValue: "0"
    }),
  ];

  const { setUser, setIndex, clearAnswers, setPack } = useQuestoes();
  const { id: userId } = useUser();

  useEffect(() => {
    setUser(userId);
    setIndex(0);
    clearAnswers();
    setPack([]);
  }, [userId])


  return <FilterWrapperBase filterBtnIcon={<Logo size={14} className="logo" />} filterDefinitions={filterDefinitions} entity="questoes" gridColumns={3} />;
}
