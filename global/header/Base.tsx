import { ReactNode } from "react";

type Props = {
  className?: string;
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
};

export default function BaseHeader({ center, left, right, className = "" }: Props) {
  return (
    <header className={`header-wrapper ${className}`}>
      {left}
      {center}
      {right}
    </header>
  );
}
