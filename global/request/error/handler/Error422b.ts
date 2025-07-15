import { Handler } from "./Handler";

export class Error422b extends Handler {
  constructor() {
    super({ errorContent: "HTTP error 422", msg: "Campos inválidos" });
  }
}
