"use client";

import { ReactNode } from "react";
import { BaseDrawer } from "./Base";

type Props = {
  children: ReactNode;
  title?: string;
  open?: boolean;
  overlay?: boolean;
  onClose?: () => void;
  customClass?: string;
  hasCloseBtn?: boolean;
};

export function BottomDrawer({ children, title, onClose, open, customClass = "", overlay = true, hasCloseBtn = true }: Props) {

  return (
    <BaseDrawer
      position="bottom"
      customClass={customClass}
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
