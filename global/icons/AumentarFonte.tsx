import { Icon } from "@public/global/js/types/Icon";

import clsx from "clsx/lite";

export default function AumentarFonte({ color = "#000", size, className, changeOnTheme = false }: Icon) {
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
        d="M21 27H18.645C18.4088 27.016 18.1746 26.9468 17.985 26.805C17.8213 26.6671 17.6928 26.4923 17.61 26.295L16.11 22.14H7.95L6.45 26.295C6.37258 26.4829 6.24871 26.6481 6.09 26.775C5.90526 26.9288 5.67021 27.0089 5.43 27H3L10.5 8.205H13.5L21 27ZM15.225 19.95L12.63 13.08C12.3834 12.4169 12.1731 11.7409 12 11.055C11.9 11.465 11.795 11.84 11.685 12.18C11.575 12.52 11.47 12.82 11.37 13.08L8.775 19.95H15.225ZM22.5 3L27 9H18L22.5 3Z"
        fill={color}
      />
    </svg>
  );
}
