import { Form } from "@/form/Form";
import { ItemInterface } from "@/form/item/ItemInterface";
import { ReactNode } from "react";

type Props = {
  widget: ReactNode;
  item: ItemInterface;
  itemHook: any;
  form: Form;
};

export default function Wrapper2({ item, itemHook, widget, form }: Props) {
  return (
    <div className="form-item">
      {widget}
      {form.defaultMsgPlacement == "below" && <div className="error">{itemHook.error}</div>}
    </div>
  );
}
