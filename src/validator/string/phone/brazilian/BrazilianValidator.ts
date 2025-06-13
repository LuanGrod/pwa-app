import { ValidatorInterface } from "@validator/ValidatorInterface";
import { MessageInterface } from "@validator/MessageInterface";
import { ItemInterface } from "@form/item/ItemInterface";

export class BrazilianValidator implements ValidatorInterface {
  protected message: MessageInterface;

  constructor(message: MessageInterface) {
    this.message = message;
  }

  validate(value: any): boolean {
    var emptyValue = value === "";
    var pattern = /^((\(\d{2}\) ?)|\d{2} ?)?\d{4,5}-?\d{4}$/;
    var validValue = pattern.test(value);

    return emptyValue || validValue;
  }

  getMsg(item: ItemInterface): string {
    return this.message.getMsg(item);
  }
}
