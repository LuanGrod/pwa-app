"use client";

import Loading2 from "@global/overlay/popup/dialog/Loading2";
import { useSearchParams } from "next/navigation";
import { Viewing } from "@/component/viewing/Viewing";
import { Questao as QuestaoType } from "@/type/Entities";
import Questao from "@/component/Questao";
import useQuestoes from "@/store/QuestaoStore";
import { useEffect } from "react";
import QuestaoHeader from "@global/header/Questao";
import QuestaoFooter from "@/component/footer/QuestaoFooter";
import EdicaoSugerida from "@/component/overlay/popup/dialog/EdicaoSugerida";
import IncreaseFontSizeBtn from "@global/header/item/IncreaseFontSizeBtn";
import DecreaseFontSizeBtn from "@global/header/item/DecreaseFontSizeBtn";
import SaveBtn from "@global/header/item/SaveBtn";
import EditBtn from "@global/header/item/EditBtn";
import MenuToggle from "@global/header/item/MenuToggle";
import ConfiguracoesDrawer from "@/component/overlay/drawer/Configuracoes";
import ReturnRoute from "@global/header/item/ReturnRoute";
import BaseHeader from "@global/header/Base";
import useToggleAddRemove from "@/hook/useToggleAddRemove";
import useDialog from "@/hook/overlay/useDialog";
import { useUser } from "@/hook/auth/useUser";
import SetaEsquerda from "@global/icons/SetaEsquerda";
import SetaDireita from "@global/icons/SetaDireita";

type Props = {};

export default function page({ }: Props) {
  const filters = useSearchParams().get("filters") || "";
  const {
    questoesLista,
    setQuestoesLista,
    index,
    getInsertData,
    nextIndex,
    previousIndex,
    getCurrentQuestao,
    countQuestoes,
    currentAnswer,
    registerAnswer,
  } = useQuestoes();
  const { isOpen, toggleDialog } = useDialog();
  const { id: userId } = useUser();

  const { toggleAddRemove } = useToggleAddRemove({
    data: questoesLista,
    entity: "questoes-salvos",
    idParamName: "questoes_salvos_id",
    insertData: getInsertData(userId),
    setData: setQuestoesLista,
  });

  const mockHandler = () => { };

  const RightWrapper = (
    <div className="flex">
      <IncreaseFontSizeBtn elementsClassNames={["enunciado", "area-tema", "ano", "conteudo"]} />
      <DecreaseFontSizeBtn elementsClassNames={["enunciado", "area-tema", "ano", "conteudo"]} />
      <SaveBtn handleSave={mockHandler} status={!!getCurrentQuestao().questoes_salvos_id} />
      <EditBtn handleEdit={mockHandler} size={24} />
      <MenuToggle menu={<ConfiguracoesDrawer />} iconSize={26} />
    </div>
  );

  return (
    <>
      <BaseHeader left={<ReturnRoute />} right={RightWrapper} className="questoes-header" />
      <main className="content-wrapper questoes">
        <Viewing
          data={getCurrentQuestao()}
          loading={false}
          error={null}
          loadingComponent={<Loading2 loading />}
          renderItem={(item: QuestaoType) => <Questao data={item} />}
        />
        {isOpen && (
          <EdicaoSugerida
            onClose={toggleDialog}
            open={isOpen}
            estudanteId={userId}
            conteudoId={getCurrentQuestao().questoes_id}
            conteudoName="id_questao"
            formEntity="edicoes_sugeridas_questoes"
            insertEntity="edicoes-sugeridas-questoes"
          />
        )}
      </main>
      <footer className="questoes-footer">
        <div className="buttons">
          <button className="navigation" onClick={previousIndex} disabled={index === 0}>
            <SetaEsquerda size={23} changeOnTheme className="inverted" />
          </button>
          <div className="enviar-wrapper">
            <button className="enviar" onClick={(e) => registerAnswer(userId)}>
              VER RESPOSTA
            </button>
          </div>
          <button className="navigation" onClick={nextIndex} disabled={index + 1 >= countQuestoes()}>
            <SetaDireita size={23} changeOnTheme className="inverted" />
          </button>
        </div>
        <p className="summary">Q{index + 1} de {countQuestoes()}</p>
      </footer>
    </>
  );
}
