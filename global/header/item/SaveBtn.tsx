"use client";

import Bandeira from "@global/icons/Bandeira";

type Props = {
  handleSave?: (e?: any) => any;
  status?: boolean;
};

export default function SaveBtn({ handleSave = () => {}, status }: Props) {
  const handleClick = () => {
    handleSave();
  };

  return (
    <button onClick={handleClick} className="btn">
      <Bandeira size={26} changeOnTheme className={status ? "active" : ""} />
    </button>
  );
}
