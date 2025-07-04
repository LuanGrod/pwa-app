import ConfiguracoesDrawer from "@/component/overlay/drawer/Configuracoes";
import { Dispatch } from "react";
import BaseHeader from "./Base";
import DecreaseFontSizeBtn from "./item/DecreaseFontSizeBtn";
import EditBtn from "./item/EditBtn";
import IncreaseFontSizeBtn from "./item/IncreaseFontSizeBtn";
import MenuToggle from "./item/MenuToggle";
import ReturnRoute from "./item/ReturnRoute";
import SaveBtn from "./item/SaveBtn";

type Props = {
  status: boolean;
  handleSave: () => void;
  handleAddSugestion: () => void;
  elementsIds?: string[];
};

export default function Questao({ elementsIds, status, handleAddSugestion, handleSave }: Props) {
  const RightWrapper = (
    <div className="flex">
      <IncreaseFontSizeBtn elementsIds={elementsIds} />
      <DecreaseFontSizeBtn elementsIds={elementsIds} />
      <SaveBtn handleSave={handleSave} status={status} />
      <EditBtn handleEdit={handleAddSugestion} size={24} />
      <MenuToggle menu={<ConfiguracoesDrawer />} iconSize={26} />
    </div>
  );

  return <BaseHeader left={<ReturnRoute />} right={RightWrapper} className="questoes-header" />;
}
