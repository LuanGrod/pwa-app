import { EqualsLengthValidator } from "./EqualsLengthValidator";
import { Message } from "./message/Message";

export class EqualsLengthValidatorFactory {
  static create(value: number): EqualsLengthValidator {
    return new EqualsLengthValidator(new Message(value), value);
  }
}
