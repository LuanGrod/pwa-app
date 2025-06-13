import { minCountSpecialCharValidator } from "./minCountSpecialCharValidator";
import { Message } from "./message/Message";

export class minCountSpecialCharValidatorFactory {
  static create(min: number): minCountSpecialCharValidator {
    return new minCountSpecialCharValidator(new Message(min), min);
  }
}
