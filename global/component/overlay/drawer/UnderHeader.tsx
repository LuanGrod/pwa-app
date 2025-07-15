"use client";

import clsx from "clsx/lite";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
  open?: boolean;
  onClose?: () => void;
  customClass?: string;
};

export function UnderHeader({ children, onClose, open, customClass = "" }: Props) {
  const [drawerRoot, setDrawerRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setDrawerRoot(document.getElementById("drawer-root"));
  }, []);

  return (
    drawerRoot &&
    createPortal(
      <div className={clsx("drawer-wrapper", open ? "open" : "closed")}>
        <div className={"close-area"} onClick={onClose}></div>
        <div className={clsx("drawer-under-header", open ? "open" : "closed", customClass)}>
          {children}
        </div>
      </div>,
      drawerRoot
    )
  );
}
