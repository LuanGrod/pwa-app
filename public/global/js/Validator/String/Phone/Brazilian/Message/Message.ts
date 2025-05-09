import MessageInterface from "@public/global/js/Validator/MessageInterface";
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
