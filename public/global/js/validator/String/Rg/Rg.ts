import ValidatorInterface from "../../ValidatorInterface";
import Message from "./Message/Message";

export class Rg implements ValidatorInterface {
  // Properties
  messageName: string;
  message: Message = new Message();

  // Constructor
  constructor(messageName: string) {
    this.messageName = messageName;
    this.createMessage();
  }

  // Methods
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

  createMessage() {
    if (this.messageName === "Message") {
      this.message = new Message();
    }

    this.message.validator = this;
  }
}
