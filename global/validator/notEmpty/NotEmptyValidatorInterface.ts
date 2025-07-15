import { NotEmptyValidator } from "./NotEmptyValidator";
import { Message } from "./message/Message";

export class NotEmptyValidatorFactory {
  static create(): NotEmptyValidator {
    return new NotEmptyValidator(new Message());
  }
}
