
import ValidatorInterface from "../../ValidatorInterface";
import Message from "./Message/Message";

export class EqualsLength implements ValidatorInterface {
  // Properties
  messageName: string;
  message: Message = new Message();
  value: number;

  // Constructor
  constructor(messageName: string, value: number) {
    this.messageName = messageName;
    this.value = value;
    this.createMessage();
  }

  // Methods
  validate(value: any): boolean {
    if (!value) {
      return true;
    }

    return this.value === value;
  }

  createMessage() {
    if (this.messageName === "Message") {
      this.message = new Message();
    }

    this.message.validator = this;
  }
}
