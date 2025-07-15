"use client";

import { forwardRef, ReactNode } from "react";
import useDrawer from "@global/hook/overlay/useDrawer";
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
