"use client";

import Editar from "@global/icons/Editar";


type Props = {
  handleEdit?: (e?: unknown) => unknown;
};

export default function EditBtn({ handleEdit = () => {} }: Props) {
  return (
    <button onClick={handleEdit} className="btn2">
      <Editar size={21} changeOnTheme />
    </button>
  );
}
