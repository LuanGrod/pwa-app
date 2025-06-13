import { MinLengthValidator } from "./MinLengthValidator";
import { Message } from "./message/Message";

export class MinLengthValidatorFactory {
  static create(min: number): MinLengthValidator {
    return new MinLengthValidator(new Message(min), min);
  }
}
