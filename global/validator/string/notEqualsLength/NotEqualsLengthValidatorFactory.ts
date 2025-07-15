import { NotEqualsLengthValidator } from "./NotEqualsLengthValidator";
import { Message } from "./message/Message";

export class NotEqualsLengthValidatorFactory {
  static create(value: number): NotEqualsLengthValidator {
    return new NotEqualsLengthValidator(new Message(value), value);
  }
}
