import type { Field } from "@pglobal/assets/js/Types/Form/Item/Field";
import type MessageInterface from "@pglobal/assets/js/Validator/MessageInterface";
import type { Cnpj } from "../Cnpj";

export default class Message implements MessageInterface {
  // Properties
  validator: Cnpj;

  // Constructor
  constructor() {}

  // Methods
  getContent(field: Field): string {
    return "O CNPJ informado é inválido.";
  }
}
