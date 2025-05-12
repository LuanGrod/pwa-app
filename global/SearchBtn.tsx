"use client";

import Lupa from "./icons/Lupa";
import styles from "./SearchBtn.module.css";

type Props = {
  handleSearch: (e?: unknown) => unknown;
};

export default function SearchBtn({ handleSearch }: Props) {
  return (
    <div onClick={handleSearch} className={styles.container}>
      <Lupa size={23} changeOnTheme />
    </div>
  );
}
