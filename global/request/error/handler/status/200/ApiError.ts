import { ApiErrorHandler } from "@global/request/error/handler/ApiErrorHandler";

export class ApiError extends ApiErrorHandler {
  constructor() {
    super({ 
      errorContent: "HTTP error 200", 
      msg: "Erro desconhecido" 
    });
  }
}
