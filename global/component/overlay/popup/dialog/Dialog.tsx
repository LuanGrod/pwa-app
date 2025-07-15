"use client";

import Fechar from "@global/component/icons/Fechar";
import clsx from "clsx/lite";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
  title?: string;
  open?: boolean;
  overlay?: boolean;
  onClose?: () => void;
  customClass?: string;
};

export default function Dialog({ children, customClass = "", onClose, open, overlay = true, title }: Props) {
  const [dialogRoot, setDialogRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setDialogRoot(document.getElementById("dialog-root"));
  }, []);

  return (
    dialogRoot &&
    createPortal(
      <div className={clsx("popup-wrapper", open ? "open" : "closed", overlay && "overlay")}>
        <div className={"close-area"} onClick={onClose}></div>
        <div className={clsx("popup", open ? "open" : "closed", customClass)}>
          <div className={"header"}>
            {title && <h1 className={"title"}>{title}</h1>}
            <div className={"close-btn"} onClick={onClose}>
              <Fechar size={14} changeOnTheme />
            </div>
          </div>
          {children}
        </div>
      </div>,
      dialogRoot
    )
  );
}
