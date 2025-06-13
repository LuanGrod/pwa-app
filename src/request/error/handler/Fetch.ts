import { HandlerFixed } from "./HandlerFixed";

export class Fetch extends HandlerFixed {
  constructor() {
    super({ errorContent: "Failed to fetch", msg: "Erro de conexão - verifique sua internet" });
  }
}
