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
  return (
    <div className="form-item">
      <label htmlFor={item.getName()}>{item.getFormName()}:</label>
      {widget}
      {form.defaultMsgPlacement == "below" && <div className="error">{itemHook.error}</div>}
    </div>
  );
}
