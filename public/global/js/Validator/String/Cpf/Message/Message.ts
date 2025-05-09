import MessageInterface from "../../../MessageInterface";
import type { Cpf } from "../Cpf";

export default class Message implements MessageInterface {
  // Properties
  validator!: Cpf;

  // Constructor
  constructor() {}

  // Methods
  getContent(field: any): string {
    return "O CPF informado é inválido.";
  }
}
