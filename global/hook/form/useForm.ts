import { ItemInterface } from "@global/form/item/ItemInterface";
import { useItem, Item as ItemDef } from "./item/useItem";
import { FormEvent, useState } from "react";
import SubmitHandlerInterface from "@global/form/handler/submit/SubmitHandlerInterface";
import { DefaultResponse } from "@global/type/request/response/handler/DefaultResponse";

export function useForm<T>(itemsConfig: ItemInterface[], submitHandler: SubmitHandlerInterface, id?: string) {
  const items = itemsConfig.map((config: ItemInterface) => useItem(config));
  const [submitReturn, setSubmitReturn] = useState<DefaultResponse<T>>();
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
      const result = await submitHandler.onSubmit<T>(values, id);
      setSubmitReturn(result);
      setLoading(false);
    }
  };

  return { items, handleSubmit, submitReturn, loading };
}
