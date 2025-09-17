"use client";

import DiminuirFonte from "@global/component/icon/DiminuirFonte";
import useFontSize from "@global/hook/ui/useFontSize";

type Props = {
  elementsClassNames?: string[];
};

export default function DecreaseFontSizeBtn({ elementsClassNames }: Props) {
  const { decreaseFontSize } = useFontSize({ elementsClassNames });

  return (
    <button onClick={decreaseFontSize} className="btn">
      <DiminuirFonte size={26} changeOnTheme />
    </button>
  );
}
