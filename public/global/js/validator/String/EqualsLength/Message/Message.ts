import MessageInterface from "../../../MessageInterface";
import type { EqualsLength } from "../EqualsLength";

export default class Message implements MessageInterface {
  // Properties
  validator!: EqualsLength;

  // Constructor
  constructor() {}

  // Methods
  getContent(field: any): string {
    var validator = this.validator;
    var messages: string[][] = [[], []];
    messages[1][0] = "Os " + field.fieldName + " precisam ser iguais a " + validator.value + " caracteres.";
    messages[1][1] = "O " + field.fieldName + " precisa ser igual a " + validator.value + " caracteres.";
    messages[0][0] = "As " + field.fieldName + " precisam ser iguais a " + validator.value + " caracteres.";
    messages[0][1] = "A " + field.fieldName + " precisa ser igual a " + validator.value + " caracteres.";

    var genderMessageIndex = Number(field.labelGender);
    var singularMessageIndex = Number(field.singleValue);
    var message = messages[genderMessageIndex][singularMessageIndex];

    return message;
  }
}
