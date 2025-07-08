import ConfiguracoesDrawer from "@/component/overlay/drawer/Configuracoes";
import BaseHeader from "./Base";
import DecreaseFontSizeBtn from "./item/DecreaseFontSizeBtn";
import EditBtn from "./item/EditBtn";
import IncreaseFontSizeBtn from "./item/IncreaseFontSizeBtn";
import MenuToggle from "./item/MenuToggle";
import ReturnRoute from "./item/ReturnRoute";
import SaveBtn from "./item/SaveBtn";
import useQuestoes from "@/store/QuestaoStore";
import { useUser } from "@/hook/auth/useUser";
import useDialog from "@/hook/overlay/useDialog";
import EdicaoSugerida from "@/component/overlay/popup/dialog/EdicaoSugerida";

type Props = {};

export default function Questao({}: Props) {
  const { handleSave, getCurrentQuestaoSavedStatus, getCurrentQuestao } = useQuestoes();
  const { id: userId } = useUser();
  const { isOpen, toggleDialog } = useDialog();

  const RightWrapper = (
    <div className="flex">
      <IncreaseFontSizeBtn elementsClassNames={["enunciado", "area-tema", "ano", "conteudo", "gabarito", "alternativa", "comentario", "titulo-referencia", "referencia"]} />
      <DecreaseFontSizeBtn elementsClassNames={["enunciado", "area-tema", "ano", "conteudo", "gabarito", "alternativa", "comentario", "titulo-referencia", "referencia"]} />
      <SaveBtn handleSave={() => handleSave(userId)} status={getCurrentQuestaoSavedStatus()} />
      <EditBtn handleEdit={toggleDialog} size={24} />
      <MenuToggle menu={<ConfiguracoesDrawer />} iconSize={26} />
    </div>
  );

  return <>
    <BaseHeader left={<ReturnRoute />} right={RightWrapper} className="questoes-header" />
    {isOpen && (
      <EdicaoSugerida
        onClose={toggleDialog}
        open={isOpen}
        estudanteId={userId}
        conteudoId={getCurrentQuestao()?.questoes_id || ""}
        conteudoName="id_questao"
        formEntity="edicoes_sugeridas_questoes"
        insertEntity="edicoes-sugeridas-questoes"
      />
    )}
  </>;
}
