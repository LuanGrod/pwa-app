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
  elementsClassNames?: string[];
};

export default function Questao({ elementsClassNames, status, handleAddSugestion, handleSave }: Props) {


  return ;
}
