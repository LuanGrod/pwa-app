import { Icon } from "@public/global/js/types/Icon";
 
import clsx from "clsx/lite";

export default function Grafico({ color = "#000", size, className, changeOnTheme = false }: Icon) {
  return (
    <svg
      className={clsx(changeOnTheme && "icon", className)}
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.09375 18.75H4.21875C3.95987 18.75 3.75 18.9599 3.75 19.2188V27.6562C3.75 27.9151 3.95987 28.125 4.21875 28.125H6.09375C6.35263 28.125 6.5625 27.9151 6.5625 27.6562V19.2188C6.5625 18.9599 6.35263 18.75 6.09375 18.75Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.2188 13.125H17.3438C17.0849 13.125 16.875 13.3349 16.875 13.5938V27.6562C16.875 27.9151 17.0849 28.125 17.3438 28.125H19.2188C19.4776 28.125 19.6875 27.9151 19.6875 27.6562V13.5938C19.6875 13.3349 19.4776 13.125 19.2188 13.125Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.7812 6.5625H23.9062C23.6474 6.5625 23.4375 6.77237 23.4375 7.03125V27.6562C23.4375 27.9151 23.6474 28.125 23.9062 28.125H25.7812C26.0401 28.125 26.25 27.9151 26.25 27.6562V7.03125C26.25 6.77237 26.0401 6.5625 25.7812 6.5625Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.6562 1.875H10.7812C10.5224 1.875 10.3125 2.08487 10.3125 2.34375V27.6562C10.3125 27.9151 10.5224 28.125 10.7812 28.125H12.6562C12.9151 28.125 13.125 27.9151 13.125 27.6562V2.34375C13.125 2.08487 12.9151 1.875 12.6562 1.875Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
