import { Form } from "@global/form/Form";
import { ItemInterface } from "@global/form/item/ItemInterface";
import { ReactNode } from "react";

type Props = {
  widget: ReactNode;
  item: ItemInterface;
  itemHook: any;
  form: Form;
};

/**
 * widget
 * @param item: ItemInterface
 * @param itemHook: any
 * @param widget: ReactNode
 * @param form: Form
 * @returns 
 */
export default function Wrapper({ item, itemHook, widget, form }: Props) {
  return widget;
}
