import { ItemDef } from "@global/type/form/ItemDef";
import { RequiredValidatorFactory } from "@global/validator/required/RequiredValidatorFactory";
import { BrazilianValidatorFactory } from "@global/validator/string/phone/brazilian/BrazilianValidatorFactory";
import { PhoneMask } from "@global/mask/PhoneMask";
import { Text } from "../Text";
import InputWidget from "@global/component/form/item/widgets/Input";
import Item from "@global/component/form/item/item/Item";

export class Whatsapp extends Text {
  constructor({
    widgetType = InputWidget,
    itemType = Item,
    name = null,
    fieldName = "whatsapp",
    type = "text",
    entity = null,
    validators = [RequiredValidatorFactory.create(), BrazilianValidatorFactory.create()],
    textNameGender = true,
    formName = null,
    textName = null,
    filters = [],
    mask = new PhoneMask(),
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
