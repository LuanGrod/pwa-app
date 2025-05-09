import type ValidatorInterface from "@pglobal/assets/js/Validator/ValidatorInterface";
import Message from "./Message/Message";

export class MaxLength implements ValidatorInterface {
  // Properties
  messageName: string;
  message: Message;
  max: number;

  // Constructor
  constructor(messageName, max) {
    this.messageName = messageName;
    this.max = max;
    this.createMessage();
  }

  // Methods
  validate(value: any): boolean {
    if (!value) {
      return true;
    }

    return value.length <= this.max;
  }

  createMessage() {
    if (this.messageName === "Message") {
      this.message = new Message();
    }

    this.message.validator = this;
  }
}
