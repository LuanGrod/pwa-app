import { ValidatorInterface } from "@global/validator/ValidatorInterface";
import { MessageInterface } from "@global/validator/MessageInterface";
import { ItemInterface } from "@global/form/item/ItemInterface";

export class MaxLengthValidator implements ValidatorInterface {
  protected message: MessageInterface;
  protected max: number;

  constructor(message: MessageInterface, max: number) {
    this.message = message;
    this.max = max;
  }

  validate(value: any): boolean {
    if (!value) {
      return true;
    }

    return value.length <= this.max;
  }

  getMsg(item: ItemInterface): string {
    return this.message.getMsg(item);
  }
}
