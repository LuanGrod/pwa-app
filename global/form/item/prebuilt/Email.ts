import { ItemDef } from "@global/type/form/ItemDef";
import { RequiredValidatorFactory } from "@global/validator/required/RequiredValidatorFactory";
import { EmailValidatorFactory } from "@global/validator/string/email/EmailValidatorFactory";
import { Text } from "../Text";
import Item from "@global/component/form/item/item/Item";
import InputWidget from "@global/component/form/item/widgets/Input";
import { StripTags } from "@global/filter/StripTags";
import { Trim } from "@global/filter/Trim";

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
    filters = [new Trim(), new StripTags()],
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
