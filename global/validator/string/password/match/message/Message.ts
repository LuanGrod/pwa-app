import { ItemInterface } from "@global/form/item/ItemInterface";
import { MessageInterface } from "@global/validator/MessageInterface";

export class Message implements MessageInterface {
  constructor() {}

  getMsg(item: ItemInterface): string {
    // Verifica se tem a tag multipleRows
    if (item.getTags().includes("multipleRows")) {
      if (item.getTextNameGender()) {
        return `Os ${item.getTextName()} não conferem`;
      }

      return `As ${item.getTextName()} não conferem`;
    } else {
      if (item.getTextNameGender()) {
        return `O ${item.getTextName()} não confere`;
      }

      return `A ${item.getTextName()} não confere`;
    }
  }
}
