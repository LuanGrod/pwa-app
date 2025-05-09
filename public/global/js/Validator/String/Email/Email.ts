import ValidatorInterface from "../../ValidatorInterface";
import Message from "./Message/Message";

export class Email implements ValidatorInterface {
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
    var emptyEmail = value === "";
    var regex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    var validEmail = regex.test(value);

    return emptyEmail || validEmail;
  }

  createMessage() {
    if (this.messageName === "Message") {
      this.message = new Message();
    }

    this.message.validator = this;
  }
}
