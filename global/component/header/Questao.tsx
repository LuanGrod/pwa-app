import ConfiguracoesDrawer from "@/component/overlay/drawer/Configuracoes";
import BaseHeader from "./Base";
import DecreaseFontSizeBtn from "./item/DecreaseFontSizeBtn";
import EditBtn from "./item/EditBtn";
import IncreaseFontSizeBtn from "./item/IncreaseFontSizeBtn";
import MenuToggle from "./item/MenuToggle";
import ReturnRoute from "./item/ReturnRoute";
import SaveBtn from "./item/SaveBtn";
import useQuestoes from "@/store/QuestaoStore";
import { useUser } from "@global/hook/auth/useUser";
import useDialog from "@global/hook/overlay/useDialog";
import EdicaoSugerida from "@/component/overlay/popup/dialog/EdicaoSugerida";

type Props = {};

export default function Questao({ }: Props) {
  const { handleSave, getCurrentSavedStatus, getCurrent, isSaving } = useQuestoes();
  const { id: userId } = useUser();
  const { isOpen, toggleDialog } = useDialog();

  const RightWrapper = (
    <div className="flex">
      <IncreaseFontSizeBtn elementsClassNames={["enunciado", "area-tema", "ano", "conteudo", "gabarito", "alternativa", "comentario", "titulo-referencia", "referencia", "enviar", "summary"]} />
      <DecreaseFontSizeBtn elementsClassNames={["enunciado", "area-tema", "ano", "conteudo", "gabarito", "alternativa", "comentario", "titulo-referencia", "referencia", "enviar", "summary"]} />
      <SaveBtn handleSave={() => handleSave()} disabled={isSaving} status={getCurrentSavedStatus()} />
      <EditBtn handleEdit={toggleDialog} size={24} />
      <MenuToggle menu={<ConfiguracoesDrawer />} iconSize={26} />
    </div>
  );

  return <>
    <BaseHeader left={<ReturnRoute href="/questoes/estatisticas" />} right={RightWrapper} className="questoes-header" />
    <EdicaoSugerida
      onClose={toggleDialog}
      open={isOpen}
      estudanteId={userId}
      conteudoId={getCurrent()?.questoes_id || ""}
      conteudoName="id_questao"
      formEntity="edicoes_sugeridas_questoes"
      insertEntity="edicoes-sugeridas-questoes"
    />
  </>;
}
