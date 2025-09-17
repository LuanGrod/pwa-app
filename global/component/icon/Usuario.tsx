import { Icon } from "@global/type/props/Icon";
 
import clsx from "clsx/lite";

export default function Usuario({ color = "#000", size, className, changeOnTheme = false }: Icon) {
  return (
    <svg
      className={clsx(changeOnTheme && "icon", className)}
      width={size}
      height={size}
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.1246 28.1146C26.499 26.3601 25.1171 24.8105 23.1962 23.705C21.2754 22.5995 18.9214 22 16.5 22C14.0786 22 11.7246 22.5995 9.80374 23.705C7.88287 24.8105 6.50099 26.3601 5.87537 28.1146"
        stroke={color}
        strokeLinecap="round"
      />
      <path
        d="M16.5 16.5C19.5376 16.5 22 14.0376 22 11C22 7.96243 19.5376 5.5 16.5 5.5C13.4624 5.5 11 7.96243 11 11C11 14.0376 13.4624 16.5 16.5 16.5Z"
        stroke={color}
        strokeLinecap="round"
      />
    </svg>
  );
}
