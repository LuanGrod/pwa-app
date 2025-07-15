"use client";

import Lupa from "@global/component/icons/Lupa";

type Props = {
  handleSearch?: () => void;
};

export default function SearchBtn({ handleSearch = () => {} }: Props) {
  return (
    <button onClick={handleSearch} className="btn">
      <Lupa size={23} changeOnTheme />
    </button>
  );
}
