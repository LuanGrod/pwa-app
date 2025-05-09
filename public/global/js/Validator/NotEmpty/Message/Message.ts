import MessageInterface from "../../MessageInterface";
import type { NotEmpty } from "../NotEmpty";

export default class Message implements MessageInterface {
  // Properties
  validator!: NotEmpty;

  // Constructor
  constructor() {}

  // Methods
  getContent(field: any): string {
    var messages: string[][] = [[], []];
    messages[1][0] = "Todos os " + field.fieldName + " precisam ser fornecidos.";
    messages[1][1] = "O " + field.fieldName + " precisa ser fornecido.";
    messages[0][0] = "Todas as " + field.fieldName + " precisam ser fornecidas.";
    messages[0][1] = "A " + field.fieldName + " precisa ser fornecida.";

    var genderMessageIndex = Number(field.labelGender);
    var singularMessageIndex = Number(field.singleValue);
    var message = messages[genderMessageIndex][singularMessageIndex];

    return message;
  }
}
