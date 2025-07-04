"use client";

import Bandeira from "@global/icons/Bandeira";

type Props = {
  handleSave?: () => void;
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
