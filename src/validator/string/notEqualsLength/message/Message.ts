import { ItemInterface } from "@form/item/ItemInterface";
import { MessageInterface } from "@validator/MessageInterface";

export class Message implements MessageInterface {
  protected value: number;

  constructor(value: number) {
    this.value = value;
  }

  getMsg(item: ItemInterface): string {
    // Verifica se tem a tag multipleRows
    if (item.getTags().includes("multipleRows")) {
      if (item.getTextNameGender()) {
        return `Os ${item.getTextName()} precisam ser iguais a ${this.value} caracteres`;
      }

      return `As ${item.getTextName()} precisam ser iguais a ${this.value} caracteres`;
    } else {
      if (item.getTextNameGender()) {
        return `O ${item.getTextName()} precisa ser igual a ${this.value} caracteres`;
      }

      return `A ${item.getTextName()} precisa ser igual a ${this.value} caracteres`;
    }
  }
}
