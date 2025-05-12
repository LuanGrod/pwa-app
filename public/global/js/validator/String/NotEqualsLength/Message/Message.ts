import MessageInterface from "../../../MessageInterface";
import type { NotEqualsLength } from "../NotEqualsLength";

export default class Message implements MessageInterface {
  // Properties
  validator!: NotEqualsLength;

  // Constructor
  constructor() {}

  // Methods
  getContent(field: any): string {
    var validator = this.validator;
    var messages: string[][] = [[], []];
    messages[1][0] = "Os " + field.fieldName + " precisam ser diferentes de " + this.validator.value + " caracteres.";
    messages[1][1] = "O " + field.fieldName + " precisa ser diferente de " + this.validator.value + " caracteres.";
    messages[0][0] = "As " + field.fieldName + " precisam ser diferentes de " + this.validator.value + " caracteres.";
    messages[0][1] = "A " + field.fieldName + " precisa ser diferente de " + this.validator.value + " caracteres.";

    var genderMessageIndex = Number(field.labelGender);
    var singularMessageIndex = Number(field.singleValue);
    var message = messages[genderMessageIndex][singularMessageIndex];

    return message;
  }
}
