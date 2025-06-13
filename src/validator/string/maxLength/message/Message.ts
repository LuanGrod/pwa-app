import { ItemInterface } from "@form/item/ItemInterface";
import { MessageInterface } from "@validator/MessageInterface";

export class Message implements MessageInterface {
  protected max: number;

  constructor(max: number) {
    this.max = max;
  }

  getMsg(item: ItemInterface): string {
    // Verifica se tem a tag multipleRows
    if (item.getTags().includes("multipleRows")) {
      if (item.getTextNameGender()) {
        return `Os ${item.getTextName()} não podem ser maiores que ${this.max} caracteres`;
      }

      return `As ${item.getTextName()} não podem ser maiores que ${this.max} caracteres`;
    } else {
      if (item.getTextNameGender()) {
        return `O ${item.getTextName()} não pode ser maior que ${this.max} caracteres`;
      }

      return `A ${item.getTextName()} não pode ser maior que ${this.max} caracteres`;
    }
  }
}
