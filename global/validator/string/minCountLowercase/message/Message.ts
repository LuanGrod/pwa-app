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
        return `Os ${item.getTextName()} precisam ter ${this.min} letras minúsculas ou mais`;
      }

      return `As ${item.getTextName()} precisam ter ${this.min} letras minúsculas ou mais`;
    } else {
      if (item.getTextNameGender()) {
        return `O ${item.getTextName()} precisam ter ${this.min} letras minúsculas ou mais`;
      }

      return `A ${item.getTextName()} precisam ter ${this.min} letras minúsculas ou mais`;
    }
  }
}
