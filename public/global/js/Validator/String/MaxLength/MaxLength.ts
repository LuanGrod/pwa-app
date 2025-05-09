import ValidatorInterface from "../../ValidatorInterface";
import Message from "./Message/Message";

export class MaxLength implements ValidatorInterface {
  // Properties
  messageName: string;
  message: Message = new Message();
  max: number;

  // Constructor
  constructor(messageName: string, max: number) {
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
