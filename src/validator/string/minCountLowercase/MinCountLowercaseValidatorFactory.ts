import { MinCountLowercaseValidator } from "./MinCountLowercaseValidator";
import { Message } from "./message/Message";

export class MinCountLowercaseValidatorFactory {
  static create(min: number): MinCountLowercaseValidator {
    return new MinCountLowercaseValidator(new Message(min), min);
  }
}
