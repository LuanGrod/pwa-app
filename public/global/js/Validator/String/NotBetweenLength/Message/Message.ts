import type { Field } from "@pglobal/assets/js/Types/Form/Item/Field";
import type MessageInterface from "@pglobal/assets/js/Validator/MessageInterface";
import type { NotBetweenLength } from "../NotBetweenLength";

export default class Message implements MessageInterface {
  // Properties
  validator: NotBetweenLength;

  // Constructor
  constructor() {}

  // Methods
  getContent(field: Field): string {
    var validator = this.validator;
    var messages = [[], []];
    messages[1][0] =
      "Os " + field.fieldName + " não podem ter entre " + validator.min + " e " + validator.max + " caracteres.";
    messages[1][1] =
      "O " + field.fieldName + " não pode ter entre " + validator.min + " e " + validator.max + " caracteres.";
    messages[0][0] =
      "As " + field.fieldName + " não podem ter entre " + validator.min + " e " + validator.max + " caracteres.";
    messages[0][1] =
      "A " + field.fieldName + " não pode ter entre " + validator.min + " e " + validator.max + " caracteres.";

    var genderMessageIndex = Number(field.labelGender);
    var singularMessageIndex = Number(field.singleValue);
    var message = messages[genderMessageIndex][singularMessageIndex];

    return message;
  }
}
