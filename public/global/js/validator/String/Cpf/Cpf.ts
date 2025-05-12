import ValidatorInterface from "../../ValidatorInterface";
import Message from "./Message/Message";

export class Cpf implements ValidatorInterface {
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
      return true; // CPF vazio é considerado válido
    }

    // Remove caracteres não numéricos
    var cpf = value.replace(/[^0-9]/g, "");

    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
      return false;
    }

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) {
      return false;
    }

    // Valida os dígitos verificadores
    for (var t = 9; t < 11; t++) {
      var d = 0;
      for (var c = 0; c < t; c++) {
        d += parseInt(cpf[c]) * (t + 1 - c);
      }
      d = ((10 * d) % 11) % 10;
      if (parseInt(cpf[t]) !== d) {
        return false;
      }
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
