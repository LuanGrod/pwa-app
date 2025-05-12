import ValidatorInterface from "../../../ValidatorInterface";
import Message from "./Message/Message";

export class Brazilian implements ValidatorInterface {
  // Properties
  messageName: string;
  message: Message = new Message();

  // Constructor
  constructor(messageName: string) {
    this.messageName = messageName;
    this.createMessage();
  }

  // Methods
  validate(value: any): boolean {
    var emptyValue = value === "";
    var pattern = /^((\(\d{2}\) ?)|\d{2} ?)?\d{4,5}-?\d{4}$/;
    var validValue = pattern.test(value);

    return emptyValue || validValue;
  }

  createMessage() {
    if (this.messageName === "Message") {
      this.message = new Message();
    }

    this.message.validator = this;
  }
}
