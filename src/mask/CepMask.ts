import { MaskInterface } from "./MaskInterface";

export class CepMask implements MaskInterface {
  apply(value: string): string {
    // Remove tudo que não é dígito
    const numbers = value.replace(/\D/g, "");

    if (numbers.length <= 5) {
      return numbers;
    }
    // Máximo: 8 dígitos
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  }
}
