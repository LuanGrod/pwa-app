import { ItemInterface } from "@global/form/item/ItemInterface";
import { ValidatorInterface } from "@global/validator/ValidatorInterface";
import { useCallback, useState } from "react";

export function useValidation(validators: ValidatorInterface[], itemConfig: ItemInterface) {
  const [error, setError] = useState<string | null>(null);

  const validate = useCallback(
    (val: string) => {
      for (const validator of validators) {
        if (!validator.validate(val)) {
          setError(validator.getMsg(itemConfig));
          return false;
        }
      }
      setError(null);
      return true;
    },
    [validators, itemConfig]
  );

  return { error, validate, setError };
}
