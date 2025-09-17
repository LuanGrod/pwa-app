
import ConfiguracoesDrawer from "@/component/overlay/drawer/Configuracoes";
import BaseHeader from "@global/component/header/Base";
import MenuToggle from "@global/component/header/item/MenuToggle";
import ReturnRoute from "@global/component/header/item/ReturnRoute";

type Props = {
  title: string;
};

export default function Flashcards({ title }: Props) {
  return (
    <BaseHeader
      left={<ReturnRoute href="/flashcards/estatisticas" />}
      center={<p className="flashcard-header title">{title}</p>}
      right={<MenuToggle menu={<ConfiguracoesDrawer />} iconSize={24} />}
      className="flashcards-header"
    />
  );
}
