import { ItemDef } from "@/type/form/ItemDef";
import { Item } from "../Item";
import { RequiredValidatorFactory } from "@/validator/required/RequiredValidatorFactory";
import { EmailValidatorFactory } from "@/validator/string/email/EmailValidatorFactory";

export class Email extends Item {
  constructor({
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
