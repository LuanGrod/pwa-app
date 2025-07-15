import { ValidatorInterface } from "@global/validator/ValidatorInterface";
import { MessageInterface } from "@global/validator/MessageInterface";
import { ItemInterface } from "@global/form/item/ItemInterface";

export class minCountSpecialCharValidator implements ValidatorInterface {
  protected message: MessageInterface;
  protected min: number;

  constructor(message: MessageInterface, min: number) {
    this.message = message;
    this.min = min;
  }

  validate(value: any): boolean {
    const specialCharCount = (value.match(/[^a-zA-Z0-9]/g) || []).length;
    return specialCharCount >= this.min;
  }

  getMsg(item: ItemInterface): string {
    return this.message.getMsg(item);
  }
}
