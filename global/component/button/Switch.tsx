import { DetailedHTMLProps, ButtonHTMLAttributes, ReactNode } from "react";

type SwitchProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  children?: ReactNode;
  active?: boolean;
};

export function Switch({ children, active = false, ...props }: SwitchProps) {
  const { className, ...restProps } = props;
  return (
    <button className={`btn-switch ${active ? "active" : ""} ${className ?? ""}`} {...restProps}>
      {children}
    </button>
  );
}
