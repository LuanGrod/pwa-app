import { MaxLengthValidator } from "./MaxLengthValidator";
import { Message } from "./message/Message";

export class MaxLengthValidatorFactory {
  static create(max: number): MaxLengthValidator {
    return new MaxLengthValidator(new Message(max), max);
  }
}
