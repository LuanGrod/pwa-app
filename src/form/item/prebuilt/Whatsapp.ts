import { ItemDef } from "@/type/form/ItemDef";
import { RequiredValidatorFactory } from "@/validator/required/RequiredValidatorFactory";
import { BrazilianValidatorFactory } from "@/validator/string/phone/brazilian/BrazilianValidatorFactory";
import { PhoneMask } from "@/mask/PhoneMask";
import { Text } from "../Text";
import InputWidget from "@/component/form/item/widgets/Input";
import Item from "@/component/form/item/item/Item";

export class Whatsapp extends Text {
  constructor({
    widgetType = InputWidget,
    itemType = Item,
    name = "whatsapp",
    type = "text",
    entity = null,
    validators = [RequiredValidatorFactory.create(), BrazilianValidatorFactory.create()],
    textNameGender = true,
    fullName = null,
    formName = null,
    textName = null,
    filters = [],
    mask = new PhoneMask(),
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
