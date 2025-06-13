import { ValidatorInterface } from "@validator/ValidatorInterface";
import { MessageInterface } from "@validator/MessageInterface";
import { ItemInterface } from "@form/item/ItemInterface";

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
