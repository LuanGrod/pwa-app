"use client";

import Bandeira from "@global/component/icons/Bandeira";

type Props = {
  handleSave?: (e?: any) => any;
  status?: boolean;
  disabled?: boolean;
};

export default function SaveBtn({ handleSave = () => {}, status, disabled = false }: Props) {
  const handleClick = () => {
    handleSave();
  };

  return (
    <button onClick={handleClick} className="btn" disabled={disabled}>
      <Bandeira size={26} changeOnTheme className={status ? "active" : ""} />
    </button>
  );
}
