import { ItemDef } from "@/type/form/ItemDef";
import { Hidden as HiddenClass } from "../Hidden";
import HiddenItem from "@/component/form/item/item/Hidden";
import HiddenWidget from "@/component/form/item/widgets/Hidden";

export class Hidden extends HiddenClass {
  constructor({
    widgetType = HiddenWidget,
    itemType = HiddenItem,
    name = "hidden",
    type = "hidden",
    entity = null,
    validators = [],
    textNameGender = true,
    fullName = null,
    formName = null,
    textName = "",
    filters = [],
    mask = null,
    msgPlacement = null,
    tags = [],
    defaultValue = null,
  }: Partial<ItemDef>) {
    super({
      widgetType,
      itemType,
      name,
      type,
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
}
