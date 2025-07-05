"use client";

import DiminuirFonte from "@global/icons/DiminuirFonte";

type Props = {
  elementsClassNames?: string[];
};

export default function DecreaseFontSizeBtn({ elementsClassNames }: Props) {
  const handleClick = () => {
    elementsClassNames?.forEach((id) => {
      const element = document.getElementsByClassName(id);
      if (element.length > 0) {
        for (let i = 0; i < element.length; i++) {
          const el = element[i] as HTMLElement;
          const fontSizeStr = window.getComputedStyle(el).getPropertyValue("font-size");
          const fontSizePx = parseFloat(fontSizeStr);
          el.style.fontSize = `${fontSizePx - 2}px`;
        }
      }
    });
  };

  return (
    <button onClick={handleClick} className="btn">
      <DiminuirFonte size={26} changeOnTheme />
    </button>
  );
}
