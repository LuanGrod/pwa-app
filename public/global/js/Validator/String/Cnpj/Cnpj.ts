import type ValidatorInterface from "@pglobal/assets/js/Validator/ValidatorInterface";
import Message from "./Message/Message";

export class Cnpj implements ValidatorInterface {
  // Properties
  messageName: string;
  message: Message;

  // Constructor
  constructor(messageName) {
    this.messageName = messageName;
    this.createMessage();
  }

  // Methods
  validate(value: any): boolean {
    if (!value) {
      return true; // CNPJ vazio é considerado válido
    }

    // Remove caracteres não numéricos
    var cnpj = value.replace(/[^0-9]/g, "");

    // Verifica se o CNPJ tem 14 dígitos
    if (cnpj.length !== 14) {
      return false;
    }

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{13}$/.test(cnpj)) {
      return false;
    }

    // Valida o primeiro dígito verificador
    var soma = 0;
    var peso = 5;

    for (var i = 0; i < 12; i++) {
      soma += parseInt(cnpj[i]) * peso;
      peso = peso === 2 ? 9 : peso - 1;
    }

    var resto = soma % 11;
    var digito1 = resto < 2 ? 0 : 11 - resto;

    if (parseInt(cnpj[12]) !== digito1) {
      return false;
    }

    // Valida o segundo dígito verificador
    soma = 0;
    peso = 6;

    for (var i = 0; i < 13; i++) {
      soma += parseInt(cnpj[i]) * peso;
      peso = peso === 2 ? 9 : peso - 1;
    }

    resto = soma % 11;
    var digito2 = resto < 2 ? 0 : 11 - resto;

    if (parseInt(cnpj[13]) !== digito2) {
      return false;
    }

    return true; // CNPJ válido
  }

  createMessage() {
    if (this.messageName === "Message") {
      this.message = new Message();
    }

    this.message.validator = this;
  }
}
