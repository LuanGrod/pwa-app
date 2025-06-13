import { ItemDef } from "@/type/form/ItemDef";
import { Item } from "../Item";
import { RequiredValidatorFactory } from "@/validator/required/RequiredValidatorFactory";
import { PasswordValidatorFactory } from "@/validator/string/password/PasswordValidatorFactory";

export class Senha extends Item {
  constructor({
    name = "senha",
    type = "password",
    entity = null,
    validators = [
      RequiredValidatorFactory.create(),
      PasswordValidatorFactory.create({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumber: 1 }),
    ],
    textNameGender = false,
    fullName = null,
    formName = null,
    textName = null,
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
