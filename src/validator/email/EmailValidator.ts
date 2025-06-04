import { ValidatorInterface } from "@validator/ValidatorInterface";
import { MessageInterface } from "@validator/MessageInterface";
import { ItemInterface } from "@form/item/ItemInterface";

export class EmailValidator implements ValidatorInterface {
  protected message: MessageInterface;

  constructor(message: MessageInterface) {
    this.message = message;
  }

  validate(value: string): boolean {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
  }

  getMsg(item: ItemInterface): string {
    return this.message.getMsg(item);
  }
}
