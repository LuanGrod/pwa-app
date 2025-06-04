import { Handler } from "./Handler";

export class Error403 extends Handler {
  constructor() {
    super({ errorContent: 'HTTP error 403', msg: 'Permissão negada' });
  }
}
