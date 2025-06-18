"use client";

import Lupa from "@global/icons/Lupa";


type Props = {
  handleSearch?: (e?: unknown) => unknown;
};

export default function SearchBtn({ handleSearch = () => {} }: Props) {
  return (
    <button onClick={handleSearch} className="btn">
      <Lupa size={23} changeOnTheme />
    </button>
  );
}
