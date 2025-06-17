"use client";

import Elipse from "@global/icons/Elipse";
import { Overlay } from "@public/global/js/types/Overlay";
import { cloneElement, ReactElement, useRef } from "react";

type Props = {
  menu: ReactElement<{ menuRef?: React.RefObject<Overlay | null> }>;
  icon?: ReactElement;
};

export default function MenuToggle({ menu, icon = <Elipse size={29} changeOnTheme /> }: Props) {
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
