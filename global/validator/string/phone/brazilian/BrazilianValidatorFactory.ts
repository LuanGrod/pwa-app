import { BrazilianValidator } from "./BrazilianValidator";
import { Message } from "./message/Message";

export class BrazilianValidatorFactory {
  static create(): BrazilianValidator {
    return new BrazilianValidator(new Message());
  }
}
