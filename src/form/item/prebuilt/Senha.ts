import { ItemDef } from "@/type/form/ItemDef";
import { RequiredValidatorFactory } from "@/validator/required/RequiredValidatorFactory";
import { PasswordValidatorFactory } from "@/validator/string/password/password/PasswordValidatorFactory";
import PasswordItem from "@/component/form/item/item/Password";
import PasswordWidget from "@/component/form/item/widgets/Password";
import { Password } from "../Password";

export class Senha extends Password {
  constructor({
    widgetType = PasswordWidget,
    itemType = PasswordItem,
    name = null,
    fieldName = "senha",
    type = "password",
    entity = null,
    validators = [
      RequiredValidatorFactory.create(),
      PasswordValidatorFactory.create({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumber: 1 }),
    ],
    textNameGender = false,
    formName = "Senha",
    textName = "senha",
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
