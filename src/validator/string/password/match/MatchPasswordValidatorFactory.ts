import { MatchPasswordValidator } from "./MatchPasswordValidator";
import { Message } from "./message/Message";

export class MatchPasswordValidatorFactory {
  static create(name: string): MatchPasswordValidator {
    return new MatchPasswordValidator(new Message(), name);
  }
}
