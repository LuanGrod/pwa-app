import { Icon } from "@public/global/js/Types/Icon";
import styles from "./Icon.module.css";
import clsx from "clsx/lite";

export default function Voltar({ color = "#000", size, className, changeOnTheme = false }: Icon) {
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
        d="M19.2188 6.5625L10.7812 15L19.2188 23.4375"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
