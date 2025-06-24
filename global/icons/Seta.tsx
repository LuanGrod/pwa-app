import { Icon } from "@public/global/js/types/Icon";
import styles from "./Icon.module.css";
import clsx from "clsx/lite";

export default function Seta({ color = "#000", size, className, changeOnTheme = false }: Icon) {
  return (
    <svg
      className={clsx(changeOnTheme && styles.icon, className)}
      width={size}
      height={size}
      viewBox="0 0 18 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.99999 3.34299L1.92899 10.414L0.514984 8.99999L8.29299 1.22199C8.48051 1.03451 8.73482 0.929199 8.99999 0.929199C9.26515 0.929199 9.51946 1.03451 9.70699 1.22199L17.485 8.99999L16.071 10.414L8.99999 3.34299Z"
        fill={color}
      />
    </svg>
  );
}
