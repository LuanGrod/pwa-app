import { DetailedHTMLProps, ButtonHTMLAttributes, ReactNode } from "react";
import Logo from "../../src/component/icon/Logo";

type FilterProps = {
  onClick: () => void;
  label: string;
};

export function Filter({ onClick, label }: FilterProps) {
  return (
    <button className="btn-filter" onClick={onClick}>
      <Logo size={14}/>
      <p className="label">{label}</p>
    </button>
  );
}
