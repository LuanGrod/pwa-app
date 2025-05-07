import { Icon } from "@public/global/js/types/Icon";
import styles from "./Icon.module.css";
import clsx from "clsx/lite";

export default function Bandeira({ color = "#000", size, className, changeOnTheme = false }: Icon) {
  return (
    <svg
      className={clsx(changeOnTheme && styles.icon, className)}
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.6875 27.1875V3.99258C4.68779 3.91058 4.70959 3.83008 4.75071 3.75914C4.79184 3.6882 4.85086 3.62928 4.92188 3.58828C5.37949 3.31992 6.61641 2.8125 9.375 2.8125C13.125 2.8125 17.8711 5.625 20.625 5.625C22.1798 5.62101 23.7183 5.30687 25.1502 4.70098C25.168 4.69354 25.1874 4.69062 25.2066 4.69249C25.2259 4.69436 25.2443 4.70095 25.2604 4.71168C25.2765 4.72241 25.2896 4.73694 25.2987 4.75399C25.3078 4.77103 25.3125 4.79006 25.3125 4.80938V17.6625C25.3124 17.7079 25.2991 17.7522 25.2742 17.7902C25.2493 17.8282 25.214 17.8581 25.1725 17.8764C24.6896 18.0879 22.9881 18.75 20.625 18.75C17.8125 18.75 13.125 16.875 9.375 16.875C5.625 16.875 4.6875 17.8125 4.6875 17.8125"
        stroke={color}
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  );
}
