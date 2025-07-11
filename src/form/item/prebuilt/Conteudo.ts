import { ItemDef } from "@/type/form/ItemDef";
import { RequiredValidatorFactory } from "@/validator/required/RequiredValidatorFactory";
import TextareaWidget from "@/component/form/item/widgets/Textarea";
import TextAreaItem from "@/component/form/item/item/Textarea";
import { Textarea } from "../Textarea";
import { MaxLengthValidatorFactory } from "@/validator/string/maxLength/MaxLengthValidatorFactory";

export class Conteudo extends Textarea {
  constructor({
    widgetType = TextareaWidget,
    itemType = TextAreaItem,
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
