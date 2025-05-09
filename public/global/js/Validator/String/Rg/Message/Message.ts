import MessageInterface from "../../../MessageInterface";
import type { Rg } from "../Rg";

export default class Message implements MessageInterface {
  // Properties
  validator!: Rg;

  // Constructor
  constructor() {}

  // Methods
  getContent(field: any): string {
    return "O RG informado é inválido.";
  }
}
