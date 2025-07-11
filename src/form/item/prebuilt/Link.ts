import { ItemDef } from "@/type/form/ItemDef";
import { AbstractItem } from "../AbstractItem";
import LinkWidget from "@/component/form/item/widgets/Link";
import { Form } from "@/form/Form";
import HiddenItem from "@/component/form/item/item/Hidden";

export class Link extends AbstractItem {
  constructor({
    widgetType = LinkWidget,
    itemType = HiddenItem,
    name = "",
    fieldName = "",
    type = "",
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
  }: Partial<ItemDef>) {
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
      formName: this.getFormName(),
      data: this.getData(),
      className: this.getWidgetClassName(),
    };
  }

  getItemProps(form: Form, itemHook: any): Object | null {
    return { item: this, form, itemHook };
  }
}
