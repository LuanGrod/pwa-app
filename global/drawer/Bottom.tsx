"use client";

import clsx from "clsx/lite";
import { forwardRef, ReactNode } from "react";
import Fechar from "../icons/Fechar";
import useDrawer from "@/app/hooks/useDrawer";
import styles from "./Bottom.module.css";

type Props = {
  children: ReactNode;
  title?: string;
};

export const BottomDrawer = forwardRef(function BottomDrawer({ children, title }: Props, ref) {
  const { isOpen, setIsOpen } = useDrawer({ ref });

  return (
    <div className={clsx(styles.container, isOpen ? styles.open : styles.closed)}>
      <div className={styles.close_area} onClick={() => setIsOpen(false)}></div>
      <div className={clsx(styles.drawer, isOpen ? styles.open : styles.closed)}>
        <div className={styles.header}>
          {title && <h1 className={styles.title}>{title}</h1>}
          <div className={styles.close_btn} onClick={() => setIsOpen(false)}>
            <Fechar size={14} changeOnTheme/>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
});
