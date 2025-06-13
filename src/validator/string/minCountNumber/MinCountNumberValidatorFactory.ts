import { MinCountNumberValidator } from "./MinCountNumberValidator";
import { Message } from "./message/Message";

export class MinCountNumberValidatorFactory {
  static create(min: number): MinCountNumberValidator {
    return new MinCountNumberValidator(new Message(min), min);
  }
}
