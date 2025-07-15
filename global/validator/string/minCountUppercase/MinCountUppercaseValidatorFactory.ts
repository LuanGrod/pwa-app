import { MinCountUppercaseValidator } from "./MinCountUppercaseValidator";
import { Message } from "./message/Message";

export class MinCountUppercaseValidatorFactory {
  static create(min: number): MinCountUppercaseValidator {
    return new MinCountUppercaseValidator(new Message(min), min);
  }
}
