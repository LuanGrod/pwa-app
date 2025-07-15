import { createElement, HTMLElementType, ReactNode } from "react";

type FilterProps = {
  onClick: () => void;
  icon: ReactNode;
  label: string;
  big?: boolean;
};

export function Filter({ onClick, label, big = false, icon }: FilterProps) {
  return (
    <button className={`btn-filter ${big ? "big" : ""}`} onClick={onClick}>
      {icon}
      <p className="label">{label}</p>
    </button>
  );
}
