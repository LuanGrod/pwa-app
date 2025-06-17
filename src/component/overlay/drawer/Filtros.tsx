"use client";

import Fechar from "@global/icons/Fechar";
import clsx from "clsx/lite";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface Props<T> {
  open: boolean;
  title?: string;
  options: T[];
  selected: T[];
  onClose: () => void;
  onToggle: (opt: T) => void;
  loading: boolean;
  getOptionLabel: (opt: T) => string;
  getOptionKey: (opt: T) => string | number;
  isOptionSelected?: (opt: T, selected: T[]) => boolean; // opcional, pode ter lógica padrão
}

export default function Filtros<T>({
  open,
  title,
  options,
  selected,
  onClose,
  onToggle,
  loading,
  getOptionLabel,
  getOptionKey,
  isOptionSelected,
}: Props<T>) {
  const [drawerRoot, setDrawerRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setDrawerRoot(document.getElementById("drawer-root"));
  }, []);

  const defaultIsSelected = (opt: T, selectedArr: T[]) =>
    selectedArr.some((sel) => getOptionKey(sel) === getOptionKey(opt));

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
          <h1>aaaaaaaaaa</h1>
          {options.map((opt) => (
            <label key={getOptionKey(opt)} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={isOptionSelected ? isOptionSelected(opt, selected) : defaultIsSelected(opt, selected)}
                onChange={() => onToggle(opt)}
                className="mr-2"
              />
              {getOptionLabel(opt)}
            </label>
          ))}
        </div>
      </div>,
      drawerRoot
    )
  );
}
