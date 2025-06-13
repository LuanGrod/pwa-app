import { ItemInterface } from "@form/item/ItemInterface";
import { MessageInterface } from "@validator/MessageInterface";

export class Message implements MessageInterface {
  protected min: number;
  protected max: number;

  constructor(min: number, max: number) {
    this.min = min;
    this.max = max;
  }

  getMsg(item: ItemInterface): string {
    // Verifica se tem a tag multipleRows
    if (item.getTags().includes("multipleRows")) {
      if (item.getTextNameGender()) {
        return `Os ${item.getTextName()} não podem ter entre ${this.min} e ${this.max} caracteres`;
      }

      return `As ${item.getTextName()} não podem ter entre ${this.min} e ${this.max} caracteres`;
    } else {
      if (item.getTextNameGender()) {
        return `O ${item.getTextName()} não pode ter entre ${this.min} e ${this.max} caracteres`;
      }

      return `A ${item.getTextName()} não pode ter entre ${this.min} e ${this.max} caracteres`;
    }
  }
}
