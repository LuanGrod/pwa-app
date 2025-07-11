import { ValidatorInterface } from "@validator/ValidatorInterface";
import { MessageInterface } from "@validator/MessageInterface";
import { ItemInterface } from "@form/item/ItemInterface";

export class MatchPasswordValidator implements ValidatorInterface {
  protected message: MessageInterface;
  protected name: string;

  constructor(message: MessageInterface, name: string) {
    this.message = message;
    this.name = name;
  }

  validate(value: any): boolean {
    if (!value) return true;

    const passwordField = document.querySelector<HTMLInputElement>(`#${this.name}`);

    return passwordField?.value === value;
  }

  getMsg(item: ItemInterface): string {
    return this.message.getMsg(item);
  }
}
