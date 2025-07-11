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
    name = null,
    fieldName = "email",
    type = "text",
    entity = null,
    validators = [RequiredValidatorFactory.create(), EmailValidatorFactory.create()],
    textNameGender = true,
    formName = "E-mail",
    textName = "e-mail",
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
