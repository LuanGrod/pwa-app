import { ValidatorInterface } from "@validator/ValidatorInterface";
import { MessageInterface } from "@validator/MessageInterface";
import { ItemInterface } from "@form/item/ItemInterface";

export class NotEqualsLengthValidator implements ValidatorInterface {
  protected message: MessageInterface;
  protected value: number;

  constructor(message: MessageInterface, value: number) {
    this.message = message;
    this.value = value;
  }

  validate(value: any): boolean {
    if (!value) {
      return true;
    }

    return this.value.valueOf.length !== value.length;
  }

  getMsg(item: ItemInterface): string {
    return this.message.getMsg(item);
  }
}
