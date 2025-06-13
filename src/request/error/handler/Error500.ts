import { HandlerFixed } from "./HandlerFixed";

export class Error500 extends HandlerFixed {
  constructor() {
    super({ errorContent: 'HTTP error 500', msg: 'Erro interno do servidor' });
  }
}
