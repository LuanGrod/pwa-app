import clsx from "clsx/lite";
import { forwardRef, ReactNode, useImperativeHandle, useState } from "react";
import Fechar from "../icons/Fechar";
import useDrawer from "@/app/hooks/useDrawer";

type Props = {
  children: ReactNode;
  title?: string;
};

export const BottomDrawer = forwardRef(function BottomDrawer({ children, title }: Props, ref) {
  const { isOpen, setIsOpen } = useDrawer({ ref });

  return (
    <div className={clsx("bottom-drawer-container", isOpen ? "open" : "closed")}>
      <div className="close-area" onClick={() => setIsOpen(false)}></div>
      <div className={clsx("bottom-drawer", isOpen ? "open" : "closed")}>
        <header className="header">
          {title && <h1 className="title">{title}</h1>}
          <div className="close-btn" onClick={() => setIsOpen(false)}>
            <Fechar size={14} />
          </div>
        </header>
        {children}
      </div>
    </div>
  );
});
