import MessageInterface from "../../../MessageInterface";
import type { Email } from "../Email";

export default class Message implements MessageInterface {
  // Properties
  validator!: Email;

  // Constructor
  constructor() {}

  // Methods
  getContent(field: any): string {
    return "O E-mail informado é inválido.";
  }
}
