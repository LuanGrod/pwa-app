"use client";

import clsx from "clsx/lite";
import { forwardRef, ReactNode, useEffect, useState } from "react";
import Fechar from "@global/icons/Fechar";
import useDrawer from "@/hook/useDrawer";
import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
  title?: string;
  open?: boolean;
  onClose?: () => void;
};

export function BottomDrawer({ children, title, onClose, open }: Props) {
  const [drawerRoot, setDrawerRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setDrawerRoot(document.getElementById("drawer-root"));
  }, []);

  return (
    drawerRoot &&
    createPortal(
      <div className={clsx("drawer-wrapper", open ? "open" : "closed")}>
        <div className={"close-area"} onClick={onClose}></div>
        <div className={clsx("drawer-bottom", open ? "open" : "closed")}>
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
