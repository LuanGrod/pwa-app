import { HandlerFixed } from "./HandlerFixed";

export class Error200 extends HandlerFixed {
  constructor() {
    super({ errorContent: "HTTP error 200", msg: "Erro desconhecido" });
  }
}
