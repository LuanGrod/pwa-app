import type { Field } from "@pglobal/assets/js/Types/Form/Item/Field";
import type MessageInterface from "@pglobal/assets/js/Validator/MessageInterface";
import type { Brazilian } from "../Brazilian";

export default class Message implements MessageInterface {
  // Properties
  validator: Brazilian;

  // Constructor
  constructor() {}

  // Methods
  getContent(field: Field): string {
    return "O telefone informado é inválido.";
  }
}
