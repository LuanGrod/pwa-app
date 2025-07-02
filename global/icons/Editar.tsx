import { Icon } from "@public/global/js/types/Icon";

import clsx from "clsx/lite";

export default function Editar({ color = "#000", size, className, changeOnTheme = false }: Icon) {
  return (
    <svg
      className={clsx(changeOnTheme && "icon", className)}
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.6375 5.04995L18.7125 7.96245L14.025 3.27495L16.95 0.362451C17.4375 -0.125049 18.25 -0.125049 18.7125 0.362451L21.6375 3.28745C22.125 3.74995 22.125 4.56245 21.6375 5.04995ZM0.75 16.5624L13.325 3.97495L18.0125 8.66245L5.4375 21.25H0.75V16.5624ZM17.775 1.29995L15.85 3.22495L18.775 6.14995L20.7 4.22495L17.775 1.29995ZM16.2 8.74995L13.25 5.79995L2 17.0749V20H4.925L16.2 8.74995Z"
        fill={color}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeWidth={3}
      />
    </svg>
  );
}
