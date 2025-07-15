"use client";

import clsx from "clsx/lite";
import { ReactNode, useEffect, useState } from "react";
import Fechar from "@global/component/icons/Fechar";
import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
  title?: string;
  open?: boolean;
  overlay?: boolean;
  onClose?: () => void;
  customClass?: string;
  position: "top" | "bottom";
  hasCloseBtn?: boolean;
};

export function BaseDrawer({ children, title, onClose, open, customClass = "", overlay = true, position, hasCloseBtn = true }: Props) {
  const [drawerRoot, setDrawerRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setDrawerRoot(document.getElementById("drawer-root"));
  }, []);

  return (
    drawerRoot &&
    createPortal(
      <div className={clsx("drawer-wrapper", open ? "open" : "closed", overlay && "overlay")}>
        <div className={"close-area"} onClick={onClose}></div>
        <div className={clsx(`drawer-${position}`, open ? "open" : "closed", customClass)}>
          {
            title &&
            <div className={"header"}>
              <h1 className={"title"}>{title}</h1>
            </div>
          }
          {
            hasCloseBtn &&
            <div className={"close-btn"} onClick={onClose}>
              <Fechar size={14} changeOnTheme />
            </div>
          }
          {children}
        </div>
      </div>,
      drawerRoot
    )
  );
}
