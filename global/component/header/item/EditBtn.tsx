"use client";

import Caneta from "@global/component/icon/Caneta";


type Props = {
  handleEdit?: (e?: unknown) => unknown;
  size?: number;
};

export default function EditBtn({ handleEdit = () => {}, size = 23 }: Props) {
  return (
    <button onClick={handleEdit} className="btn">
      <Caneta size={size} changeOnTheme />
    </button>
  );
}
