import { ValidatorInterface } from "@global/validator/ValidatorInterface";
import { MessageInterface } from "@global/validator/MessageInterface";
import { ItemInterface } from "@global/form/item/ItemInterface";

export class RgValidator implements ValidatorInterface {
  protected message: MessageInterface;

  constructor(message: MessageInterface) {
    this.message = message;
  }

  validate(value: any): boolean {
    if (!value) {
      return true; // RG vazio é considerado válido
    }

    // Remove caracteres não numéricos
    var rg = value.replace(/[^0-9]/g, "");

    // Verifica se o tamanho do RG é válido (8 ou 9 caracteres)
    if (rg.length < 8 || rg.length > 9) {
      return false;
    }

    // Opcional: Verifica se contém apenas números ou termina com 'X'
    const regex = /^[0-9]{7,8}[0-9X]?$/i;
    if (!regex.test(rg)) {
      return false;
    }

    return true;
  }

  getMsg(item: ItemInterface): string {
    return this.message.getMsg(item);
  }
}
