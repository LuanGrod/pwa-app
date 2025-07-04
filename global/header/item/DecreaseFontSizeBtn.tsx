"use client";

import DiminuirFonte from "@global/icons/DiminuirFonte";

type Props = {
  elementsIds?: string[];
};

export default function DecreaseFontSizeBtn({ elementsIds }: Props) {
  const handleClick = () => {
    elementsIds?.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        const fontSizeStr = window.getComputedStyle(element).getPropertyValue("font-size");
        const fontSizePx = parseFloat(fontSizeStr);
        element.style.fontSize = `${fontSizePx - 2}px`;
      }
    });
  };

  return (
    <button onClick={handleClick} className="btn">
      <DiminuirFonte size={26} changeOnTheme />
    </button>
  );
}
