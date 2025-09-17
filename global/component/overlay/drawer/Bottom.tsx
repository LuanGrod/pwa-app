"use client";

import { ReactNode } from "react";
import { BaseDrawer } from "./Base";

type Props = {
  children: ReactNode;
  title?: string;
  open?: boolean;
  overlay?: boolean;
  onClose?: () => void;
  className?: string;
  hasCloseBtn?: boolean;
};

export function BottomDrawer({ children, title, onClose, open, className = "", overlay = true, hasCloseBtn = true }: Props) {

  return (
    <BaseDrawer
      position="bottom"
      className={className}
      onClose={onClose}
      open={open}
      title={title}
      overlay={overlay}
      hasCloseBtn={hasCloseBtn}
    >
      {children}
    </BaseDrawer>
  );
}
