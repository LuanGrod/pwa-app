import MessageInterface from "../../MessageInterface";
import type { Empty } from "../Empty";

export default class Message implements MessageInterface {
  // Properties
  validator!: Empty;

  // Constructor
  constructor() {}

  // Methods
  getContent(field: any): string {
    var messages: string[][] = [[], []];
    messages[1][0] = "Nenhum " + field.fieldName + " deve ser fornecido.";
    messages[1][1] = "O " + field.fieldName + " não pode ser fornecido.";
    messages[0][0] = "Nenhuma " + field.fieldName + " deve ser fornecida.";
    messages[0][1] = "A " + field.fieldName + " não pode ser fornecida.";

    var genderMessageIndex = Number(field.labelGender);
    var singularMessageIndex = Number(field.singleValue);
    var message = messages[genderMessageIndex][singularMessageIndex];

    return message;
  }
}
