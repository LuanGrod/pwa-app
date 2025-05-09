import type ValidatorInterface from "@pglobal/assets/js/Validator/ValidatorInterface";
import Message from "./Message/Message";

export class NotBetweenLength implements ValidatorInterface {
  // Properties
  messageName: string;
  message: Message;
  min: number;
  max: number;

  // Constructor
  constructor(messageName, min, max) {
    this.messageName = messageName;
    this.min = min;
    this.max = max;
    this.createMessage();
  }

  // Methods
  validate(value: any): boolean {
    if (!value) {
      return true;
    }

    return value.length < this.min || value.length > this.max;
  }

  createMessage() {
    if (this.messageName === "Message") {
      this.message = new Message();
    }

    this.message.validator = this;
  }
}
