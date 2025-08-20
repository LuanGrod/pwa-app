import { Handler } from "./Handler";

export class Error200 extends Handler {
  constructor() {
    super({ errorContent: "HTTP error 200", msg: "Erro desconhecido" });
  }
}
