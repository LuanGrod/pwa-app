import { Handler } from "./Handler";

export class Error500 extends Handler {
  constructor() {
    super({ errorContent: 'HTTP error 500', msg: 'Erro interno do servidor' });
  }
}
