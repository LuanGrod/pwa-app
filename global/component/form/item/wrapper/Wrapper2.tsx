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
 * form-item + widget + error
 * @param item: ItemInterface
 * @param itemHook: any
 * @param widget: ReactNode
 * @param form: Form
 * @returns 
 */
export default function Wrapper2({ item, itemHook, widget, form }: Props) {
  return (
    <div className="form-item">
      {widget}
      {form.defaultMsgPlacement == "below" && <div className="error">{itemHook.error}</div>}
    </div>
  );
}
