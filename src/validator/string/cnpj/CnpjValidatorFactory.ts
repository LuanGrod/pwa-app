import { CnpjValidator } from "./CnpjValidator";
import { Message } from "./message/Message";

export class CnpjValidatorFactory {
  static create(): CnpjValidator {
    return new CnpjValidator(new Message());
  }
}
