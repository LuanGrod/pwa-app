import { ItemDef } from "@global/type/form/ItemDef";
import { RequiredValidatorFactory } from "@global/validator/required/RequiredValidatorFactory";
import TextareaWidget from "@global/component/form/item/widgets/Textarea";
import Item2 from "@global/component/form/item/item/Item2";
import { Textarea } from "../Textarea";
import { MaxLengthValidatorFactory } from "@global/validator/string/maxLength/MaxLengthValidatorFactory";

export class Conteudo extends Textarea {
  constructor({
    widgetType = TextareaWidget,
    itemType = Item2,
    name = null,
    fieldName = "conteudo",
    type = "textarea",
    entity = null,
    validators = [RequiredValidatorFactory.create(), MaxLengthValidatorFactory.create(500)],
    textNameGender = true,
    formName = null,
    textName = "conteúdo",
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
