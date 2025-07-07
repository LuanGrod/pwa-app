import { ItemDef } from "@/type/form/ItemDef";
import { RequiredValidatorFactory } from "@/validator/required/RequiredValidatorFactory";
import { PasswordValidatorFactory } from "@/validator/string/password/PasswordValidatorFactory";
import PasswordItem from "@/component/form/item/item/Password";
import PasswordWidget from "@/component/form/item/widgets/Password";
import { Password } from "../Password";

export class Senha extends Password {
  constructor({
    widgetType = PasswordWidget,
    itemType = PasswordItem,
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
    defaultValue = null,
  }: Partial<ItemDef>) {
    super({
      widgetType,
      itemType,
      name: `${entity}_senha`,
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
