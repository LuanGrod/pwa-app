import type ValidatorInterface from "@pglobal/assets/js/Validator/ValidatorInterface";
import Message from "./Message/Message";

export class NotEqualsLength implements ValidatorInterface {
  // Properties
  messageName: string;
  message: Message;
  value: number;

  // Constructor
  constructor(messageName, value) {
    this.messageName = messageName;
    this.value = value;
    this.createMessage();
  }

  // Methods
  validate(value: any): boolean {
    if (!value) {
      return true;
    }

    //number nao tem o metodo length
    return this.value.valueOf.length !== value.length;
  }

  createMessage() {
    if (this.messageName === "Message") {
      this.message = new Message();
    }

    this.message.validator = this;
  }
}
