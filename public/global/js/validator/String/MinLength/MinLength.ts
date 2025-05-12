import ValidatorInterface from "../../ValidatorInterface";
import Message from "./Message/Message";

export class MinLength implements ValidatorInterface {
  // Properties
  messageName: string;
  message: Message = new Message();
  min: number;

  // Constructor
  constructor(messageName: string, min: number) {
    this.messageName = messageName;
    this.min = min;
    this.createMessage();
  }

  // Methods
  validate(value: any): boolean {
    if (!value) {
      return true;
    }

    return value.length >= this.min;
  }

  createMessage() {
    if (this.messageName === "Message") {
      this.message = new Message();
    }

    this.message.validator = this;
  }
}
