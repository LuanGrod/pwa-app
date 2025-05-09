
import MessageInterface from "../../../MessageInterface";
import type { Cnpj } from "../Cnpj";

export default class Message implements MessageInterface {
  // Properties
  validator!: Cnpj;

  // Constructor
  constructor() {}

  // Methods
  getContent(field: any): string {
    return "O CNPJ informado é inválido.";
  }
}
