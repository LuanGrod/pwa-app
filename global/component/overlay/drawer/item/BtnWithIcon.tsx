import { Icon } from "@global/type/props/Icon";
import { ReactElement } from "react";

type Props = {
  onClick: () => void;
  icon: ReactElement<Icon>;
  label: string;
};

export default function DrawerBtnWithIcon({ onClick, icon, label }: Props) {
  return (
    <button onClick={onClick} className="link">
      {icon}
      <p>{label}</p>
    </button>
  );
}
