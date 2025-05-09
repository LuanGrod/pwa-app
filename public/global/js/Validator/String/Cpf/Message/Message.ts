import type { Field } from "@pglobal/assets/js/Types/Form/Item/Field";
import type MessageInterface from "@pglobal/assets/js/Validator/MessageInterface";
import type { Cpf } from "../Cpf";

export default class Message implements MessageInterface {
  // Properties
  validator: Cpf;

  // Constructor
  constructor() {}

  // Methods
  getContent(field: Field): string {
    return "O CPF informado é inválido.";
  }
}
