import { MaskInterface } from "./MaskInterface";

export class RgMask implements MaskInterface {
  apply(value: string): string {
    // Remove tudo que não é dígito ou letra (para último dígito que pode ser X)
    let cleaned = value.replace(/[^0-9XxA-Za-z]/g, '').toUpperCase();

    // Aplica o padrão 99.999.999-9 ou 99.999.999-X
    // Primeiro ponto após os dois primeiros dígitos
    cleaned = cleaned.replace(/^(\d{2})(\d)/, '$1.$2');
    // Segundo ponto após o quinto dígito
    cleaned = cleaned.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    // Hífen após o oitavo dígito
    cleaned = cleaned.replace(/^(\d{2})\.(\d{3})\.(\d{3})([A-Za-z0-9])/, '$1.$2.$3-$4');

    // Limita a saída ao tamanho máximo do RG formatado (12 caracteres)
    return cleaned.slice(0, 12);
  }
}
