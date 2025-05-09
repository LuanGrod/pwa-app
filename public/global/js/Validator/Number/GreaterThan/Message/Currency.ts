import type { Field } from "@pglobal/assets/js/Types/Form/Item/Field";
import type MessageInterface from "@pglobal/assets/js/Validator/MessageInterface";
import type GreaterThan from "../GreaterThan";
import Currency from "@pglobal/assets/js/Formatter/Currency";

export default class CurrencyMessage implements MessageInterface {
  // Properties
  validator: GreaterThan;
  currency = new Currency();

  // Constructor
  constructor() {}

  // Methods
  getContent(field: Field): string {
    var value = this.currency.format(this.validator.value);
    var messages = [[], []];

    messages[1][0] = "Os " + field.fieldName + " precisam ser maiores que " + value + ".";
    messages[1][1] = "O " + field.fieldName + " precisa ser maior que " + value + ".";
    messages[0][0] = "As " + field.fieldName + " precisam ser maiores que " + value + ".";
    messages[0][1] = "A " + field.fieldName + " precisa ser maior que " + value + ".";

    var genderMessageIndex = Number(field.labelGender);
    var singularMessageIndex = Number(field.singleValue);
    var message = messages[genderMessageIndex][singularMessageIndex];

    return message;
  }
}
