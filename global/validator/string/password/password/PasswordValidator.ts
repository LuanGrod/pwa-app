import { ValidatorInterface } from "@global/validator/ValidatorInterface";
import { MessageInterface } from "@global/validator/MessageInterface";
import { ItemInterface } from "@global/form/item/ItemInterface";
export class PasswordValidator implements ValidatorInterface {
  protected message: MessageInterface;
  protected options: {
    minLength: number;
    minUppercase: number;
    minLowercase: number;
    minNumber: number;
    minSpecialChar: number;
  };

  constructor(
    message: MessageInterface,
    options: {
      minLength: number;
      minUppercase: number;
      minLowercase: number;
      minNumber: number;
      minSpecialChar: number;
    }
  ) {
    this.message = message;
    this.options = options;
  }

  validate(value: any): boolean {
    if (!value) return true;

    const { minLength, minUppercase, minLowercase, minNumber, minSpecialChar } = this.options;

    const length = value.length;
    const uppercaseCount = (value.match(/[A-Z]/g) || []).length;
    const lowerCount = (value.match(/[a-z]/g) || []).length;
    const numberCount = (value.match(/[0-9]/g) || []).length;
    const specialCharCount = (value.match(/[^a-zA-Z0-9]/g) || []).length;

    return (
      length >= minLength &&
      uppercaseCount >= minUppercase &&
      lowerCount >= minLowercase &&
      numberCount >= minNumber &&
      specialCharCount >= minSpecialChar
    );
  }

  getMsg(item: ItemInterface): string {
    return this.message.getMsg(item);
  }
}
