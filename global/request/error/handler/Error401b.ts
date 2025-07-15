import { Handler } from "./Handler";

export class Error401b extends Handler {
  constructor() {
    super({ errorContent: "HTTP error 401", msg: "Não autorizado - verifique as credenciais" });
  }

  handle(error: Error): string[] | null {
    if (error.message.includes(this.errorContent)) {
      window.location.href = "/sair";
    }

    return null;
  }
}
