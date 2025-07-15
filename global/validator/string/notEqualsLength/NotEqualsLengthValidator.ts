import { ValidatorInterface } from "@global/validator/ValidatorInterface";
import { MessageInterface } from "@global/validator/MessageInterface";
import { ItemInterface } from "@global/form/item/ItemInterface";

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
