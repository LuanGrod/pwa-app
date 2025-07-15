import { HandlerFixed } from "./HandlerFixed";

export class Error422 extends HandlerFixed {
  constructor() {
    super({ errorContent: "HTTP error 422", msg: "Campos inválidos" });
  }
}
