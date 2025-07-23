import { ItemDef } from "@global/type/form/ItemDef";
import { AbstractItem } from "./AbstractItem";
import { Form } from "../Form";
import PasswordItem from "@global/component/form/item/item/Password";
import PasswordWidget from "@global/component/form/item/widgets/Password";

export class Password extends AbstractItem {
  constructor({
    widgetType = PasswordWidget,
    itemType = PasswordItem,
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
      type: "password",
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
      type: this.getType() == "password" ? (data.isVisible ? "text" : "password") : this.getType(),
      name: this.getName(),
      id: this.getName(),
      value: itemHook.value,
      onChange: itemHook.onChange,
      onBlur: itemHook.onBlur,
      className: itemHook.error ? "field-error" : "",
      placeholder: `Digite aqui ${this.getTextNameGender() ? "seu" : "sua"} ${this.getTextName()}...`,
      data,
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
