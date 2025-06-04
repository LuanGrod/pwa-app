import { ReactElement } from "react";
import { Modal } from "@public/global/js/types/Modal";
import styles from "./MenuTitleLogo.module.css";
import LogoOverlay from "@global/LogoOverlay";
import MenuToggle from "@global/MenuToggle";
import BaseHeader from "./Base";

type Props = {
  title: string;
  menu: ReactElement<{ menuRef?: React.RefObject<Modal | null> }>;
};

export default function MenuTitleLogo({ title, menu }: Props) {
  return (
    <BaseHeader
      left={<MenuToggle menu={menu} />}
      center={<p className={styles.title}>{title}</p>}
      right={<LogoOverlay />}
    />
  );
}
