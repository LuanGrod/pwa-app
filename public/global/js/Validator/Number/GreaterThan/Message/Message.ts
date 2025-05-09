import type { Field } from "@pglobal/assets/js/Types/Form/Item/Field";
import type MessageInterface from "@pglobal/assets/js/Validator/MessageInterface";
import type GreaterThan from "../GreaterThan";

export default class Message implements MessageInterface {
  // Properties
  validator: GreaterThan;

  // Constructor
  constructor() {}

  // Methods
  getContent(field: Field): string {
    var validator = this.validator;
    var messages = [[], []];

    messages[1][0] = "Os " + field.fieldName + " precisam ser maiores que " + validator.value + ".";
    messages[1][1] = "O " + field.fieldName + " precisa ser maior que " + validator.value + ".";
    messages[0][0] = "As " + field.fieldName + " precisam ser maiores que " + validator.value + ".";
    messages[0][1] = "A " + field.fieldName + " precisa ser maior que " + validator.value + ".";

    var genderMessageIndex = Number(field.labelGender);
    var singularMessageIndex = Number(field.singleValue);
    var message = messages[genderMessageIndex][singularMessageIndex];

    return message;
  }
}
