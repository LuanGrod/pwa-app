import { Icon } from "@public/global/js/types/Icon";
import clsx from "clsx/lite";

export default function Menos({ color = "#000", size, className, changeOnTheme = false }: Icon) {
  return (
    <svg className={clsx(changeOnTheme && "icon", className)}
      width={size}
      height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.8334 10.8317H4.16675V9.16504H15.8334V10.8317Z" fill={color} />
    </svg>
  );
}
