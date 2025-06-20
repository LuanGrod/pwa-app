"use client";

import Fechar from "@global/icons/Fechar";
import clsx from "clsx/lite";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface Props {
  open: boolean;
  title?: string;
  options: any;
  selected: any;
  onClose: () => void;
  onToggle: (opt: any) => void;
  loading: boolean;
  optionLabel?: string;
  optionId?: string;
  isOptionSelected?: (opt: any, selected: any[]) => boolean; // opcional, pode ter lógica padrão
}

export default function Filtros({
  open,
  title,
  options,
  selected,
  onClose,
  onToggle,
  loading,
  optionLabel,
  optionId,
  isOptionSelected,
}: Props) {
  const [drawerRoot, setDrawerRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setDrawerRoot(document.getElementById("drawer-root"));
  }, []);

  const defaultIsSelected = (opt: any, selectedArr: any[]) => selectedArr.some((sel) => sel == opt);

  return (
    drawerRoot &&
    createPortal(
      <div className={clsx("drawer-wrapper", open ? "open" : "closed")}>
        <div className={"close-area"} onClick={onClose}></div>
        <div className={clsx("drawer", open ? "open" : "closed")}>
          <div className={"header"}>
            {title && <h1 className={"title"}>{title}</h1>}
            <div className={"close-btn"} onClick={onClose}>
              <Fechar size={14} changeOnTheme />
            </div>
          </div>
          {options.map((opt: any) => (
            <label key={`${opt[optionId!]}_${opt[optionLabel!]}`} className="custom-checkbox">
              <input
                type="checkbox"
                checked={
                  isOptionSelected
                    ? isOptionSelected(opt[optionId!], selected)
                    : defaultIsSelected(opt[optionId!], selected)
                }
                onChange={() => onToggle(opt)}
              />
              <span className="checkmark"></span>
              {opt[optionLabel!]}
            </label>
          ))}
        </div>
      </div>,
      drawerRoot
    )
  );
}
