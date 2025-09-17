"use client";

import AumentarFonte from "@global/component/icon/AumentarFonte";
import useFontSize from "@global/hook/ui/useFontSize";

type Props = {
  elementsClassNames?: string[];
};

export default function IncreaseFontSizeBtn({ elementsClassNames }: Props) {
  const { increaseFontSize } = useFontSize({ elementsClassNames });

  return (
    <button onClick={increaseFontSize} className="btn">
      <AumentarFonte size={26} changeOnTheme />
    </button>
  );
}
