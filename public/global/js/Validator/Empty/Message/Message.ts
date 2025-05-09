import type { Field } from "@pglobal/assets/js/Types/Form/Item/Field";
import type MessageInterface from "@pglobal/assets/js/Validator/MessageInterface";
import type { Empty } from "../Empty";

export default class Message implements MessageInterface {
  // Properties
  validator: Empty;

  // Constructor
  constructor() {}

  // Methods
  getContent(field: Field): string {
    var messages = [[], []];
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
