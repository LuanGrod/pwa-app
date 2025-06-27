"use client";

import clsx from "clsx/lite";
import { ReactNode, useEffect, useState } from "react";
import Fechar from "@global/icons/Fechar";
import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
  title?: string;
  open?: boolean;
  overlay?: boolean;
  onClose?: () => void;
  customClass?: string;
};

export function BottomDrawer({ children, title, onClose, open, customClass = "", overlay = true }: Props) {
  const [drawerRoot, setDrawerRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setDrawerRoot(document.getElementById("drawer-root"));
  }, []);

  return (
    drawerRoot &&
    createPortal(
      <div className={clsx("drawer-wrapper", open ? "open" : "closed", overlay && "overlay")}>
        <div className={"close-area"} onClick={onClose}></div>
        <div className={clsx("drawer-bottom", open ? "open" : "closed", customClass)}>
          <div className={"header"}>
            {title && <h1 className={"title"}>{title}</h1>}
            <div className={"close-btn"} onClick={onClose}>
              <Fechar size={14} changeOnTheme />
            </div>
          </div>
          {children}
        </div>
      </div>,
      drawerRoot
    )
  );
}
