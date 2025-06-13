import { EmptyValidator } from "./EmptyValidator";
import { Message } from "./message/Message";

export class EmptyValidatorFactory {
  static create(): EmptyValidator {
    return new EmptyValidator(new Message());
  }
}
