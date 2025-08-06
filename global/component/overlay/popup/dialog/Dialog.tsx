"use client";

import Fechar from "@global/component/icons/Fechar";
import clsx from "clsx/lite";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react"

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
      <AnimatePresence>
        {
          open && (
            <motion.div 
              key="modal" 
              className={clsx("popup-wrapper", open ? "open" : "closed", overlay && "overlay")} 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className={"close-area"} onClick={onClose}></div>
              <motion.div 
                className={clsx("popup", open ? "open" : "closed", customClass)}
                initial={{ opacity: 0, y: "7px" }} 
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className={"header"}>
                  {title && <h1 className={"title"}>{title}</h1>}
                  <div className={"close-btn"} onClick={onClose}>
                    <Fechar size={14} changeOnTheme />
                  </div>
                </div>
                {children}
              </motion.div>
            </motion.div>
          )
        }
      </AnimatePresence>,
      dialogRoot
    )
  );
}
