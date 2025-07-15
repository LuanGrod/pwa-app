import { MaskInterface } from "./MaskInterface";

export class PhoneMask implements MaskInterface {
  apply(value: string): string {
    // Remove tudo que não é dígito
    const numbers = value.replace(/\D/g, '');
    
    // Aplica formatação de acordo com o tamanho
    if (numbers.length <= 2) {
      return numbers; // Apenas DDD
    }
    if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`; // (XX) XXXXX
    }
    if (numbers.length <= 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`; // (XX) XXXXX-XXXX
    }
    
    // Caso tenha mais que 11 dígitos, trunca
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  }
}