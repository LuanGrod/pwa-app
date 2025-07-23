import { ItemDef } from "@global/type/form/ItemDef";
import { AbstractItem } from "./AbstractItem";
import { Form } from "../Form";
import Item from "@global/component/form/item/item/Item";
import InputWidget from "@global/component/form/item/widgets/Input";

export class Text extends AbstractItem {
  constructor({
    widgetType = InputWidget,
    itemType = Item,
    name = null,
    fieldName,
    type = "text",
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
      type,
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
      type: this.getType(),
      name: this.getName(),
      id: this.getName(),
      value: itemHook.value,
      onChange: itemHook.onChange,
      onBlur: itemHook.onBlur,
      className: itemHook.error ? "field-error" : "",
      placeholder: `Digite aqui ${this.getTextNameGender() ? "seu" : "sua"} ${this.getTextName()}...`,
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
