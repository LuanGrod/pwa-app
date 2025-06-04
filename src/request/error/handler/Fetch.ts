import { Handler } from "./Handler";

export class Fetch extends Handler {
  constructor() {
    super({ errorContent: 'Failed to fetch', msg: 'Erro de conexão - verifique sua internet' });
  }
}
