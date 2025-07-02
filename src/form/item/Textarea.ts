import { ItemDef } from "@/type/form/ItemDef";
import { AbstractItem } from "./AbstractItem";
import { Form } from "../Form";

export class Textarea extends AbstractItem {
  constructor({
    widgetType,
    itemType,
    name,
    entity = null,
    validators = [],
    textNameGender = true,
    fullName = null,
    formName = null,
    textName = null,
    filters = [],
    mask = null,
    msgPlacement = null,
    tags = [],
    defaultValue = null,
  }: ItemDef) {
    super({
      widgetType,
      itemType,
      name,
      type: "textarea",
      entity,
      validators,
      textNameGender,
      fullName,
      formName,
      textName,
      filters,
      mask,
      msgPlacement,
      tags,
      defaultValue,
    });
  }

  getWidgetProps(form: Form, itemHook: any, data?: any): Object | null {
    return {
      name: this.getName(),
      id: this.getName(),
      value: itemHook.value,
      onChange: itemHook.onChange,
      onBlur: itemHook.onBlur,
      className: itemHook.error ? "field-error" : ""
    };
  }

  getItemProps(form: Form, itemHook: any): Object | null {
    return {
      item: this,
      form,
      itemHook,
    };
  }
}
