import MessageInterface from "../../../MessageInterface";
import type { MaxLength } from "../MaxLength";

export default class Message implements MessageInterface {
  // Properties
  validator!: MaxLength;

  // Constructor
  constructor() {}

  // Methods
  getContent(field: any): string {
    var validator = this.validator;
    var messages: string[][] = [[], []];
    messages[1][0] = "Os " + field.fieldName + " não podem ter mais do que " + validator.max + " caracteres.";
    messages[1][1] = "O " + field.fieldName + " não pode ter mais do que " + validator.max + " caracteres.";
    messages[0][0] = "As " + field.fieldName + " não podem ter mais do que " + validator.max + " caracteres.";
    messages[0][1] = "A " + field.fieldName + " não pode ter mais do que " + validator.max + " caracteres.";

    var genderMessageIndex = Number(field.labelGender);
    var singularMessageIndex = Number(field.singleValue);
    var message = messages[genderMessageIndex][singularMessageIndex];

    return message;
  }
}
