"use client";

import Elipse from "@global/component/icon/Elipse";
import { Overlay } from "@public/global/js/types/Overlay";
import { cloneElement, ReactElement, useRef } from "react";

type Props = {
  menu: ReactElement<{ menuRef?: React.RefObject<Overlay | null> }>;
  icon?: ReactElement;
  iconSize?: number;
};

export default function MenuToggle({ menu, iconSize = 29, icon = <Elipse size={iconSize} changeOnTheme /> }: Props) {
  const menuRef = useRef<Overlay>(null);

  const menuWithRef = cloneElement(menu, { menuRef });

  return (
    <>
      <button onClick={() => menuRef.current?.toggle()} className="btn">
        {icon}
      </button>
      {menuWithRef}
    </>
  );
}
