import { ValidatorInterface } from "@global/validator/ValidatorInterface";
import { MessageInterface } from "@global/validator/MessageInterface";
import { ItemInterface } from "@global/form/item/ItemInterface";

export class EmailValidator implements ValidatorInterface {
  protected message: MessageInterface;

  constructor(message: MessageInterface) {
    this.message = message;
  }

  validate(value: any): boolean {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
  }

  getMsg(item: ItemInterface): string {
    return this.message.getMsg(item);
  }
}
