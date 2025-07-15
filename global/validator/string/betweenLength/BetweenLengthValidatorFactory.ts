import { BetweenLengthValidator } from "./BetweenLengthValidator";
import { Message } from "./message/Message";

export class BetweenLengthValidatorFactory {
  static create(min: number, max: number): BetweenLengthValidator {
    return new BetweenLengthValidator(new Message(min, max), min, max);
  }
}
