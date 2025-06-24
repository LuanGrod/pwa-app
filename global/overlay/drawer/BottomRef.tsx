"use client";

import clsx from "clsx/lite";
import { forwardRef, ReactNode, useEffect, useState } from "react";
import Fechar from "@global/icons/Fechar";
import useDrawer from "@/hook/useDrawer";
import { createPortal } from "react-dom";
import { BottomDrawer } from "./Bottom";

type Props = {
  children: ReactNode;
  title?: string;
};

export const BottomRefDrawer = forwardRef(function BottomDrawerRef({ children, title }: Props, ref) {
  const { isOpen, setIsOpen } = useDrawer({ ref });

  return (
    <BottomDrawer title={title} open={isOpen} onClose={() => setIsOpen(false)}>
      {children}
    </BottomDrawer>
  );
});
