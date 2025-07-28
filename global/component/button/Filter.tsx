"use client";

import { createElement, HTMLElementType, ReactNode } from "react";

type FilterProps = {
  onClick?: () => void;
  icon: ReactNode;
  label: string;
};

export function Filter({ onClick = () => { }, label, icon }: FilterProps) {
  return (
    <button className="btn-filter" onClick={onClick}>
      {icon}
      <p className="label">{label}</p>
    </button>
  );
}
