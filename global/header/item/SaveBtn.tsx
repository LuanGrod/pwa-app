"use client";

import Bandeira from "@global/icons/Bandeira";
import { useState } from "react";


type Props = {
  handleSave?: (e?: unknown) => unknown;
  status?: boolean;
};

export default function SaveBtn({ handleSave = () => {}, status }: Props) {

  const handleClick = () => {
    handleSave();
  }

  return (
    <button onClick={handleClick} className="btn2">
      <Bandeira size={26} changeOnTheme className={status ? "active" : ""} />
    </button>
  );
}
