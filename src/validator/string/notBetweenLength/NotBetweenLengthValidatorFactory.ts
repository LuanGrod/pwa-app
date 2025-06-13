import { NotBetweenLengthValidator } from "./NotBetweenLengthValidator";
import { Message } from "./message/Message";

export class NotBetweenLengthValidatorFactory {
  static create(min: number, max: number): NotBetweenLengthValidator {
    return new NotBetweenLengthValidator(new Message(min, max), min, max);
  }
}
