import { ItemDef } from "@/type/form/ItemDef";
import { Item } from "../Item";
import { RequiredValidatorFactory } from "@/validator/required/RequiredValidatorFactory";

export class DataNascimento extends Item {
  constructor({
    name = "data de nascimento",
    type = "date",
    entity = null,
    validators = [RequiredValidatorFactory.create()],
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
