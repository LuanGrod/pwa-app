import { HandlerFixed } from "./HandlerFixed";

export class Error400 extends HandlerFixed {
  constructor() {
    super({ errorContent: "HTTP error 400", msg: "Dados inválidos enviados para a API" });
  }
}
