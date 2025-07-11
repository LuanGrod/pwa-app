import { Icon } from "@public/global/js/types/Icon";
 
import clsx from "clsx/lite";

export default function MudarTema({ color = "#000", size, className, changeOnTheme = false }: Icon) {
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
        d="M16.5 29.9062C23.9041 29.9062 29.9062 23.9041 29.9062 16.5C29.9062 9.09593 23.9041 3.09375 16.5 3.09375C9.09593 3.09375 3.09375 9.09593 3.09375 16.5C3.09375 23.9041 9.09593 29.9062 16.5 29.9062Z"
        stroke={color}
        strokeMiterlimit="10"
      />
      <path
        d="M16.5 11.3438V21.6562C17.8675 21.6562 19.179 21.113 20.146 20.146C21.113 19.179 21.6562 17.8675 21.6562 16.5C21.6562 15.1325 21.113 13.821 20.146 12.854C19.179 11.887 17.8675 11.3438 16.5 11.3438ZM16.5 3.09375V11.3438C15.1325 11.3438 13.821 11.887 12.854 12.854C11.887 13.821 11.3438 15.1325 11.3438 16.5C11.3438 17.8675 11.887 19.179 12.854 20.146C13.821 21.113 15.1325 21.6562 16.5 21.6562V29.9062C9.09563 29.9062 3.09375 23.9044 3.09375 16.5C3.09375 9.09563 9.09563 3.09375 16.5 3.09375Z"
        fill={color}
      />
    </svg>
  );
}
