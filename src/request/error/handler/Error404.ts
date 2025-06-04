import { Handler } from "./Handler";

export class Error404 extends Handler {
  constructor() {
    super({ errorContent: 'HTTP error 404', msg: 'Página não encontrada' });
  }
}
