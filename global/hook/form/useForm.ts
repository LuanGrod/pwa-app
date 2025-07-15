import { ItemInterface } from "@global/form/item/ItemInterface";
import { useItem, Item as ItemDef } from "./item/useItem";
import { FormEvent, useState } from "react";
import SubmitHandlerInterface from "@global/form/handler/submit/SubmitHandlerInterface";

export function useForm(itemsConfig: ItemInterface[], submitHandler: SubmitHandlerInterface, id?: string) {
  const items = itemsConfig.map((config: ItemInterface) => useItem(config));
  const [submitReturn, setSubmitReturn] = useState<any>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;
    let values: { [key: string]: string } = {};
    items.forEach((item: ItemDef, idx: number) => {
      const valid = item.filterAndValidate();
      if (!valid) {
        isValid = false;
      }

      const index = itemsConfig[idx].getName();
      index ? values[index] = item.value : false;
    });

    if (isValid) {
      setLoading(true);
      const result = await submitHandler.onSubmit(values, id);
      setSubmitReturn(result);
      setLoading(false);
    }
  };

  return { items, handleSubmit, submitReturn, loading };
}
