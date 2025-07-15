import { ItemInterface } from "@global/form/item/ItemInterface";
import { MessageInterface } from "@global/validator/MessageInterface";

export class Message implements MessageInterface {
  protected min: number;

  constructor(min: number) {
    this.min = min;
  }

  getMsg(item: ItemInterface): string {
    // Verifica se tem a tag multipleRows
    if (item.getTags().includes("multipleRows")) {
      if (item.getTextNameGender()) {
        return `Os ${item.getTextName()} não podem ter menos do que ${this.min} caracteres`;
      }

      return `As ${item.getTextName()} não podem ter menos do que ${this.min} caracteres`;
    } else {
      if (item.getTextNameGender()) {
        return `O ${item.getTextName()} não pode ter menos do que ${this.min} caracteres`;
      }

      return `A ${item.getTextName()} não pode ter menos do que ${this.min} caracteres`;
    }
  }
}
