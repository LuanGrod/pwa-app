// Crie uma factory para criar o validator RequiredValidator

import { RequiredValidator } from "./RequiredValidator";
import { Message } from "./message/Message";

export class RequiredValidatorFactory {
  static create(): RequiredValidator {
    return new RequiredValidator(new Message());
  }
}
