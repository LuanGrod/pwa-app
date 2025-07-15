import { ItemInterface } from "@global/form/item/ItemInterface";
import { MessageInterface } from "@global/validator/MessageInterface";

export class Message implements MessageInterface {
  constructor() {}

  getMsg(item: ItemInterface): string {
    // Verifica se tem a tag multipleRows
    if (item.getTags().includes("multipleRows")) {
      if (item.getTextNameGender()) {
        return `Todos os ${item.getTextName()} precisam ser fornecidos`;
      }

      return `Todas as ${item.getTextName()} precisam ser fornecidas`;
    } else {
      if (item.getTextNameGender()) {
        return `O ${item.getTextName()} precisa ser fornecido`;
      }

      return `A ${item.getTextName()} precisa ser fornecida`;
    }
  }
}
