import { MaskInterface } from "./MaskInterface";

export class CpfMask implements MaskInterface {
  apply(value: string): string {
    // Remove tudo que não é dígito
    const numbers = value.replace(/\D/g, "");

    if (numbers.length <= 3) {
      return numbers;
    }
    if (numbers.length <= 6) {
      return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
    }
    if (numbers.length <= 9) {
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
    }
    // Máximo: 11 dígitos
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
  }
}
