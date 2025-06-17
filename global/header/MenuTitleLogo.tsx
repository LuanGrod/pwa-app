import { ReactElement } from "react";
import { Overlay } from "@public/global/js/types/Overlay";
import MenuToggle from "@global/header/item/MenuToggle";
import BaseHeader from "./Base";
import LogoOverlay from "./item/LogoOverlay";

type Props = {
  title: string;
  menu: ReactElement<{ menuRef?: React.RefObject<Overlay | null> }>;
};

export default function MenuTitleLogo({ title, menu }: Props) {
  return (
    <BaseHeader
      left={<MenuToggle menu={menu} />}
      center={<p className="menu-title-logo title">{title}</p>}
      right={<LogoOverlay />}
    />
  );
}
