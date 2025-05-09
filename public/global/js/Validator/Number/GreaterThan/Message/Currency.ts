
import Currency from "@public/global/js/Formatter/Currency";
import MessageInterface from "../../../MessageInterface";
import type GreaterThan from "../GreaterThan";

export default class CurrencyMessage implements MessageInterface {
  // Properties
  validator!: GreaterThan;
  currency = new Currency();

  // Constructor
  constructor() {}

  // Methods
  getContent(field: any): string {
    var value = this.currency.format(this.validator.value);
    var messages: string[][] = [[], []];

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
