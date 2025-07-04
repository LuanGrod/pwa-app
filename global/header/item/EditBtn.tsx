"use client";

import Editar from "@global/icons/Editar";


type Props = {
  handleEdit?: (e?: unknown) => unknown;
  size?: number;
};

export default function EditBtn({ handleEdit = () => {}, size = 23 }: Props) {
  return (
    <button onClick={handleEdit} className="btn">
      <Editar size={size} changeOnTheme />
    </button>
  );
}
