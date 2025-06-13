import { PasswordValidator } from "./PasswordValidator";
import { Message } from "./message/Message";

type options = {
  minLength: number;
  minUppercase: number;
  minLowercase: number;
  minNumber: number;
  minSpecialChar: number;
};

export class PasswordValidatorFactory {
  static create(options: {
    minLength?: number;
    minUppercase?: number;
    minLowercase?: number;
    minNumber?: number;
    minSpecialChar?: number;
  }): PasswordValidator {
    const defaults = {
      minLength: 0,
      minUppercase: 0,
      minLowercase: 0,
      minNumber: 0,
      minSpecialChar: 0,
    };

    const mergedOptions: options = { ...defaults, ...options };

    return new PasswordValidator(new Message(mergedOptions), mergedOptions);
  }
}
