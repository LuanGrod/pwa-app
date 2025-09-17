"use client";

import DiminuirFonte from "@global/component/icon/DiminuirFonte";
import useFontSizeController from "@global/hook/useFontSizeController";

type Props = {
  elementsClassNames?: string[];
};

export default function DecreaseFontSizeBtn({ elementsClassNames }: Props) {
  const { decreaseFontSize } = useFontSizeController({ elementsClassNames });

  return (
    <button onClick={decreaseFontSize} className="btn">
      <DiminuirFonte size={26} changeOnTheme />
    </button>
  );
}
