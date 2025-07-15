import ReturnRoute from "./item/ReturnRoute";
import BaseHeader from "./Base";
import MenuToggle from "./item/MenuToggle";
import ConfiguracoesDrawer from "@/component/overlay/drawer/Configuracoes";

type Props = {
  title: string;
};

export default function Flashcards({ title }: Props) {
  return (
    <BaseHeader
      left={<ReturnRoute />}
      center={<p className="flashcard-header title">{title}</p>}
      right={<MenuToggle menu={<ConfiguracoesDrawer />} iconSize={24} />}
      className="flashcards-header"
    />
  );
}
