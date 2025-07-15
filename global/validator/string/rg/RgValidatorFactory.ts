import { RgValidator } from "./RgValidator";
import { Message } from "./message/Message";

export class RgValidatorFactory {
  static create(): RgValidator {
    return new RgValidator(new Message());
  }
}
