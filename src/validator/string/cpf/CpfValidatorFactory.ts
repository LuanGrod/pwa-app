import { CpfValidator } from "./CpfValidator";
import { Message } from "./message/Message";

export class CpfValidatorFactory {
  static create(): CpfValidator {
    return new CpfValidator(new Message());
  }
}
