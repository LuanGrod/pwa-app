import MessageInterface from "@public/global/js/validator/MessageInterface";
import type { Brazilian } from "../Brazilian";

export default class Message implements MessageInterface {
  // Properties
  validator!: Brazilian;

  // Constructor
  constructor() {}

  // Methods
  getContent(field: any): string {
    return "O telefone informado é inválido.";
  }
}
