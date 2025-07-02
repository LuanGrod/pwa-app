import { ChangeEvent, FocusEvent, useState } from "react";
import { useFilters } from "./useFilters";
import { useMask } from "./useMask";
import { useValidation } from "./useValidation";
import { ItemInterface } from "@/form/item/ItemInterface";

export type Item = {
  value: string;
  setValue: (value: string) => void;
  error: string | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement, Element>) => void;
  filterAndValidate: () => boolean;
};

export function useItem(itemConfig: ItemInterface): Item {
  const [value, setValue] = useState(itemConfig.getDefaultValue() || "");

  const { applyFilters } = useFilters(itemConfig.getFilters() || []);
  const { applyMask } = useMask(itemConfig.getMask());
  const { error, validate } = useValidation(itemConfig.getValidators() || [], itemConfig);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    val = applyMask(val);
    val = applyFilters(val);
    setValue(val);
  };

  const onBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
    let val = e.target.value;
    const filtered = applyFilters(val);
    setValue(filtered);
    validate(filtered);
  };

  const filterAndValidate = () => {
    const filtered = applyFilters(value);
    setValue(filtered);

    return validate(filtered);
  };

  return { value, setValue, error, onChange, onBlur, filterAndValidate };
}
