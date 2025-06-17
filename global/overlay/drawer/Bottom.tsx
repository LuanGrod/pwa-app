"use client";

import clsx from "clsx/lite";
import { forwardRef, ReactNode, useEffect, useState } from "react";
import Fechar from "@global/icons/Fechar";
import useDrawer from "@/hook/useDrawer";
import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
  title?: string;
};

export const BottomDrawer = forwardRef(function BottomDrawer({ children, title }: Props, ref) {
  const { isOpen, setIsOpen } = useDrawer({ ref });
  const [drawerRoot, setDrawerRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setDrawerRoot(document.getElementById("drawer-root"));
  }, []);

  return drawerRoot && createPortal(
    <div className={clsx("drawer-wrapper", isOpen ? "open" : "closed")}>
      <div className={"close-area"} onClick={() => setIsOpen(false)}></div>
      <div className={clsx("drawer", isOpen ? "open" : "closed")}>
        <div className={"header"}>
          {title && <h1 className={"title"}>{title}</h1>}
          <div className={"close-btn"} onClick={() => setIsOpen(false)}>
            <Fechar size={14} changeOnTheme />
          </div>
        </div>
        {children}
      </div>
    </div>,
    drawerRoot
  );
});
