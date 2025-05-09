import type ValidatorInterface from "./ValidatorInterface";

export default interface MessageInterface {
  validator: ValidatorInterface;
  /**
   *
   * @param field o campo que tem os dados que serão usados para gerar a mensagem. (ta any por enquanto)
   */
  getContent(field: any): string;
}
