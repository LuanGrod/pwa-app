"use client";

import AumentarFonte from "@global/icons/AumentarFonte";

type Props = {
  elementsIds?: string[];
};

export default function IncreaseFontSizeBtn({ elementsIds }: Props) {
  const handleClick = () => {
    elementsIds?.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        const fontSizeStr = window.getComputedStyle(element).getPropertyValue("font-size");
        const fontSizePx = parseFloat(fontSizeStr);
        element.style.fontSize = `${fontSizePx + 2}px`;
      }
    });
  };

  return (
    <button onClick={handleClick} className="btn">
      <AumentarFonte size={26} changeOnTheme />
    </button>
  );
}
