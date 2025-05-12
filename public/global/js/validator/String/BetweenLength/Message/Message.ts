import MessageInterface from "../../../MessageInterface";
import type { BetweenLength } from "../BetweenLength";

export default class Message implements MessageInterface {
  // Properties
  validator!: BetweenLength;

  // Constructor
  constructor() {}

  // Methods
  getContent(field: any): string {
    var validator = this.validator;
    var messages: string[][] = [[], []];
    messages[1][0] =
      "Os " + field.fieldName + " precisam ter entre " + validator.min + " e " + validator.max + " caracteres.";
    messages[1][1] =
      "O " + field.fieldName + " precisa ter entre " + validator.min + " e " + validator.max + " caracteres.";
    messages[0][0] =
      "As " + field.fieldName + " precisam ter entre " + validator.min + " e " + validator.max + " caracteres.";
    messages[0][1] =
      "A " + field.fieldName + " precisa ter entre " + validator.min + " e " + validator.max + " caracteres.";

    var genderMessageIndex = Number(field.labelGender);
    var singularMessageIndex = Number(field.singleValue);
    var message = messages[genderMessageIndex][singularMessageIndex];

    return message;
  }
}
