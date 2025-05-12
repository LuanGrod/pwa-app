import ValidatorInterface from "../../ValidatorInterface";
import Message from "./Message/Message";

export class BetweenLength implements ValidatorInterface {
  // Properties
  messageName: string;
  message: Message = new Message();
  min: number;
  max: number;

  // Constructor
  constructor(messageName: string, min: number, max: number) {
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

    return value.length >= this.min && value.length <= this.max;
  }

  createMessage() {
    if (this.messageName === "Message") {
      this.message = new Message();
    }

    this.message.validator = this;
  }
}
