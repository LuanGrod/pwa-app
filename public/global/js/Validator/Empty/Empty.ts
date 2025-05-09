import type ValidatorInterface from "@pglobal/assets/js/Validator/ValidatorInterface";
import Message from "./Message/Message";

export class Empty implements ValidatorInterface {
  // Properties
  messageName: string;
  message: Message;

  // Constructor
  constructor(messageName) {
    this.messageName = messageName;
    this.createMessage();
  }

  // Methods
  validate(value: any): boolean {
    return value === "";
  }

  createMessage() {
    if (this.messageName === "Message") {
      this.message = new Message();
    }

    this.message.validator = this;
  }
}
