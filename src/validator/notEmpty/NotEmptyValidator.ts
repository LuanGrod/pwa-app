import { ValidatorInterface } from "@validator/ValidatorInterface";
import { MessageInterface } from "@validator/MessageInterface";
import { ItemInterface } from "@form/item/ItemInterface";

export class NotEmptyValidator implements ValidatorInterface {
  protected message: MessageInterface;

  constructor(message: MessageInterface) {
    this.message = message;
  }

  validate(value: any): boolean {
    return value.length !== 0;
  }

  getMsg(item: ItemInterface): string {
    return this.message.getMsg(item);
  }
}
