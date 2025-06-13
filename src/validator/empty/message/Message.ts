import { ItemInterface } from "@form/item/ItemInterface";
import { MessageInterface } from "@validator/MessageInterface";

export class Message implements MessageInterface {
  constructor() {}

  getMsg(item: ItemInterface): string {
    // Verifica se tem a tag multipleRows
    if (item.getTags().includes("multipleRows")) {
      if (item.getTextNameGender()) {
        return `Nenhum ${item.getTextName()} deve ser fornecido`;
      }

      return `Nenhuma ${item.getTextName()} deve ser fornecida`;
    } else {
      if (item.getTextNameGender()) {
        return `O ${item.getTextName()} não pode ser fornecido`;
      }

      return `A ${item.getTextName()} não pode ser fornecida`;
    }
  }
}
