import { ItemDef } from "@/type/form/ItemDef";
import { Hidden as HiddenClass } from "../Hidden";
import HiddenItem from "@/component/form/item/item/Hidden";
import HiddenWidget from "@/component/form/item/widgets/Hidden";

export class Hidden extends HiddenClass {
  constructor({
    widgetType = HiddenWidget,
    itemType = HiddenItem,
    name = null,
    fieldName = "hidden",
    type = "hidden",
    entity = null,
    validators = [],
    textNameGender = true,
    formName = null,
    textName = "",
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
}
