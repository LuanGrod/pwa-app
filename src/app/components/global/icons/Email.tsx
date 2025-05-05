import { Icon } from "@public/global/js/types/Icon";
import clsx from "clsx/lite";

export default function Email({ color = "#000", size, className }: Icon) {
  return (
    <svg
      className={clsx("icon", className)}
      width={size}
      height={size}
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.3281 6.1875H5.67188C4.24802 6.1875 3.09375 7.34177 3.09375 8.76562V24.2344C3.09375 25.6582 4.24802 26.8125 5.67188 26.8125H27.3281C28.752 26.8125 29.9062 25.6582 29.9062 24.2344V8.76562C29.9062 7.34177 28.752 6.1875 27.3281 6.1875Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.21875 10.3125L16.5 17.5312L25.7812 10.3125"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
