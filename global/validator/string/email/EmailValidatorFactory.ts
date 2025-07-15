import { EmailValidator } from "./EmailValidator";
import { Message } from "./message/Message";

export class EmailValidatorFactory {
  static create(): EmailValidator {
    return new EmailValidator(new Message());
  }
}
