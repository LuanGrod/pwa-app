import type { Field } from "@pglobal/assets/js/Types/Form/Item/Field";
import type MessageInterface from "@pglobal/assets/js/Validator/MessageInterface";
import type { Rg } from "../Rg";

export default class Message implements MessageInterface {
  // Properties
  validator: Rg;

  // Constructor
  constructor() {}

  // Methods
  getContent(field: Field): string {
    return "O RG informado é inválido.";
  }
}
