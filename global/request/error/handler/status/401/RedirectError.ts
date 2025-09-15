import { RedirectErrorHandler } from "../../RedirectErrorHandler";

export class RedirectError extends RedirectErrorHandler {
  constructor() {
    super(
      { 
        errorContent: "HTTP error 401", 
        msg: "Não autorizado - verifique as credenciais" 
      },
      "/sair"
    );
  }
}
