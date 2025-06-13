import { HandlerFixed } from "./HandlerFixed";

export class Error403 extends HandlerFixed {
  constructor() {
    super({ errorContent: 'HTTP error 403', msg: 'Permissão negada' });
  }
}
