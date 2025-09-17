import { Icon } from "@public/global/js/types/Icon";
 
import clsx from "clsx/lite";

export default function OlhoFechado({ color = "#000", size, className, changeOnTheme = false }: Icon) {
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
      <rect width="25" height="25" fill="url(#pattern0_7875_304)" />
      <defs>
        <pattern id="pattern0_7875_304" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_7875_304" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_7875_304"
          width="96"
          height="96"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}
