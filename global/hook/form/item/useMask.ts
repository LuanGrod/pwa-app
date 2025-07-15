import { MaskInterface } from "@global/mask/MaskInterface";
import { useCallback } from "react";

export function useMask(mask: MaskInterface | null) {
  const applyMask = useCallback(
    (val: string) => mask ? mask.apply(val) : val,
    [mask]
  );

  return { applyMask };
}
