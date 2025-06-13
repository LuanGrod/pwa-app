import { ValidatorInterface } from "@validator/ValidatorInterface";
import { MessageInterface } from "@validator/MessageInterface";
import { ItemInterface } from "@form/item/ItemInterface";

export class MinCountNumberValidator implements ValidatorInterface {
  protected message: MessageInterface;
  protected min: number;

  constructor(message: MessageInterface, min: number) {
    this.message = message;
    this.min = min;
  }

  validate(value: any): boolean {
    const numberCount = (value.match(/[0-9]/g) || []).length;
    return numberCount >= this.min;
  }

  getMsg(item: ItemInterface): string {
    return this.message.getMsg(item);
  }
}
