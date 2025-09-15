import { ApiErrorHandler } from "@global/request/error/handler/ApiErrorHandler";

export class ApiError extends ApiErrorHandler {
  constructor() {
    super({ 
      errorContent: "HTTP error 401", 
      msg: "Não autorizado - verifique as credenciais" 
    });
  }
}
