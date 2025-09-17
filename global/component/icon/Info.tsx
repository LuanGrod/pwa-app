import { Icon } from "@global/type/props/Icon";
 
import clsx from "clsx/lite";

export default function Info({ color = "#000", size, className, changeOnTheme = false }: Icon) {
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
        d="M28.875 16.5C28.875 18.1251 28.5549 19.7343 27.933 21.2357C27.3111 22.7371 26.3996 24.1013 25.2504 25.2504C24.1013 26.3996 22.7371 27.3111 21.2357 27.933C19.7343 28.5549 18.1251 28.875 16.5 28.875C14.8749 28.875 13.2657 28.5549 11.7643 27.933C10.2629 27.3111 8.89868 26.3996 7.74955 25.2504C6.60043 24.1013 5.68889 22.7371 5.06699 21.2357C4.44509 19.7343 4.125 18.1251 4.125 16.5C4.125 13.2179 5.42879 10.0703 7.74955 7.74955C10.0703 5.42879 13.2179 4.125 16.5 4.125C19.7821 4.125 22.9297 5.42879 25.2504 7.74955C27.5712 10.0703 28.875 13.2179 28.875 16.5Z"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 22V15.125H15.8125M15.8125 22H17.1875M16.5 11.6875V11"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
