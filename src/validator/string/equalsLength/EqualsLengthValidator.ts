import { ValidatorInterface } from "@validator/ValidatorInterface";
import { MessageInterface } from "@validator/MessageInterface";
import { ItemInterface } from "@form/item/ItemInterface";

export class EqualsLengthValidator implements ValidatorInterface {
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

    return value.length === this.value;
  }

  getMsg(item: ItemInterface): string {
    return this.message.getMsg(item);
  }
}
