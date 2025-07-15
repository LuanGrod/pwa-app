import { Icon } from "@public/global/js/types/Icon";
 
import clsx from "clsx/lite";

export default function OlhoAberto({ color = "#000", size, className, changeOnTheme = false }: Icon) {
  return (
    <svg
      className={clsx(changeOnTheme && "icon", className)}
      width={size}
      height={size}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="25" height="25" fill="url(#pattern0_7875_157)" />
      <defs>
        <pattern id="pattern0_7875_157" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_7875_157" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_7875_157"
          width="96"
          height="96"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}
