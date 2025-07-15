import { ValidatorInterface } from "@global/validator/ValidatorInterface";
import { MessageInterface } from "@global/validator/MessageInterface";
import { ItemInterface } from "@global/form/item/ItemInterface";

export class EmptyValidator implements ValidatorInterface {
  protected message: MessageInterface;

  constructor(message: MessageInterface) {
    this.message = message;
  }

  validate(value: any): boolean {
    return value.length === 0;
  }

  getMsg(item: ItemInterface): string {
    return this.message.getMsg(item);
  }
}
