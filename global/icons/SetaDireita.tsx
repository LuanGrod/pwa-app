import { Icon } from "@public/global/js/types/Icon";

import clsx from "clsx/lite";

export default function SetaDireita({ color = "#000", size, className, changeOnTheme = false }: Icon) {
  return (
    <svg className={clsx(changeOnTheme && "icon", className)}
      width={size}
      height={size} viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.7071 8.70711C24.0976 8.31658 24.0976 7.68342 23.7071 7.29289L17.3431 0.928932C16.9526 0.538408 16.3195 0.538408 15.9289 0.928932C15.5384 1.31946 15.5384 1.95262 15.9289 2.34315L21.5858 8L15.9289 13.6569C15.5384 14.0474 15.5384 14.6805 15.9289 15.0711C16.3195 15.4616 16.9526 15.4616 17.3431 15.0711L23.7071 8.70711ZM0 8V9H23V8V7H0V8Z" fill={color} />
    </svg>
  );
}
