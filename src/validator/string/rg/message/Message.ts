import { ItemInterface } from "@form/item/ItemInterface";
import { MessageInterface } from "@validator/MessageInterface";

export class Message implements MessageInterface {
  constructor() {}

  getMsg(item: ItemInterface): string {
    // Verifica se tem a tag multipleRows
    if (item.getTags().includes("multipleRows")) {
      if (item.getTextNameGender()) {
        return `Os ${item.getTextName()} são inválidos`;
      }

      return `As ${item.getTextName()} são inválidas`;
    } else {
      if (item.getTextNameGender()) {
        return `O ${item.getTextName()} é inválido`;
      }

      return `A ${item.getTextName()} é inválida`;
    }
  }
}
