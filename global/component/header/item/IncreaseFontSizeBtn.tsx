"use client";

import AumentarFonte from "@global/component/icon/AumentarFonte";
import useFontSizeController from "@global/hook/useFontSizeController";

type Props = {
  elementsClassNames?: string[];
};

export default function IncreaseFontSizeBtn({ elementsClassNames }: Props) {
  const { increaseFontSize } = useFontSizeController({ elementsClassNames });

  return (
    <button onClick={increaseFontSize} className="btn">
      <AumentarFonte size={26} changeOnTheme />
    </button>
  );
}
