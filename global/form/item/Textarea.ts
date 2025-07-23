import { ItemDef } from "@global/type/form/ItemDef";
import { AbstractItem } from "./AbstractItem";
import { Form } from "../Form";
import TextareaWidget from "@global/component/form/item/widgets/Textarea";
import Item from "@global/component/form/item/item/Item";

export class Textarea extends AbstractItem {
  constructor({
    widgetType = TextareaWidget,
    itemType = Item,
    name = null,
    fieldName,
    entity = null,
    validators = [],
    textNameGender = true,
    formName = null,
    textName = null,
    filters = [],
    mask = null,
    msgPlacement = null,
    tags = [],
    defaultValue = null,
    data = new Map<string, any>(),
    itemClassName = null,
    widgetClassName = null,
  }: ItemDef) {
    name = name ?? `${entity}_${fieldName}`;
    super({
      widgetType,
      itemType,
      name,
      fieldName,
      type: "textarea",
      entity,
      validators,
      textNameGender,
      formName,
      textName,
      filters,
      mask,
      msgPlacement,
      tags,
      defaultValue,
      data,
      itemClassName,
      widgetClassName,
    });
  }

  getWidgetProps(form: Form, itemHook: any, data?: any): Object | null {
    return {
      name: this.getName(),
      id: this.getName(),
      value: itemHook.value,
      onChange: itemHook.onChange,
      onBlur: itemHook.onBlur,
      className: itemHook.error ? "field-error" : "",
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
