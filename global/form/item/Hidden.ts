import { ItemDef } from "@global/type/form/ItemDef";
import { AbstractItem } from "./AbstractItem";
import { Form } from "../Form";

export class Hidden extends AbstractItem {
  constructor({
    widgetType,
    itemType,
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
    data,
    itemClassName = null,
    widgetClassName = null,
  }: ItemDef) {
    super({
      widgetType,
      itemType,
      name,
      fieldName,
      type: "hidden",
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
