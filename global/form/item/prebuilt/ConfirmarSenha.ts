import { ItemDef } from "@global/type/form/ItemDef";
import { RequiredValidatorFactory } from "@global/validator/required/RequiredValidatorFactory";
import { PasswordValidatorFactory } from "@global/validator/string/password/password/PasswordValidatorFactory";
import { MatchPasswordValidatorFactory } from "@global/validator/string/password/match/MatchPasswordValidatorFactory";
import PasswordItem from "@global/component/form/item/item/Password";
import PasswordWidget from "@global/component/form/item/widgets/Password";
import { Password } from "../Password";

export class ConfirmarSenha extends Password {
  constructor({
    widgetType = PasswordWidget,
    itemType = PasswordItem,
    name = null,
    fieldName = "confirmar_senha",
    type = "password",
    entity = null,
    validators = [],
    textNameGender = false,
    formName = "Confirmar Senha",
    textName = "confirmação da senha",
    filters = [],
    mask = null,
    msgPlacement = null,
    tags = [],
    defaultValue = null,
    data = new Map<string, any>(),
    itemClassName = null,
    widgetClassName = null,
  }: Partial<ItemDef>) {
    data = data.size > 0 ? data : new Map<string, any>([["match", `${entity}_senha`]]);
    (validators =
      validators.length > 0
        ? validators
        : [
            RequiredValidatorFactory.create(),
            PasswordValidatorFactory.create({
              minLength: 8,
              minLowercase: 1,
              minUppercase: 1,
              minNumber: 1,
            }),
            MatchPasswordValidatorFactory.create(data.get("match")),
          ]),
      (name = name ?? `${entity}_${fieldName}`);
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
