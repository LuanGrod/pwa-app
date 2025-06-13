import { ValidatorInterface } from "@validator/ValidatorInterface";
import { MessageInterface } from "@validator/MessageInterface";
import { ItemInterface } from "@form/item/ItemInterface";

export class MinCountUppercaseValidator implements ValidatorInterface {
  protected message: MessageInterface;
  protected min: number;

  constructor(message: MessageInterface, min: number) {
    this.message = message;
    this.min = min;
  }

  validate(value: any): boolean {
    const uppercaseCount = (value.match(/[A-Z]/g) || []).length;
    return uppercaseCount >= this.min;
  }

  getMsg(item: ItemInterface): string {
    return this.message.getMsg(item);
  }
}
