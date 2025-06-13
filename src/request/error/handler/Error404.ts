import { HandlerFixed } from "./HandlerFixed";

export class Error404 extends HandlerFixed {
  constructor() {
    super({ errorContent: 'HTTP error 404', msg: 'Página não encontrada' });
  }
}
