import { ValidatorInterface } from "@global/validator/ValidatorInterface";
import { MessageInterface } from "@global/validator/MessageInterface";
import { ItemInterface } from "@global/form/item/ItemInterface";

export class CnpjValidator implements ValidatorInterface {
  protected message: MessageInterface;

  constructor(message: MessageInterface) {
    this.message = message;
  }

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

  getMsg(item: ItemInterface): string {
    return this.message.getMsg(item);
  }
}
