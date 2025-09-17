import ConfiguracoesDrawer from "@/component/overlay/drawer/Configuracoes";
import useQuestoes from "@/store/QuestaoStore";
import { useUser } from "@global/hook/auth/useUser";
import useToggleStatus from "@global/hook/overlay/useToggleStatus";
import EdicaoSugerida from "@/component/overlay/popup/dialog/EdicaoSugerida";
import BaseHeader from "@global/component/header/Base";
import DecreaseFontSizeBtn from "@global/component/header/item/DecreaseFontSizeBtn";
import EditBtn from "@global/component/header/item/EditBtn";
import IncreaseFontSizeBtn from "@global/component/header/item/IncreaseFontSizeBtn";
import MenuToggle from "@global/component/header/item/MenuToggle";
import ReturnRoute from "@global/component/header/item/ReturnRoute";
import SaveBtn from "@global/component/header/item/SaveBtn";

type Props = {};

export default function Questao({ }: Props) {
  const { handleSave, getCurrentSavedStatus, getCurrent, isSaving } = useQuestoes();
  const { id: userId } = useUser();
  const { isActive, toggle } = useToggleStatus();

  const RightWrapper = (
    <div className="flex">
      <IncreaseFontSizeBtn elementsClassNames={["enunciado", "area-tema", "ano", "conteudo", "gabarito", "alternativa", "comentario", "titulo-referencia", "referencia"]} />
      <DecreaseFontSizeBtn elementsClassNames={["enunciado", "area-tema", "ano", "conteudo", "gabarito", "alternativa", "comentario", "titulo-referencia", "referencia"]} />
      <SaveBtn handleSave={() => handleSave()} disabled={isSaving} status={getCurrentSavedStatus()} />
      <EditBtn handleEdit={toggle} size={24} />
      <MenuToggle menu={<ConfiguracoesDrawer />} iconSize={26} />
    </div>
  );

  return <>
    <BaseHeader left={<ReturnRoute href="/questoes/estatisticas" />} right={RightWrapper} className="questoes-header" />
    <EdicaoSugerida
      onClose={toggle}
      open={isActive}
      estudanteId={userId}
      conteudoId={getCurrent()?.questoes_id || ""}
      conteudoName="id_questao"
      formEntity="edicoes_sugeridas_questoes"
      insertEntity="edicoes-sugeridas-questoes"
    />
  </>;
}
