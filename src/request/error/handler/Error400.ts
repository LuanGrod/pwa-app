import { Handler } from "./Handler";

export class Error400 extends Handler {
  constructor() {
    super({ errorContent: 'HTTP error 400', msg: 'Dados inválidos enviados para a API' });
  }
}
