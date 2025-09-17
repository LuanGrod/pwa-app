import { Icon } from "@global/type/props/Icon";

import clsx from "clsx/lite";

export default function Camera({ color = "#000", size, className, changeOnTheme = false }: Icon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(changeOnTheme && "icon", className)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" stroke={color} />
      <circle cx="12" cy="13" r="3" stroke={color} />
    </svg>
  );
}
