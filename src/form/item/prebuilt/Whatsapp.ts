import { ItemDef } from "@/type/form/ItemDef";
import { Item } from "../Item";
import { RequiredValidatorFactory } from "@/validator/required/RequiredValidatorFactory";
import { BrazilianValidatorFactory } from "@/validator/string/phone/brazilian/BrazilianValidatorFactory";
import { PhoneMask } from "@/mask/PhoneMask";

export class Whatsapp extends Item {
  constructor({
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
  }: Partial<ItemDef>) {
    super({
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
    });
  }
}
