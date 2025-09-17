"use client";

import { ReactNode } from "react";

type FilterProps = {
  onClick?: () => void;
  icon: ReactNode;
  label: string;
  className?: string;
};

export function Filter({ onClick = () => { }, label, icon, className = "" }: FilterProps) {
  return (
    <button className={`btn-filter ${className}`} onClick={onClick}>
      {icon}
      <p className="label">{label}</p>
    </button>
  );
}
