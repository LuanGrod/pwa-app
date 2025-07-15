import { MaskInterface } from "./MaskInterface";

export class CnpjMask implements MaskInterface {
  apply(value: string): string {
    // Remove tudo que não é dígito
    const numbers = value.replace(/\D/g, "");

    // Aplica a máscara conforme o tamanho
    if (numbers.length <= 2) {
      return numbers;
    }
    if (numbers.length <= 5) {
      return `${numbers.slice(0, 2)}.${numbers.slice(2)}`;
    }
    if (numbers.length <= 8) {
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`;
    }
    if (numbers.length <= 12) {
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`;
    }
    // Máximo: 14 dígitos
    return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(
      8,
      12
    )}-${numbers.slice(12, 14)}`;
  }
}
