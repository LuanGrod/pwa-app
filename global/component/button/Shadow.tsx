import { DetailedHTMLProps, ButtonHTMLAttributes, ReactNode } from "react";

type ShadowProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  children?: ReactNode;
};

export function Shadow({ children, ...props }: ShadowProps) {
  const { className, ...restProps } = props;
  return (
    <button className={`btn-shadow ${className ?? ""}`} {...restProps}>
      {children}
    </button>
  );
}
