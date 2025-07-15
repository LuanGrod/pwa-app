import { Handler } from "./Handler";

export class Error401c extends Handler {
  constructor() {
    super({ errorContent: "HTTP error 401", msg: "Não autorizado - verifique as credenciais" });
  }
}
