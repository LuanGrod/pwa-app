import { ItemDef } from "@/type/form/ItemDef";
import { RequiredValidatorFactory } from "@/validator/required/RequiredValidatorFactory";
import { Text } from "../Text";
import Item from "@/component/form/item/item/Item";
import InputWidget from "@/component/form/item/widgets/Input";

export class DataNascimento extends Text {
  constructor({
    widgetType = InputWidget,
    itemType = Item,
    name = "data de nascimento",
    type = "date",
    entity = null,
    validators = [RequiredValidatorFactory.create()],
    textNameGender = false,
    fullName = null,
    formName = null,
    textName = null,
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
