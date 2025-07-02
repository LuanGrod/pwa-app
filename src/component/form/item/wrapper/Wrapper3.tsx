import { Form } from "@/form/Form";
import { ItemInterface } from "@/form/item/ItemInterface";
import { ReactNode } from "react";

type Props = {
  widget: ReactNode;
  item: ItemInterface;
  itemHook: any;
  form: Form;
};

export default function Wrapper({ item, itemHook, widget, form }: Props) {
  return widget;
}
