import { HandlerFixed } from "./HandlerFixed";

export class Error401 extends HandlerFixed {
  constructor() {
    super({ errorContent: "HTTP error 401", msg: "Não autorizado - verifique as credenciais" });
  }
}
