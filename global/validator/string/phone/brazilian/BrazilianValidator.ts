import { ValidatorInterface } from "@global/validator/ValidatorInterface";
import { MessageInterface } from "@global/validator/MessageInterface";
import { ItemInterface } from "@global/form/item/ItemInterface";

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
