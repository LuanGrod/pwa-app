import Message from "./Message/Message";
import CurrencyMessage from "./Message/Currency";
import ValidatorInterface from "../../ValidatorInterface";

export default class GreaterThan implements ValidatorInterface {
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

    return value > this.value;
  }

  createMessage(): void {
    if (this.messageName === "Message") {
      this.message = new Message();
    }
    if (this.messageName === "Currency") {
      this.message = new CurrencyMessage();
    }

    this.message.validator = this;
  }
}
