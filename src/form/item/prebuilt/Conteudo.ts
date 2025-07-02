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
    name = "conteudo",
    type = "textarea",
    entity = null,
    validators = [RequiredValidatorFactory.create(), MaxLengthValidatorFactory.create(500)],
    textNameGender = true,
    fullName = null,
    formName = null,
    textName = "conteúdo",
    filters = [],
    mask = null,
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
      defaultValue
    });
  }
}
