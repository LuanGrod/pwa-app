import { ValidatorInterface } from "@validator/ValidatorInterface";
import { MessageInterface } from "@validator/MessageInterface";
import { ItemInterface } from "@form/item/ItemInterface";

export class NotBetweenLengthValidator implements ValidatorInterface {
  protected message: MessageInterface;
  protected min: number;
  protected max: number;

  constructor(message: MessageInterface, min: number, max: number) {
    this.message = message;
    this.min = min;
    this.max = max;
  }

  validate(value: any): boolean {
    if (!value) {
      return true;
    }

    return value.length < this.min || value.length > this.max;
  }

  getMsg(item: ItemInterface): string {
    return this.message.getMsg(item);
  }
}
