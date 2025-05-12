import type MessageInterface from "./MessageInterface";

export default interface ValidatorInterface {
  message: MessageInterface;
  /**
   *
   * @param value O valor a ser validado.
   * @returns Retorna true se o valor for válido, caso contrário, retorna false.
   */
  validate(value: any): boolean;
  createMessage(): void;
}
