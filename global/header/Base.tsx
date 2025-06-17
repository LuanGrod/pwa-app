import { ReactNode } from "react";

type Props = {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
};

export default function BaseHeader({ center, left, right }: Props) {
  return (
    <header className="header-wrapper">
      {left}
      {center}
      {right}
    </header>
  );
}
