import { Icon } from "@global/type/props/Icon";

import clsx from "clsx/lite";

export default function DiminuirFonte({ color = "#000", size, className, changeOnTheme = false }: Icon) {
  return (
    <svg
      className={clsx(changeOnTheme && "icon", className)}
      width={size}
      height={size}
      viewBox="0 -3 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 24H16.425C16.2686 24.008 16.1144 23.9602 15.99 23.865C15.8803 23.7765 15.793 23.6634 15.735 23.535L14.685 20.775H9.3L8.25 23.535C8.19625 23.6576 8.11396 23.7656 8.01 23.85C7.88837 23.9518 7.73351 24.0052 7.575 24H6L10.965 11.475H13.035L18 24ZM14.145 19.305L12.42 14.73C12.2565 14.2876 12.1163 13.837 12 13.38C11.94 13.65 11.87 13.9 11.79 14.13L11.58 14.73L9.855 19.23L14.145 19.305ZM22.5 9L27 3H18L22.5 9Z"
        fill={color}
      />
    </svg>
  );
}
