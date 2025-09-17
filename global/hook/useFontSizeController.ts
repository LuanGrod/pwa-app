type FontSizeOperation = "increment" | "decrement";

type UseFontSizeControllerProps = {
  elementsClassNames?: string[];
  step?: number;
};

export default function useFontSizeController({
  elementsClassNames,
  step = 2,
}: UseFontSizeControllerProps = {}) {
  const adjustFontSize = (operation: FontSizeOperation) => {
    const delta = operation === "increment" ? step : -step;

    if (!elementsClassNames) return;

    elementsClassNames.forEach((element) => {
      const elements = document.getElementsByClassName(element);

      if (elements.length > 0) {
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i] as HTMLElement;
          const currentFontSizeStr = window
            .getComputedStyle(element)
            .getPropertyValue("font-size");
          const currentFontSizePx = parseFloat(currentFontSizeStr);
          const newFontSize = currentFontSizePx + delta;

          element.style.fontSize = `${newFontSize}px`;
        }
      }
    });
  };

  const increaseFontSize = () => {
    adjustFontSize("increment");
  };

  const decreaseFontSize = () => {
    adjustFontSize("decrement");
  };

  return {
    increaseFontSize,
    decreaseFontSize,
  };
}
