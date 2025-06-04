import { ItemInterface } from "@/form/item/ItemInterface";
import { useItem, Item as ItemDef } from "./item/useItem";
import { FormEvent, useState } from "react";
import SubmitHandlerInterface from "@/form/handler/submit/SubmitHandlerInterface";

type submitReturn = {
  success: boolean;
  messageType: string;
  message: string;
  result: any;
};

export function useForm(itemsConfig: ItemInterface[], submitHandler: SubmitHandlerInterface, id?: string) {
  const items = itemsConfig.map((config: ItemInterface) => useItem(config));
  const [submitReturn, setSubmitReturn] = useState<submitReturn>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isValid = true;
    let values: { [key: string]: string } = {};
    items.forEach((item: ItemDef, idx: number) => {
      const valid = item.filterAndValidate();
      if (!valid) {
        isValid = false;
      }

      const index = itemsConfig[idx].name;
      values[index] = item.value;
    });

    if (isValid) {
      const result = await submitHandler.onSubmit(values, id);
      setSubmitReturn(result);
    }
  };

  return { items, handleSubmit, submitReturn };
}
