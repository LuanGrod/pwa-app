import { ItemDef } from "@/type/form/ItemDef";
import { RequiredValidatorFactory } from "@/validator/required/RequiredValidatorFactory";
import { EmailValidatorFactory } from "@/validator/string/email/EmailValidatorFactory";
import { Text } from "../Text";
import Item from "@/component/form/item/item/Item";
import InputWidget from "@/component/form/item/widgets/Input";

export class Email extends Text {
  constructor({
    widgetType = InputWidget,
    itemType = Item,
    name = "email",
    type = "text",
    entity = null,
    validators = [RequiredValidatorFactory.create(), EmailValidatorFactory.create()],
    textNameGender = true,
    fullName = null,
    formName = null,
    textName = "e-mail",
    filters = [],
    mask = null,
    msgPlacement = null,
    tags = [],
    defaultValue = null,
  }: Partial<ItemDef>) {
    super({
      widgetType,
      itemType,
      name: `${entity}_email`,
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
