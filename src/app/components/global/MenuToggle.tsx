"use client";

import { Modal } from "@public/global/js/Types/Modal";
import { cloneElement, ReactElement, useRef } from "react";
import styles from "./MenuToggle.module.css";
import Elipse from "./icons/Elipse";

type Props = {
  menu: ReactElement<{ menuRef?: React.RefObject<Modal | null> }>;
  icon?: ReactElement;
};

export default function MenuToggle({ menu, icon = <Elipse size={29} changeOnTheme /> }: Props) {
  const menuRef = useRef<Modal>(null);

  const menuWithRef = cloneElement(menu, { menuRef });

  return (
    <>
      <div onClick={() => menuRef.current?.toggle()} className={styles.container}>
        {icon}
      </div>
      {menuWithRef}
    </>
  );
}
