import { MaskInterface } from "./MaskInterface";

export class CurrencyMask implements MaskInterface {
  apply(value: string): string {
    // Remove tudo que não for número
    let numbers = value.replace(/\D/g, "");
    if (!numbers) return "";
    // Remove zeros à esquerda
    numbers = numbers.replace(/^0+/, "");
    // Se tiver menos de 3 dígitos, preenche com zeros à esquerda para garantir centavos
    while (numbers.length < 3) {
      numbers = "0" + numbers;
    }
    // Valor em reais com ponto como separador decimal
    const reais = numbers.slice(0, -2);
    const cents = numbers.slice(-2);
    return reais ? `${parseInt(reais, 10)}.${cents}` : `0.${cents}`;
  }
}
