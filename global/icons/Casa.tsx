import { Icon } from "@public/global/js/types/Icon";
import clsx from "clsx/lite";

export default function Casa({ color = "#000", size, className, changeOnTheme = false }: Icon) {
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
        d="M4.6875 12.4219V26.25C4.6875 26.4986 4.78627 26.7371 4.96209 26.9129C5.1379 27.0887 5.37636 27.1875 5.625 27.1875H11.25V19.2188C11.25 18.8458 11.3982 18.4881 11.6619 18.2244C11.9256 17.9607 12.2833 17.8125 12.6562 17.8125H17.3438C17.7167 17.8125 18.0744 17.9607 18.3381 18.2244C18.6018 18.4881 18.75 18.8458 18.75 19.2188V27.1875H24.375C24.6236 27.1875 24.8621 27.0887 25.0379 26.9129C25.2137 26.7371 25.3125 26.4986 25.3125 26.25V12.4219"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.125 15L15.6381 3.04689C15.3451 2.73751 14.6602 2.734 14.3619 3.04689L1.875 15M23.4375 10.4883V3.75001H20.625V7.79298"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
