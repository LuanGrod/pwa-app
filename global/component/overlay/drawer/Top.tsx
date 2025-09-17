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

export function TopDrawer({ children, title, onClose, open, className = "", overlay = false, hasCloseBtn = false }: Props) {

  return (
    <BaseDrawer
      position="top"
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
