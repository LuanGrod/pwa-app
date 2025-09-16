"use client";

import { forwardRef, ReactNode } from "react";
import useRefDrawer from "@global/hook/overlay/useRefDrawer";
import { BottomDrawer } from "./Bottom";

type Props = {
  children: ReactNode;
  title?: string;
};

export const BottomRefDrawer = forwardRef(function BottomDrawerRef({ children, title }: Props, ref) {
  const { isOpen, setIsOpen } = useRefDrawer({ ref });

  return (
    <BottomDrawer title={title} open={isOpen} onClose={() => setIsOpen(false)}>
      {children}
    </BottomDrawer>
  );
});
